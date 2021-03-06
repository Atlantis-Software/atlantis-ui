import {
  Component
} from '@angular/core';

export default class gridFooterComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-grid-footer',
        template: `
        <div *ngFor= "let column of columns" class="gridHead" [ngClass]="column.class">
          {{columns.label}}
        </div>`,
        inputs: ['columns']
      })
    ];
  }

  constructor() {}

}
