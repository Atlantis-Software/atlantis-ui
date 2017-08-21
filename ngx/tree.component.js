import { Component, EventEmitter, ContentChild, ContentChildren, TemplateRef, forwardRef } from '@angular/core';

import { treeNodeComponent } from './tree-node.component.js';

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
          [children]="node.children"
          [selectable]="node.selectable"
          [template]="template"
          (expand)="expand.emit($event)"
          (collapse)="collapse.emit($event)"
          (select)="select.emit($event)">
        </tree-node>
        <ng-content *ngIf="!nodes"></ng-content>
        <div class="tree-bar" *ngIf="nodes?.length || nodeElements?.length"></div>`,
        inputs: ['nodes', 'template'],
        outputs: ['expand', 'collapse', 'select'],
        queries: {
          template: new ContentChild(TemplateRef),
          nodeElements: new ContentChildren( forwardRef(() => treeNodeComponent))
        },
        host: {
          '[class.one-leaf]':'hasOneLeaf'
        }
	  	})
		];
	}
  constructor() {
    this.expand = new EventEmitter();
    this.collapse = new EventEmitter();
    this.select = new EventEmitter();
  }

  get hasOneLeaf(){
    return (this.nodes && this.nodes.length === 1) || (this.nodeElements.length === 1);
  }

  ngAfterViewInit(){
    console.log(this);
  }
}
