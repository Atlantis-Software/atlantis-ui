import { Component, EventEmitter } from '@angular/core';

export default class treeNodeComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'tree-node',
        template: `
        <span *ngIf="expandable" class="tree-expander icon" [ngClass]="{
					'icon-previous': expanded,
					'icon-next': !expanded,
					'disabled': disabled
				}" (click)='ExpandClick()'></span>
        <span *ngIf="!template" [innerHTML]="label" class="tree-node-label"></span>
        <ng-template *ngIf="template" [ngTemplateOutlet]="template" [ngOutletContext]="data"></ng-template>
        <ng-content *ngIf="expanded"></ng-content>
        <tree *ngIf="children?.length && expandable && expanded"
          class="sub-tree"
          [nodes]="children"
          [template]="template">
				</tree>`,
        inputs: ['label', 'model', 'children', 'expandable', 'expanded', 'selectable', 'disabled', 'template'],
				outputs: ['expand', 'collapse', 'select'],
				host: {
					'(click)':'onClick()',
					'[class.selectable]':'selectable'
				}

			})
		];
	}
	constructor() {
		this.expand = new EventEmitter();
		this.collapse = new EventEmitter();
		this.select = new EventEmitter();
	}

	ngOnChanges() {
		this.data = {
			label: this.label,
			children: this.children,
			model: this.model
		};
	}

	ExpandClick() {
		if (this.disabled) {
			return;
		}
		this.expanded = !this.expanded;

		if (this.expanded) {
			this.expand.emit(this.date);
		} else if (!this.expand) {
			this.collapse.emit(this.data);
		}
	}


	onClick() {
		if (!this.selectable || this.disabled) {
			return
		}
		this.select.emit(this.data);
	}
}
