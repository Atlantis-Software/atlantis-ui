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
import ResizeObserver from 'resize-observer-polyfill';

export class gridComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-grid',
        template: `
        <atlui-grid-header class="gridHeader" [headerTemplate]="headerTemplate" [columnsWidths]="columnsWidths" [columns]="columns" [pipes]="pipes" [multipleSort]="multipleSort" (sort)="sort.emit($event)">
        </atlui-grid-header>
        <atlui-grid-body [headerFixed]="headerFixed" class="gridBody" [style.height]="height" [columnsWidths]="columnsWidths" [types]="types" [columns]="columns" [rows]="rows" [pipes]="pipes" [selected]="selected"
          [multiple]='multiple' (selectedRows)="onSelect($event)">
        </atlui-grid-body>
        <atlui-grid-footer class="gridFooter" *ngIf="config.footer !=='none'" [columns]="columns">
        </atlui-grid-footer>`,
        inputs: ['columns', 'rows', 'config', 'selected', 'multiple', 'headerFixed', 'height', 'multipleSort'],
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
    this.multipleSort = false;
    this.cdr = cdr;
    this.multiple = false;
    this.config = {};
    this.injector = injector;
    this.pipes = [];
    this.types = gridConfig;
    this.headerFixed = false;
    this.height = undefined;
    this.columnsWidths = [];
    this.originColumnsWidths = [];
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
    this.origColumns = [...this.columns];
    this.columns.forEach(function(column) {
      self.originColumnsWidths.push(column.width);
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

  ngAfterViewChecked() {
    if (!this.headerFixed) {
      return;
    }
    if (this.gridRowCalc) {
      return;
    }
    this.redraw();
    this.ro = new ResizeObserver(()=>{
      if (!this.cdr['destroyed']) {
        this.redraw();
      }
    });
    this.gridRowCalc = this.elementRef.nativeElement.querySelector("atlui-grid-body .gridRowCalc");
    this.ro.observe(this.gridRowCalc);
  }

  ngOnDestroy() {
    if (this.ro) {
      this.ro.disconnect();
    }
  }

  redraw() {
    if (!this.height) {
      this.height = "300px";
    }
    var rowStyle = window.getComputedStyle(this.elementRef.nativeElement.querySelector("atlui-grid-body .gridRowCalc"), null);

    var rowWidth = rowStyle.getPropertyValue("width");
    if (rowWidth === "auto") {
      return;
    }
    if (rowWidth === this.oldWidth) {
      return;
    }
    this.columnsWidths = [];
    var widthRemaining = parseInt(rowWidth);
    var columnWithoutWidth = 0;
    this.originColumnsWidths.forEach((width)=> {
      if (width && width !== "auto") {
        if (width.indexOf('px') !== -1) {
          widthRemaining -= parseInt(width);
        } else if (width.indexOf('%') !== -1) {
          widthRemaining -= parseInt(rowWidth)*(parseInt(width)/100);
        }
      } else {
        columnWithoutWidth++;
      }
    });
    if (widthRemaining < 0) {
      columnWithoutWidth = this.originColumnsWidths.length;
    }
    setTimeout(() => {
      this.columns.forEach((column, index)=> {
        if (!this.originColumnsWidths[index] || this.originColumnsWidths[index] === "auto") {
          this.columnsWidths.push((parseInt(widthRemaining / columnWithoutWidth)) + "px");
        } else {
          this.columnsWidths.push(this.originColumnsWidths[index]);
        }
      });
      this.oldWidth = rowWidth;
      this.cdr.detectChanges();
    }, 0);
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
