import { Component, ElementRef} from '@angular/core';
import modalComponent from './modal.component';

export default class modalHeaderComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'modal-header',
        template: `
				<div class="modal-header">
	        <button *ngIf="options.close" type="button" class="close" (click)="close()" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">{{this.title}}</h4>
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
    this.modal.close();
  }
}

modalHeaderComponent.parameters = [ElementRef, modalComponent];
