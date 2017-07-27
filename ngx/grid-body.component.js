import { Component, ElementRef} from '@angular/core';

export default class gridBodyComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'grid-body',
        template: `
				<div *ngFor="let row of rows" class="gridRow">
          <div *ngFor="let column of columns" class="gridCell" [ngClass]="column.class" [attr.align]="column.alignment">
						<grid-cell [content] = "row[column.label]" [type]="column.type" [pipes]="pipes">
						</grid-cell>
          </div>
        </div>`,
        styles: [`
          :host { display : table-row-group; }
          .gridRow { display : table-row; }
          .gridCell { display : table-cell; }
          `],
        inputs: ['columns', 'rows', 'pipes']
	  	})
		];
	}

  constructor(elementRef) {
  }

}

gridBodyComponent.parameters = [ElementRef];

// {{row[column.label] | dynamic:'date'}}
