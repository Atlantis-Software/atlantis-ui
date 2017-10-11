import { Component } from '@angular/core';

export default class modalFooterComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'modal-footer',
        template: `
				<div class="modal-footer">
        	<ng-content></ng-content>
				</div>`
      })
    ];
  }

  constructor() {}

}

modalFooterComponent.parameters = [];
