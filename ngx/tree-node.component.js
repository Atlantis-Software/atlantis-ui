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
          <span *ngIf="!template" [innerHTML]="selected" [class.disabled]="disabled"></span>
	        <ng-template *ngIf="template" [ngTemplateOutlet]="template" [ngOutletContext]="data"></ng-template>
					<input *ngIf="selectable" type="checkbox" [ngModel]="selected" class="tree-node-checkbox" (click)="onClick()" [attr.disabled]="disabled">
          <span *ngIf="!notSortable" sortable-handle>=</span>
				</div>
        <ng-content *ngIf="expanded"></ng-content>
        <div *ngIf="children?.length" [hidden]="!expandable || !expanded" [sortable-container]="notSortable" [sortableData]="children" [dropzones]="sortableZones">
          <tree-node *ngFor="let child of children; let i = index"
            [(expanded)]="child.expanded"
            [(selected)]="child.selected"
            [expandable]="child.expandable"
            [label]="child.label"
            [model]="child.model"
            [id]="child.id"
            [children]="child.children"
            [selectable]="child.selectable"
            [template]="template"
            [depth]="depth+1"
            [disabled]="child.disabled"
            [sortableZones]="sortableZones"
            [nestedSortable]="nestedSortable"
            [notSortable]="notSortable"
            (expand)="expand.emit($event)"
            (collapse)="collapse.emit($event)"
            (select)="onSelect($event)"
            [sortable]="notSortable"
            [sortableIndex]="i"
            [dropzones]="sortableZones"
            [nested]="nestedSortable"
            (onDragStartCallback)="onDragCallback(i, true)"
            (onDragEndCallback)="onDragCallback(i, false)">
          </tree-node>
        </div>`,
        inputs: ['node', 'label', 'model', 'children', 'expandable', 'expanded', 'selectable', 'disabled',
          'template', 'depth', 'selected', 'sortableZones', 'nestedSortable', 'notSortable'],
        outputs: ['expand', 'collapse', 'select', 'selectedChange', 'expandedChange'],
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
    this.expandedChange = new EventEmitter();
    this.indeterminate = false;
    this.parent = treeNodeComponent;
  }

  onDragCallback(node, value){
    if (!this.children) {
      return;
    }
    if (this.nestedSortable) {
      if (value && this.children[node].expanded) {
        this.children[node].oldExpanded = this.children[node].expanded;
        this.children[node].expanded = false;
      } else if (!value) {
        if (this.children[node].oldExpanded) {
          this.children[node].expanded = this.children[node].oldExpanded;
        }
      }
    }
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

    if (!this.nestedSortable) {
      this.sortableZones = "zone"+Math.floor(Math.random()*100000) +1;
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
      this.expand.emit(this.data);
    } else if (!this.expand) {
      this.collapse.emit(this.data);
    }
    this.expandedChange.emit(this.expanded);

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
