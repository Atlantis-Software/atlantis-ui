import { Component, ElementRef} from '@angular/core';

export default class modalBodyComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'modal-body',
        template: `
				<div class="modal-body">
        	<ng-content></ng-content>
				</div>`
	  	})
		];
	}

  constructor(elementRef) {
  }

}

modalBodyComponent.parameters = [ElementRef];
