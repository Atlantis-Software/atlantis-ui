import { Component, ElementRef} from '@angular/core';
import modalComponent from './modal.component';

export default class modalHeaderComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'modal-header',
        template: `
				<div class="modal-header">
          <div class="row"> 
          <div class="col-md-12">
	          <button *ngIf="options.close" type="button" class="close" (click)="close()" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          </div>
	        <ng-content></ng-content>
				</div>`,
        inputs: ['title', 'options']
	  	})
		];
	}

  constructor(elementRef, modal) {
    this.modal = modal;
  }


  ngOnInit() {
  }

  close(){
    this.modal.show = false;
  }
}

modalHeaderComponent.parameters = [ElementRef, modalComponent];
