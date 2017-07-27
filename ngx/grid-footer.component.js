import { Component, ElementRef} from '@angular/core';

export default class gridFooterComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'grid-footer',
        template: `
				<div *ngFor= "let column of columns" class="gridHead" [ngClass]="column.class">
          {{columns.label}}
        </div>`,
        styles: [`
          :host { display : table-header-group; }
          .gridHead { display : table-cell}
          `],
        inputs: ['columns', 'rows']
	  	})
		];
	}

  constructor(elementRef) {
  }

}

gridFooterComponent.parameters = [ElementRef];
