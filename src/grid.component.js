import {
  Component,
  ElementRef,
  Injector,
  EventEmitter,
  ChangeDetectorRef,
  TemplateRef,
  Directive,
  ContentChild
} from '@angular/core';
import {
  gridConfig
} from './grid.config.js';

export class gridComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-grid',
        template: `
        <atlui-grid-header class="gridHeader" [headerTemplate]="headerTemplate" [columns]="columns" [pipes]="pipes" (sort)="sort.emit($event)">
        </atlui-grid-header>
        <atlui-grid-body class="gridBody" [types]="types" [columns]="columns" [rows]="rows" [pipes]="pipes" [selected]="selected"
          [multiple]='multiple' (selectedRows)="onSelect($event)">
        </atlui-grid-body>
        <atlui-grid-footer class="gridFooter" *ngIf="config.footer !=='none'" [columns]="columns">
        </atlui-grid-footer>`,
        inputs: ['columns', 'rows', 'config', 'selected', 'multiple', 'headerFixed'],
        outputs: ['selectedRows', 'sort'],
        host: {
          "[class.table-fixed]": "headerFixed"
        },
        queries: {
          headerTemplate: new ContentChild(gridCellHeaderTemplate),
        }
      })
    ];
  }

  constructor(elementRef, gridConfig, injector, cdr) {
    var self = this;
    this.headerTemplate = null;
    this.elementRef = elementRef;
    this.cdr = cdr;
    this.multiple = false;
    this.config = {};
    this.injector = injector;
    this.pipes = [];
    this.types = gridConfig;
    this.headerFixed = false;
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

    this.config.footer = "none" || this.config.footer;
  }

  onSelect(row) {
    this.selectedRows.emit(row);
  }

  ngAfterViewInit() {
    if (!this.headerFixed) {
      return;
    }
    var rowStyle = window.getComputedStyle(this.elementRef.nativeElement.querySelector("atlui-grid-body .gridRow"), null);

    var rowWidth = parseInt(rowStyle.getPropertyValue("width"));
    var widthRemaining = rowWidth;
    var columnWithoutWidth = 0;
    this.columns.forEach((column)=> {
      if (column.width && column.width !== "auto") {
        widthRemaining -= parseInt(column.width);
      } else {
        columnWithoutWidth++;
      }
    });

    this.columns.forEach((column)=> {
      if (!column.width || column.width === "auto") {
        column.width = (widthRemaining / columnWithoutWidth) + "px";
      }
    });
    this.cdr.detectChanges();
  }
}

gridComponent.parameters = [ElementRef, gridConfig, Injector, ChangeDetectorRef];

export class gridCellHeaderTemplate {
  static get annotations() {
    return [
      new Directive({
        selector: 'ng-template[atlui-grid-cell-header]',
      })
    ];
  }
  constructor(TemplateRef) {
    this.templateRef = TemplateRef;
  }
}

gridCellHeaderTemplate.parameters = [TemplateRef];
