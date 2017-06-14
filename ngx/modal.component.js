import { Component, ElementRef, Inject} from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

export default class modalComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'modal',
        template: `
					<div class="modal" [id]="idModal">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <ng-content></ng-content>
              </div>
						</div>
				  </div>`,
        inputs: ['options', "idModal"]
	  	})
		];
	}

  constructor(elementRef, jquery) {
    this.elementRef = elementRef;
		this.jq = jquery;
  }

	ngOnDestroy() {
		var modalBackdrop = document.getElementsByClassName("modal-backdrop");
		if (modalBackdrop.length > 0) {
			document.body.removeChild(modalBackdrop[0]);
		}
	}

  ngOnInit() {

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
        case "large" :
					this.modal.getElementsByClassName("modal-dialog")[0].classList.add("modal-sm");
        break;
        case "small" :
					this.modal.getElementsByClassName("modal-dialog")[0].classList.add("modal-lg");
        break;
      }
    }

		if (this.options.backdrop !== "true" && typeof this.options.backdrop !== "undefined") {
			this.modal.setAttribute("data-backdrop", this.options.backdrop);
		}

		if (this.options.show !== "" && typeof this.options.show !== "undefined" && this.options.show !== 0 && this.options.show !== null) {
			this.jq(this.modal).modal('show');
		}

  }

	ngOnChanges() {
		if (this.modal) {
			if (this.options.show !== "" && typeof this.options.show !== "undefined" && this.options.show !== 0 && this.options.show !== null) {
				this.jq(this.modal).modal('show');
			}
		}
	}
}

modalComponent.parameters = [ElementRef, [new Inject(JQ_TOKEN)]];
