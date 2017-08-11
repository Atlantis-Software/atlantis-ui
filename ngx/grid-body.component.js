import { Component, ElementRef, EventEmitter} from '@angular/core';

export default class gridBodyComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'grid-body',
        template: `
				<div *ngFor="let row of rows" (click)="selectRow(row, $event)" [class.active]='selected.includes(row)' class="gridRow">
          <div *ngFor="let column of columns" class="gridCell" [ngClass]="column.class" [attr.align]="column.alignment">
						<grid-cell [content]="row[column.label]" [type]="column.type" [pipes]="pipes">
						</grid-cell>
          </div>
        </div>`,
        styles: [`
          :host { display : table-row-group; }
          .gridRow { display : table-row; }
          .gridCell { display : table-cell; }
					.active { background-color: blue; }
          `],
        inputs: [
					'columns',
					'rows',
					'pipes',
					"selected"
				],
				outputs: ['select']
	  	})
		];
	}

  constructor(elementRef) {
		this.select = new EventEmitter();
		this.previousSelectedIndex;
  }

	selectRow(row, e){
		var selected = Array.from(this.selected)
		console.log("this.selected ", this.selected)
		console.log("selected ", selected)
		if( e.ctrlKey ) {
			var index = selected.indexOf(row);
			if (index > -1) {
				selected.splice(index, 1);
			} else {
				selected.push(row);
				console.log("test")
				this.previousSelectedIndex = this.rows.indexOf(row);
			}
		} else if (e.shiftKey) {
			if (this.previousSelectedIndex != "undefined" && this.previousSelectedIndex != null) {
				selected = []
				var indexRow = this.rows.indexOf(row);
				var prev = this.previousSelectedIndex < indexRow ? true : false;
				if (prev) {
					for (var i = this.previousSelectedIndex ; i <= indexRow; i++) {
						selected.push(this.rows[i]);
					}
				} else {
					for (var i = this.previousSelectedIndex; i >= indexRow; i--) {
						selected.push(this.rows[i]);
					}
				}
			}
		} else {
			selected = new Array(row);
			this.previousSelectedIndex = this.rows.indexOf(row);
		}
		if (selected.length === 0) {
			this.previousSelectedIndex = null;
		}
		this.select.emit(selected);
	}

}

gridBodyComponent.parameters = [ElementRef];
