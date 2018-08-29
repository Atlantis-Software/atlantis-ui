import {
  Component,
  EventEmitter
} from '@angular/core';

export default class gridHeaderComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-grid-header',
        template: `
        <div class="gridRow">
          <div class="gridHead"
            *ngFor= "let column of columns; let i = index;"
            [ngClass]="column.class"
            [class.sortable]="column.isSortable"
            [style.width]="columnsWidths[i] || column.width"
            (click)="onSort(column, i)">
            <atlui-grid-cell-header [content]="column.columnName || column.label" [headerTemplate]="headerTemplate" [pipes]="pipes" [sortingClass]="column.sortingClass">
            </atlui-grid-cell-header>
          </div>
        </div>`,
        inputs: ['columns', 'pipes', 'headerTemplate', 'columnsWidths', 'multipleSort'],
        outputs: ['sort']
      })
    ];
  }

  constructor() {
    this.sort = new EventEmitter();
    this.sortColumnUnique = {};
    this.sortColumns = [];
    this.isSortable = false;
  }

  // emit the sort when we click on a sortable column
  // We can define if we want multipleSort ou single sort
  onSort(column, id) {
    if (!column.isSortable) {
      return;
    }
    var alreadyOrdered = false;
    if (this.multipleSort) {
      this.sortColumns.forEach((sortColumn, index) => {
        if (sortColumn.label === column.label) {
          if (sortColumn.order === 'asc') {
            this.columns[id].sortingClass = 'icon icon-sort-desc';
            sortColumn.order = 'desc';
          } else {
            this.columns[id].sortingClass = '';
            this.sortColumns.splice(index, 1);
          }
          alreadyOrdered = true;
        }
      });
      if (!alreadyOrdered) {
        this.columns[id].sortingClass = 'icon icon-sort-asc';
        this.sortColumns.push({
          label: column.label,
          order: 'asc',
          type: column.type || 'text'
        });
      }
      this.sort.emit(this.sortColumns);
    } else {
      if (this.sortColumnUnique.label === column.label) {
        if (this.sortColumnUnique.order === 'asc') {
          this.columns[id].sortingClass = 'icon icon-sort-desc';
          this.sortColumnUnique.order = 'desc';
        } else {
          this.columns[id].sortingClass = '';
          this.sortColumnUnique = {};
        }
        alreadyOrdered = true;
      }
      if (!alreadyOrdered) {
        this.columns.forEach((column) => {
          column.sortingClass = '';
        });
        this.columns[id].sortingClass = 'icon icon-sort-asc';
        this.sortColumnUnique = {
          label: column.label,
          order: 'asc',
          type: column.type || 'text'
        };
      }
      this.sort.emit(this.sortColumnUnique);
    }
  }

}
