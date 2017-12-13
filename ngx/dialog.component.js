import { Component, ElementRef, EventEmitter } from '@angular/core';
import { dialogService } from './dialog.service.js';

export default class dialogComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'dlg',
        template: `
          <div draggable class="modal-dialog" role="document" [ngStyle]="{'display': visible ? 'block' : 'none'}">
            <div class="modal-content" (mousedown)="focus()" [resizable]="options.resizable" [options]="options">
              <div draggable-handle class="modal-header">
                <button type="button" class="close" aria-label="fermer" (click)="close()">
                  <span aria-hidden="true">&times;</span>
                </button>
                <div *ngFor="let control of options.controls">
                    <button type="button" class="close" aria-label="réduire" (click)='control.action();'>
                        <span aria-hidden="true" style='margin-right: 10px;'>{{control.label}}</span>
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
        outputs: ['showChange', "onClose"],
        hosts: {
          "(window:resize)":"redraw()"
        }
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

    this.redraw();
  }

  ngAfterViewInit() {
    this.dlgService.addDialog(this);
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
  }

  //Add classes to modal according to inputs parameters
  ngOnDestroy() {
    this.dlgService.removeDialog();
  }

  redraw() {
    this.content = this.elementRef.nativeElement.querySelector('.modal-content');
    this.body = this.elementRef.nativeElement.querySelector('.modal-body');
    this.header = this.elementRef.nativeElement.querySelector('.modal-header');
    this.element = this.elementRef.nativeElement.querySelector('.modal-dialog');

    this.content.style.width = this.options.width + "px";
    this.content.style.height = this.options.height + "px";

    var height = Math.min(this.options.height, window.innerHeight);
    var width = Math.min(this.options.width, window.innerWidth);


    var top = (window.innerHeight - height) / 2;
    var left = (window.innerWidth - width) / 2;

    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
    this.element.style.position = "absolute";
    // this.element.style.width = this.options.width + "px";
    // this.element.style.height = this.options.height + "px";
    this.element.style.margin = 0;

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

    this.element.style.width = "auto";

    var headerHeight = window.getComputedStyle(this.header, null).height;

    this.body.style.height = this.options.height - (+headerHeight.split("px")[0]) + "px" ;
    this.options.bodyHeight = this.body.style.height;

    if (this.options.visible) {
      this.focus();
    }
  }
}

dialogComponent.parameters = [ElementRef, dialogService];
