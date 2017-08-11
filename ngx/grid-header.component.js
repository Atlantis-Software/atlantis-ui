import { Component, ElementRef, EventEmitter} from '@angular/core';

export default class gridHeaderComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'grid-header',
        template: `
				<div class="gridRow">
					<div *ngFor= "let column of columns" class="gridHead" [ngClass]="column.class" [style.width]="column.width">
						<grid-cell-header [content]="column.label" [pipes]="pipes" [sorting]="sorting" [column]="column" (sort)="sort.emit($event)">
						</grid-cell-header>
	        </div>
				</div>`,
        styles: [`
          :host { display : table-header-group; }
          .gridHead { display : table-cell; }
					.gridRow { display : table-row; }
          `],
        inputs: ['columns', 'pipes', 'sorting'],
				outputs: ['sort']
	  	})
		];
	}

  constructor(elementRef) {
		this.sort = new EventEmitter();
  }



}

gridHeaderComponent.parameters = [ElementRef];
