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
          <div *ngFor="let column of columns; let y = index" class="gridCell" [class.changeContent]="changingCellContent === i + '' + y" [class.errorContent]="errorCellContent === i + '' + y" [ngClass]="column.class" [attr.align]="column.alignment" [style.verticalAlign]="column.vertical_alignment" (dblclick)="!changingCellContent && modifyContent($event, i, y)">
            <input class="grid-input-change form-control" [ngModel]="row[column.label]" *ngIf="changingCellContent === i + '' + y" (blur)="modifyContent($event, i, y, true)" (keyup.enter)="modifyContent($event, i, y, true)" focus/>
            <label class="grid-label-error" *ngIf="errorCellContent === i + '' + y" (click)="resetContent($event, i, y)"></label>
            <grid-cell [content]="row[column.label]" [type]="column.type" [pipes]="pipes" *ngIf="changingCellContent !== i + '' + y">
            </grid-cell>
          </div>
        </div>`,
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
    this.isEditable = false;
  }

  //Function launch when we select different row
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

  //action when we double click on a cell, then we can modify content
  modifyContent(e, i, y, validateChange) {
    if (!this.columns[y].isEditable || (!validateChange && this.changingCellContent)) {
      return;
    }
    var coordinate = i + '' + y;
    if (validateChange) {
      var value = e.target.value;
      if (this.columns[y].type) {
        this.types.forEach((type) => {
          if (type.type === this.columns[y].type && type.transformation) {
            //we launch the transformation for the type of the column.
            value = type.transformation(value);
          }
        });
      }
      if (value !== "ERR: invalid value") {
        this.rows[i][this.columns[y].label] = value;
        this.changingCellContent = false;
        this.errorCellContent = false;
      } else {
        this.errorCellContent = this.changingCellContent;
      }
    } else {
      this.oldContent = this.rows[i][this.columns[y].label];
      this.changingCellContent = coordinate;
    }

  }

  resetContent(e, i, y) {
    var input = e.target.parentNode.querySelector('input');
    input.value = this.oldContent;
    input.focus();
    this.rows[i][this.columns[y].label] = this.oldContent;
    this.errorCellContent = false;
  }

}

gridBodyComponent.parameters = [];
