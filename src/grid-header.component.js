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
            [style.width]="column.width" (click)="onSort(column, i)">
            <atlui-grid-cell-header [content]="column.label" [headerTemplate]="headerTemplate" [pipes]="pipes" [sortingClass]="column.sortingClass">
            </atlui-grid-cell-header>
          </div>
        </div>`,
        inputs: ['columns', 'pipes', 'headerTemplate'],
        outputs: ['sort']
      })
    ];
  }

  constructor() {
    this.sort = new EventEmitter();
    this.sortColumns = [];
    this.isSortable = false;
  }

  onSort(column, id) {
    if (!column.isSortable) {
      return;
    }
    // var sort = {label: column.label};
    var alreadyOrdered = false;
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
  }

}
