import { Component, ElementRef, Inject, forwardRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms'; 

export default class modalComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'modal',
        template: `
					<div class="modal" [id]="idModal" [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}" [ngClass]="{'in': visibleAnimate}">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <ng-content></ng-content>
              </div>
						</div>
				  </div>`,
        inputs: ['options', "idModal"], 
         providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => modalComponent),
          multi: true
        }]
        
	  	})
		];
	}

  constructor(elementRef) {
    this.elementRef = elementRef;
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
  }

  get value() {
    return this.val;
  }
  set value(val) {
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
      if (this.val == true) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  writeValue(val) {
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
      if (this.val == true) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

	ngOnDestroy() {
		var modalBackdrop = document.getElementsByClassName("modal-backdrop");
		if (modalBackdrop.length > 0) {
			document.body.removeChild(modalBackdrop[0]);
		}
	}

  open() {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  close() {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
    this.val = false;
    this.onModelChange(this.val);
  }

  ngOnInit() {;
		if (this.idModal === "" || typeof this.idModal === "undefined"){
			this.idModal = "modal" + Math.floor(Math.random() * (10000000000 - 0));
		}

		this.modal = this.elementRef.nativeElement.getElementsByClassName("modal")[0];

    if (this.options.fade=== true) {
      this.modal.classList.add("fade");
    }

    switch(this.options.orientation) {
      case "left" :
        this.modal.classList.add("modal-left");
        break;
      case "right" :
        this.modal.classList.add("modal-right");
        break;
      case "top" :
        this.modal.classList.add("modal-top");
        break;
      case "bottom" :
        this.modal.classList.add("modal-bottom");
        break;
    }

    if (this.options.orientation === "" || typeof this.options.orientation === "undefined") {
      switch(this.options.size) {
        case "small" :
					this.modal.getElementsByClassName("modal-dialog")[0].classList.add("modal-sm");
        break;
        case "large" :
					this.modal.getElementsByClassName("modal-dialog")[0].classList.add("modal-lg");
        break;
      }
    }

		if (this.options.backdrop !== "true" && typeof this.options.backdrop !== "undefined") {
			this.modal.setAttribute("data-backdrop", this.options.backdrop);
		}
  }
}

modalComponent.parameters = [ElementRef];
