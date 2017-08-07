import { Component, ElementRef, EventEmitter, Injector, ComponentFactoryResolver, ApplicationRef} from '@angular/core';
import backdropComponent from './backdrop.component.js'


export default class modalComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'modal',
        template: `
					<div (click)="close($event)" class="modal" [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}" [ngClass]="{'in': visibleAnimate}">
            <div class="modal-dialog" role="document" *ngIf="visible">
              <div class="modal-content">
                <ng-content></ng-content>
              </div>
						</div>
				  </div>
          `,
        inputs: ['options', "show"],
        outputs: ['showChange']
	  	})
		];
	}

  constructor(elementRef, Injector, ComponentFactoryResolver, ApplicationRef) {
    this.showChange = new EventEmitter();
    this.elementRef = elementRef;
    // need to create backdrop later
    this.injector = Injector;
    this.applicationRef = ApplicationRef;
    this.backdropFactory =  ComponentFactoryResolver.resolveComponentFactory(backdropComponent);
  }

  get show() {
    return this.model;
  }

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

  open() {
    if (this.options && this.options.backdrop) {
      // create backdrop dynamically
      this.backdropRef = this.backdropFactory.create(this.injector);
      this.applicationRef.attachView(this.backdropRef.hostView);
      document.querySelector('body').appendChild(this.backdropRef.location.nativeElement);
      this.backdropRef.changeDetectorRef.detectChanges();
    }


    this.model = true;
    this.showChange.emit(this.model);

    this.visible = true;
		this.visibleAnimate = true;
    // setTimeout(() => this.visibleAnimate = true, 100);

  }

  close(event) {
    // if click inside modal
    if (event && event.target !== this.modal ) {
      return;
    }
    this.model = false;
    this.showChange.emit(this.model);

    this.visibleAnimate = false;
    if (this.options && this.options.backdrop && this.backdropRef) {
      // delete the backdrop
      this.backdropRef.destroy();
    }
		this.visible = false;
    // setTimeout(() => this.visible = false, 300);
  }

  ngOnInit() {;

    this.modal = this.elementRef.nativeElement.getElementsByClassName("modal")[0];

     // options by default
    if (typeof this.options === "undefined" || this.options === "" ){
      this.options = {};
    }

    if (typeof this.options.backdrop === "undefined" || this.options.backdrop === "" )  {
      this.options.backdrop = true;
    }

    if (typeof this.options.fade === "undefined" || this.options.fade === "" )  {
      this.options.fade = true;
    }

    if (this.options.fade === true) {
      this.modal.classList.add("fade");
    }

		if (this.options.orientation) {
			this.modal.classList.add("modal-"+this.options.orientation);
		}
  }
}

modalComponent.parameters = [ElementRef, Injector, ComponentFactoryResolver, ApplicationRef];
