import { Component, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';

export default class treeNodeComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'tree-node',
        template: `
				<div class="tree-node-line" style="padding-left:">
	        <span *ngIf="expandable" class="tree-expander icon" [ngClass]="{
						'icon-folder-open': expanded,
						'icon-folder': !expanded,
						'icon-disabled': disabled
					}" (click)='ExpandClick()'></span>
	        <span *ngIf="!template" [innerHTML]="label" [class.disabled]="disabled" class="tree-node-label"></span>
	        <ng-template *ngIf="template" [ngTemplateOutlet]="template" [ngOutletContext]="data"></ng-template>
					<input *ngIf="selectable" type="checkbox" [(ngModel)]="_selected" class="tree-node-checkbox" (click)="onClick()">
				</div>
        <ng-content *ngIf="expanded"></ng-content>
        <tree [hidden]="!children?.length || !expandable || !expanded"
          class="sub-tree"
          [nodes]="children"
          [template]="template"
					[depth]="depth+1"
					[selected]="selected"
					(select)="onSelect($event)">
				</tree>`,
        inputs: ['node', 'label', 'model', 'children', 'expandable', 'expanded', 'selectable', 'disabled', 'template', 'depth', 'selected'],
				outputs: ['expand', 'collapse', 'select'],
				host: {
					'[class.selectable]':'selectable'
				}
			})
		];
	}
	constructor(ElementRef, ChangeDetectorRef) {
		this.elementRef = ElementRef;
		this.cdr = ChangeDetectorRef;
		this.expand = new EventEmitter();
		this.collapse = new EventEmitter();
		this.select = new EventEmitter();
		this.data = {};
		this._selected = false;
		this._nbData = 0;
	}

	ngOnChanges() {
		if ( this.selectable !== true && this.selectable !== false) {
			this.selectable = true;
		}
		this.data = {
			label: this.label,
			children: this.children,
			model: this.model,
		};

		if(this.selected) {
			this._selected = true;
			if (this.children) {
				this._nbData = this.children.length;
			} else {
				this._nbData = 0;
			}
		} else {
			this._selected = false;
			this._nbData = 0;
		}
	}

	ngAfterViewInit() {
		this.elementRef.nativeElement.querySelector('.tree-node-line').style.paddingLeft = 30*this.depth+"px";
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
		this.selected = false;
		this.cdr.detectChanges();

		this._selected = !this._selected;

		if (this._selected) {
			this.data.selected = true;
			this.selected = true;
			if (this.children) {
				this._nbData = this.children.length;
			} else {
				this._nbData = 0;
			}
		} else {
			this.data.selected = false;
			this.selected = false;
			this._nbData = 0;
		}
		this.select.emit(this.data);
	}

	onSelect(data) {
		if (!data.selected) {
			this._selected = false;
			this._nbData -= 1;
			if (this._nbData < 0) {
				this._nbData = 0;
			}
		} else if (data.selected === true) {
			data.selected = false;
			this._nbData += 1;
			this._nbData = Math.trunc(this._nbData)
		} else if (data.selected === "indeterminate"){
			this._nbData += 0.5;
		}
		var checkbox = this.elementRef.nativeElement.querySelector('.tree-node-checkbox');
		checkbox.indeterminate = false;
		if (this._nbData === this.children.length) {
			this._selected = true;
			data.selected = true;
		} else if (this._nbData > 1) {
			checkbox.indeterminate = true;
			data.selected = "other";
		} else if (this._nbData > 0) {
			checkbox.indeterminate = true;
			data.selected = "indeterminate"
		}

		this.select.emit(data);
		console.log(this.children);
	}
}

treeNodeComponent.parameters = [ElementRef, ChangeDetectorRef]
