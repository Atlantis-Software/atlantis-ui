import { Component, EventEmitter, ContentChild, ContentChildren, TemplateRef, forwardRef } from '@angular/core';

import treeNodeComponent from './tree-node.component.js';

export default class treeComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'tree',
        template: `
        <tree-node *ngFor="let node of _nodes"
					[node]="node"
          [expandable]="node.expandable"
          [expanded]="node.expanded"
          [label]="node.label"
          [model]="node.model"
          [children]="node.children"
          [selectable]="node.selectable"
          [template]="template"
					[depth]="depth"
					[selected]="selected"
          (expand)="expand.emit($event)"
          (collapse)="collapse.emit($event)"
          (select)="select.emit($event)">
        </tree-node>
        <ng-content *ngIf="!nodes"></ng-content>`,
        inputs: ['nodes', 'template', 'depth', 'selected'],
        outputs: ['expand', 'collapse', 'select'],
        queries: {
          template: new ContentChild(TemplateRef),
        }
	  	})
		];
	}
  constructor() {
    this.expand = new EventEmitter();
    this.collapse = new EventEmitter();
    this.select = new EventEmitter();
		this.depth = 1;
  }

}
