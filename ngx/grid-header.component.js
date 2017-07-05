import { Component, ElementRef, EventEmitter} from '@angular/core';

export default class gridHeaderComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'grid-header',
        template: `
				<div class="gridRow">
					<div *ngFor= "let column of columns" class="gridHead" [ngClass]="column.class" [style.width]="column.width">
						<grid-cell-header [content]="column.label" [pipes]= pipes>
						</grid-cell-header>
	        </div>
				</div>`,
        styles: [`
          :host { display : table-header-group; }
          .gridHead { display : table-cell; }
					.gridRow { display : table-row; }
          `],
        inputs: ['columns', 'pipes'],
				outputs: ['tableChanged']
	  	})
		];
	}

  constructor(elementRef) {
		this.tableChanged = new EventEmitter();
  }

}

gridHeaderComponent.parameters = [ElementRef];
