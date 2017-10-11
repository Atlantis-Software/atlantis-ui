import {
  Component,
  EventEmitter,
  ElementRef,
  Optional,
  SkipSelf,
  Inject,
  ViewChildren
} from '@angular/core';

export default class treeNodeComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'tree-node',
        template: `
				<div class="tree-node-line" style="padding-left:">
	        <span *ngIf="children?.length" class="tree-expander icon" [ngClass]="{
						'icon-folder-open': expanded,
						'icon-folder': !expanded,
						'icon-disabled': disabled
					}" (click)='ExpandClick()'></span>
	        <span *ngIf="!template" [innerHTML]="label" [class.disabled]="disabled" class="tree-node-label"></span>
	        <ng-template *ngIf="template" [ngTemplateOutlet]="template" [ngOutletContext]="data"></ng-template>
          <div *ngIf="selectable" class="tree-node-checkbox">
            <div class="checkbox">
              <input type="checkbox" [ngModel]="selected" (click)="onClick()" [attr.disabled]="disabled">
              <label>
                &nbsp;
              </label>
            </div>
          </div>
				</div>
        <ng-content *ngIf="expanded"></ng-content>
        <tree-node *ngFor="let child of children" [hidden]="!children?.length || !expandable || !expanded"
          [expandable]="child.expandable"
          [expanded]="child.expanded"
          [label]="child.label"
          [model]="child.model"
          [children]="child.children"
          [selectable]="child.selectable"
          [template]="template"
          [depth]="depth+1"
          [disabled]="child.disabled"
          [(selected)]="child.selected"
          (expand)="expand.emit($event)"
          (collapse)="collapse.emit($event)"
          (select)="onSelect($event)">
        </tree-node>`,
        inputs: ['node', 'label', 'model', 'children', 'expandable', 'expanded', 'selectable', 'disabled', 'template', 'depth', 'selected'],
        outputs: ['expand', 'collapse', 'select', 'selectedChange'],
        host: {
          '[class.selectable]': 'selectable'
        },
        queries: {
          nodeChildren: new ViewChildren(treeNodeComponent),
        }
      })
    ];
  }
  constructor(ElementRef, treeNodeComponent) {
    this.elementRef = ElementRef;
    this.expand = new EventEmitter();
    this.collapse = new EventEmitter();
    this.select = new EventEmitter();
    this.selectedChange = new EventEmitter();
    this.indeterminate = false;
    this.parent = treeNodeComponent;
  }

  _getCheckbox() {
    return this.elementRef.nativeElement.querySelector('input[type="checkbox"]') || {};
  }

  ngOnChanges() {

    if (this.selectable !== true && this.selectable !== false) {
      this.selectable = true;
    }

    if (this.disabled) {
      return;
    }

    if (!this.selectable) {
      return;
    }

    if (this.selected === void 0) {
      return;
    }

    if (!this.parent || this.parent.indeterminate) {
      return;
    }

    var checkbox = this._getCheckbox();

    this.indeterminate = false;
    checkbox.indeterminate = false;

    if (this.children) {
      this.children.forEach((child) => {
        if (!child.disabled && !child.selectable) {
          child.selected = this.selected;
        }
      });
    }
    this.selectedChange.emit(this.selected);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.tree-node-line').style.paddingLeft = 30 * this.depth + "px";
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
    if (this.disabled) {
      return;
    }
    this.selected = !this.selected;
    this.indeterminate = false;
    if (this.children) {
      this.children.forEach((child) => {
        if (!child.disabled && !child.selectable) {
          child.selected = this.selected;
        }
      });
    }
    this.selectedChange.emit(this.selected);
    this.select.emit();
  }

  onSelect() {
    if (this.disabled) {
      return;
    }
    var checkbox = this._getCheckbox();
    var nbSelected = 0;
    var isIndeterminate = false;
    var childIsSelected = false;

    this.nodeChildren.forEach((child) => {
      if (child.selected) {
        ++nbSelected;
        childIsSelected = true;
      }
      if (child.disabled) {
        ++nbSelected;
      }
      if (child.indeterminate) {
        isIndeterminate = true;
      }
    });

    if (!childIsSelected) {
      nbSelected = 0;
    }

    if (isIndeterminate) {
      this.selected = false;
      checkbox.indeterminate = true;
      this.indeterminate = true;
    } else if (!nbSelected) {
      this.selected = false;
      checkbox.indeterminate = false;
      this.indeterminate = false;
    } else if (nbSelected === this.nodeChildren.length) {
      this.selected = true;
      checkbox.indeterminate = false;
      this.indeterminate = false;
    } else {
      this.selected = false;
      checkbox.indeterminate = true;
      this.indeterminate = true;
    }

    this.selectedChange.emit(this.selected);
    this.select.emit();
  }
}

treeNodeComponent.parameters = [ElementRef, [new Optional(), new SkipSelf(), new Inject(treeNodeComponent)]];
