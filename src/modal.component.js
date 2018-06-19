import { Component, ElementRef, EventEmitter, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import backdropComponent from './backdrop.component.js';


export default class modalComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-modal',
        template: `
          <div (click)="closeOnBackdrop($event)" class="modal" [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
            <div class="modal-dialog" role="document" [style.width]="width">
              <div class="modal-content" [ngStyle]="{'min-height': this.height ? this.height : ''}">
                <ng-content></ng-content>
              </div>
            </div>
          </div>`,
        inputs: ['backdrop', "show", "orientation", "isClosable", "height", "width"],
        outputs: ['showChange', "onClose"]
      })
    ];
  }

  constructor(elementRef, Injector, ComponentFactoryResolver, ApplicationRef) {
    this.showChange = new EventEmitter();
    this.onClose = new EventEmitter();
    this.elementRef = elementRef;
    // need to create backdrop later
    this.injector = Injector;
    this.applicationRef = ApplicationRef;
    this.backdropFactory = ComponentFactoryResolver.resolveComponentFactory(backdropComponent);
    this.backdrop = true;
    this.show = false;
    this.isClosable = false;
    this.width = "600px";
  }

  get show() {
    return this.model;
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
    if (this.backdrop === true) {
      // create backdrop dynamically
      this.backdropRef = this.backdropFactory.create(this.injector);
      this.applicationRef.attachView(this.backdropRef.hostView);
      document.querySelector('body').appendChild(this.backdropRef.location.nativeElement);
      this.backdropRef.changeDetectorRef.detectChanges();
    }

    document.body.classList.add("modal-open");


    this.model = true;
    this.showChange.emit(this.model);

    this.visible = true;
    this.visibleAnimate = true;
    // setTimeout(() => this.visibleAnimate = true, 100);

  }

  ngOnDestroy() {
    if (this.backdropRef) {
      this.backdropRef.destroy();
    }
  }

  //close the modal. Delete the backdrop and remove class on body
  closeOnBackdrop(event) {
    // if click inside modal
    if ((event && event.target !== this.modal) || !this.isClosable) {
      return;
    }
    this.close();
  }

  close() {
    this.model = false;
    this.showChange.emit(this.model);
    document.body.classList.remove("modal-open");
    this.visibleAnimate = false;
    if (this.backdrop === true && this.backdropRef) {
      // delete the backdrop
      this.backdropRef.destroy();
    }
    this.visible = false;
    // setTimeout(() => this.visible = false, 300);
    this.onClose.emit();
  }

  //Add classes to modal according to inputs parameters
  ngOnInit() {

    this.modal = this.elementRef.nativeElement.getElementsByClassName("modal")[0];

    if (this.orientation) {
      this.modal.classList.add("modal-" + this.orientation);
    }
  }
}

modalComponent.parameters = [ElementRef, Injector, ComponentFactoryResolver, ApplicationRef];
