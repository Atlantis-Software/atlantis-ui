import {
  Component,
  EventEmitter,
  ContentChild,
  ContentChildren,
  TemplateRef,
  ChangeDetectorRef
} from '@angular/core';

import treeNodeComponent from './tree-node.component.js';

var id = 0;

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
          [selected]="node.selected"
          (expand)="expand.emit($event)"
          (collapse)="collapse.emit($event)"
          (select)="select.emit($event)">
        </tree-node>
        <ng-content *ngIf="!nodes"></ng-content>`,
        inputs: ['nodes', 'template', 'depth'],
        outputs: ['expand', 'collapse', 'select'],
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
    this.depth = 1;
    this.cdr = changeDetectorRef;
  }

  ngAfterViewInit() {
    var recursiveSetId = function(node) {
      node.id = ++id;
      if (node.children) {
        node.children.forEach(function(child) {
          recursiveSetId(child);
        });
      }
    }
    this.nodes.forEach(function(node) {
      recursiveSetId(node);
    });
    this.cdr.detectChanges();
  }

}

treeComponent.parameters = [ChangeDetectorRef];
