import { Component } from '@angular/core';
import modalComponent from './modal.component';

export default class modalHeaderComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'modal-header',
        template: `
        <div class="modal-header">
          <button *ngIf="close" type="button" class="close" (click)="onClose()"><span>&times;</span></button>
          <ng-content></ng-content>
        </div>`,
        inputs: ['close']
      })
    ];
  }

  constructor(modal) {
    this.modal = modal;
    this.close = true;
  }

  onClose() {
    this.modal.show = false;
  }
}

modalHeaderComponent.parameters = [modalComponent];
