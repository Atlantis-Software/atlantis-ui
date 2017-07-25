import { Component, ElementRef, Inject, forwardRef, EventEmitter} from '@angular/core';

export default class modalComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'modal',
        template: `
					<div class="modal" [id]="idModal" [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}" [ngClass]="{'in': visibleAnimate}">
            <div class="modal-dialog" role="document" *ngIf="visible">
              <div class="modal-content">
                <ng-content></ng-content>
              </div>
						</div>
				  </div>
          <div *ngIf="visible" class="overlay" (click)="close()"></div>
          `,
        inputs: ['options', "idModal", "show"], 
        outputs: ['showChange'], 
        // need click outsite component
        host: {
          '(document:click)': 'handleClick($event)',
        }
        
	  	})
		];
	}

  constructor(elementRef) {
    this.showChange = new EventEmitter();
    this.elementRef = elementRef;
  }


    // click outsite component to close select
  handleClick(event){
    if (event.target == this.elementRef.nativeElement.getElementsByClassName("modal")[0]) {
      this.show = false;
    }
  }

	ngOnDestroy() {
		var modalBackdrop = document.getElementsByClassName("modal-backdrop");
		if (modalBackdrop.length > 0) {
			document.body.removeChild(modalBackdrop[0]);
		}
	}

  get show() {
    return this.model;
  }

  set show(val) {
    this.model = val;
    if (this.model) {
      this.open();
    } else {
      this.close();
    }
    this.showChange.emit(this.model);
  }

  open() {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  close() {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
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
