import {
  Component,
  ElementRef,
  Injector,
  EventEmitter
} from '@angular/core';
import {
  gridConfig
} from './grid.config.js';

export default class gridComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'grid',
        template: `
        <grid-header class="gridHeader" [columns]="columns" [pipes]="pipes" (sort)="sort.emit($event)">
        </grid-header>
        <grid-body class="gridBody" [types]="types" [columns]="columns" [rows]="rows" [pipes]="pipes" [selected]="selected" (selectedRows)="onSelect($event)">
        </grid-body>
        <grid-footer class="gridFooter" *ngIf="config.footer !=='none'" [columns]="columns" [rows]="rows">
        </grid-footer>`,
        inputs: ['columns', 'rows', 'config', 'selected'],
        outputs: ['selectedRows', 'sort']
      })
    ];
  }

  constructor(elementRef, gridConfig, injector) {
    var self = this;
    this.injector = injector;
    this.pipes = [];
    this.types = gridConfig;
    this.selectedRows = new EventEmitter();
    this.sort = new EventEmitter();
    if (this.types) {
      this.types.forEach(function(type, i) {
        if (type.pipes) {
          if (Array.isArray(type.pipes)) {
            self.pipes[i] = [];
            type.pipes.forEach(function(pipe, indexPipe) {
              var options = type.optionsPipe[indexPipe] || [];
              options = Array.isArray(options) ? options : options.split(':');
              self.pipes[i][indexPipe] = {
                pipe: pipe,
                option: options || []
              };
            });
            self.pipes[i].type = type.type;
          } else {
            var options = type.optionsPipe[i] || [];
            options = Array.isArray(options) ? options : options.split(':');
            self.pipes[i] = {
              pipe: self.pipes[i],
              type: type.type,
              option: options
            };
          }
        }
      });
    }
  }

  ngOnInit() {
    var self = this;
    this.columns.forEach(function(column) {
      var indexType = -1;
      self.types.forEach(function(type, i) {
        if (column.type === type.type) {
          indexType = i;
        }
      });

      if (indexType !== -1) {
        column.class = column.class || self.types[indexType].class;
        column.alignment = column.alignment || self.types[indexType].alignment;
        column.width = column.width || "auto";
        column.vertical_alignment = column.vertical_alignment || self.types[indexType].vertical_alignment;
      }
    });

    this.config = {};
    this.config.footer = "none" || this.config.footer;
  }

  onSelect(row) {
    this.selectedRows.emit(row);
  }
}

gridComponent.parameters = [ElementRef, gridConfig, Injector];
