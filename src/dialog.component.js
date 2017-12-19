import { Component, ElementRef, EventEmitter } from '@angular/core';
import { dialogService } from './dialog.service.js';

export default class dialogComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'dlg',
        template: `
          <div draggable (stopped)="focus()" class="modal-dialog" [ngStyle]="{'display': visible ? 'block' : 'none'}">
            <div class="modal-content" (mousedown)="focus()" [resizable]="options.resizable" [options]="options">
              <div draggable-handle class="modal-header">
                <button type="button" class="close" (click)="close()">
                  <span>&times;</span>
                </button>
                <div *ngFor="let control of options.controls">
                    <button type="button" class="close" (click)='control.action();'>
                        <span style='margin-right: 10px;'>{{control.label}}</span>
                    </button>
                </div>
                <h4 class="modal-title">{{options.title}}</h4>
              </div>
              <div class="modal-body">
                <ng-content></ng-content>
              </div>
            </div>
          </div>`,
        inputs: ["show", "fade", "options"],
        outputs: ['showChange', "onClose"]
      })
    ];
  }

  constructor(elementRef, dialogService) {
    this.showChange = new EventEmitter();
    this.onClose = new EventEmitter();
    this.elementRef = elementRef;
    this.options = {
      visible: false,
      height: 500,
      minHeight: 500,
      maxHeight: 500,
      width: 300,
      minWidth: 300,
      maxWidth: 300
    };
    this.fade = true;
    this.isClosable = false;
    this.dlgService = dialogService;
  }

  get show() {
    return this.model;
  }

  focus() {
    this.dlgService.focusDialog(this);
  }

  //set the variable show with input parameter and open or close modal.
  set show(val) {
    if (val !== this.model) {
      this.model = val;
      if (this.model) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  //Open modal and add correct class on body for avoid the scroll on body
  //if we want a backdrop that create a backdrop into the body
  open() {

    this.model = true;
    this.showChange.emit(this.model);

    this.visible = true;
    this.visibleAnimate = true;
    this.options.visible = true;
    // setTimeout(() => this.visibleAnimate = true, 100);
    this.dlgService.addDialog(this);
    this.redraw();
  }

  ngAfterViewInit() {
    this.redraw();
  }

  close() {
    this.model = false;
    if (this.options.onClose) {
      this.options.onClose();
      return;
    }
    this.showChange.emit(this.model);
    document.body.classList.remove("modal-open");
    this.visibleAnimate = false;
    this.visible = false;
    this.options.visible = false;
    // setTimeout(() => this.visible = false, 300);
    this.onClose.emit();
    if (this.element) {
      this.element.style.transform = '';
    }
    this.dlgService.removeDialog();
  }

  //Add classes to modal according to inputs parameters
  ngOnDestroy() {
    this.dlgService.removeDialog();
  }

  redraw() {
    this.element = this.elementRef.nativeElement.querySelector('.modal-dialog');
    this.content = this.elementRef.nativeElement.querySelector('.modal-content');
    this.header = this.elementRef.nativeElement.querySelector('.modal-header');
    this.body = this.elementRef.nativeElement.querySelector('.modal-body');

    var height = Math.min(this.options.height, window.innerHeight);
    var width = Math.min(this.options.width, window.innerWidth);

    this.content.style.width = width + "px";
    this.content.style.height = height + "px";

    var top = (window.innerHeight - height) / 2;
    var left = (window.innerWidth - width) / 2;

    this.element.style.top = top + "px";
    this.element.style.left = left + "px";

    this.options.minHeight = this.options.minHeight || this.options.height;
    this.options.maxHeight = this.options.maxHeight || this.options.height;
    this.options.minWidth = this.options.minWidth || this.options.width;
    this.options.maxWidth = this.options.maxWidth || this.options.width;

    this.content.style.width = this.options.width + "px";
    this.content.style.height = this.options.height + "px";
    this.content.style.minHeight = this.options.minHeight + "px";
    this.content.style.minWidth = this.options.minWidth + "px";
    this.content.style.maxHeight = this.options.maxHeight + "px";
    this.content.style.maxWidth = this.options.maxWidth + "px";

    var headerStyle = window.getComputedStyle(this.header, null);
    var contentStyle = window.getComputedStyle(this.content, null);
    var contentHeight = parseInt(contentStyle.getPropertyValue("height"));
    var contentBorderTop = parseInt(contentStyle.getPropertyValue("border-top-width"));
    var contentBorderBottom = parseInt(contentStyle.getPropertyValue("border-bottom-width"));
    var contentInnerHeight = contentHeight - contentBorderTop - contentBorderBottom;

    this.body.style.height = (contentInnerHeight - parseInt(headerStyle.getPropertyValue("height"))) + "px";
    this.options.bodyHeight = this.body.style.height;

    if (this.options.visible) {
      this.focus();
    }
  }
}

dialogComponent.parameters = [ElementRef, dialogService];
