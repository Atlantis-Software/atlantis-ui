import {
  Component,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ChangeDetectorRef
} from '@angular/core';

export default class treeComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'tree',
        template: `
        <tree-node *ngFor="let node of nodes"
          [expandable]="node.expandable"
          [expanded]="node.expanded"
          [label]="node.label"
          [model]="node.model"
          [id]="node.id"
          [children]="node.children"
          [selectable]="node.selectable"
          [template]="template"
          [depth]="depth"
          [disabled]="node.disabled"
          [(selected)]="node.selected"
          (expand)="expand.emit($event)"
          (collapse)="collapse.emit($event)"
          (select)="onSelect($event)">
        </tree-node>
        <ng-content *ngIf="!nodes"></ng-content>`,
        inputs: ['nodes', 'template', 'depth'],
        outputs: ['expand', 'collapse', 'select', 'nodesChanges'],
        queries: {
          template: new ContentChild(TemplateRef),
        }
      })
    ];
  }
  constructor(changeDetectorRef) {
    this.expand = new EventEmitter();
    this.collapse = new EventEmitter();
    this.select = new EventEmitter();
    this.nodesChanges = new EventEmitter();
    this.depth = 1;
    this.cdr = changeDetectorRef;
  }

  ngAfterViewInit() {
    var recursiveSetId = function(node) {
      node.selected = node.selected || false;
      if (node.children) {
        node.children.forEach(function(child) {
          recursiveSetId(child);
        });
      }
    };
    this.nodes.forEach(function(node) {
      recursiveSetId(node);
    });
    this.cdr.detectChanges();
  }

  onSelect() {
    this.nodesChanges.emit(this.nodes);
  }

}

treeComponent.parameters = [ChangeDetectorRef];
