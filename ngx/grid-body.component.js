import {
  Component,
  EventEmitter
} from '@angular/core';

export default class gridBodyComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'grid-body',
        template: `
				<div *ngFor="let row of rows; let i = index" (click)="!changingCellContent && selectRow(row, $event, i)" [class.active]='!changingCellContent && selected.includes(row)' class="gridRow">
          <div *ngFor="let column of columns; let y = index" class="gridCell" [ngClass]="column.class" [attr.align]="column.alignment" [style.verticalAlign]="column.vertical_alignment" (dblclick)="!changingCellContent && modifyContent($event, i, y)">
          <input class="form-control" [ngModel]="row[column.label]" *ngIf="changingCellContent === i + '' + y" (blur)="modifyContent($event, i, y, true)" (keyup.enter)="modifyContent($event, i, y, true)" focus/>
					<grid-cell [content]="row[column.label]" [type]="column.type" [pipes]="pipes" *ngIf="changingCellContent !== i + '' + y">
					</grid-cell>
          </div>
        </div>`,
        styles: [`
          :host { display : table-row-group; }
          .gridRow { display : table-row; }
          .gridCell { display : table-cell; }
					.active { background-color: lightblue; }
          `],
        inputs: [
          'columns',
          'rows',
          'pipes',
          'selected',
          'types'
        ],
        outputs: ['selectedRows']
      })
    ];
  }

  constructor() {
    this.selectedRows = new EventEmitter();
    this.previousSelectedIndex;
  }

  selectRow(row, e) {
    if (this.changingCellContent) {
      return;
    }
    var selected = Array.from(this.selected);
    if (e.ctrlKey) {
      var index = selected.indexOf(row);
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(row);
        this.previousSelectedIndex = this.rows.indexOf(row);
      }
    } else if (e.shiftKey) {
      if (typeof this.previousSelectedIndex !== "undefined" && this.previousSelectedIndex !== null) {
        selected = [];
        var indexRow = this.rows.indexOf(row);
        var prev = this.previousSelectedIndex < indexRow ? true : false;
        var i = this.previousSelectedIndex;
        if (prev) {
          for (i; i <= indexRow; i++) {
            selected.push(this.rows[i]);
          }
        } else {
          for (i; i >= indexRow; i--) {
            selected.push(this.rows[i]);
          }
        }
      }
    } else {
      if (this.rows.indexOf(row) === this.previousSelectedIndex) {
        selected = [];
      } else {
        selected = row ? new Array(row) : [];
        this.previousSelectedIndex = this.rows.indexOf(row);
      }
    }
    if (selected.length === 0) {
      this.previousSelectedIndex = null;
    }
    this.selectedRows.emit(selected);
  }

  modifyContent(e, i, y, validateChange) {
    if (this.columns[y].notEditable || (!validateChange && this.changingCellContent)) {
      return;
    }
    var coordinate = i + '' + y;
    if (validateChange) {
      var value = e.target.value;
      if (this.columns[y].type) {
        this.types.forEach((type) => {
          if (type.type === this.columns[y].type && type.transformation) {
            value = type.transformation(value);
          }
        });
      }
      if (value !== "invalid value") {
        this.rows[i][this.columns[y].label] = value;
      }
      this.changingCellContent = false;
    } else {
      this.changingCellContent = coordinate;
    }

  }

}

gridBodyComponent.parameters = [];
