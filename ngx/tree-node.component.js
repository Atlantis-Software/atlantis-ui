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
	        <span *ngIf="expandable" class="tree-expander icon" [ngClass]="{
						'icon-folder-open': expanded,
						'icon-folder': !expanded,
						'icon-disabled': disabled
					}" (click)='ExpandClick()'></span>
	        <span *ngIf="!template" [innerHTML]="label" [class.disabled]="disabled" class="tree-node-label"></span>
	        <ng-template *ngIf="template" [ngTemplateOutlet]="template" [ngOutletContext]="data"></ng-template>
					<input *ngIf="selectable" type="checkbox" [ngModel]="selected" class="tree-node-checkbox" (click)="onClick()">
				</div>
        <ng-content *ngIf="expanded"></ng-content>
        <tree-node *ngFor="let child of children" [hidden]="!children?.length || !expandable || !expanded"
          [expandable]="child.expandable"
          [expanded]="child.expanded"
          [label]="child.label"
          [model]="child.model"
          [id]="child.id"
          [children]="child.children"
          [selectable]="child.selectable"
          [template]="template"
          [depth]="depth+1"
          [selected]="child.selected"
          (expand)="expand.emit($event)"
          (collapse)="collapse.emit($event)"
          (select)="onSelect($event)">
        </tree-node>`,
        inputs: ['node', 'label', 'model', 'children', 'expandable', 'expanded', 'selectable', 'disabled', 'template', 'depth', 'selected', 'id'],
        outputs: ['expand', 'collapse', 'select'],
        host: {
          '[class.selectable]': 'selectable'
        },
        queries: {
          nodeChildren: new ViewChildren(treeNodeComponent),
        },
      })
    ];
  }
  constructor(ElementRef, treeNodeComponent) {
    this.elementRef = ElementRef;
    this.expand = new EventEmitter();
    this.collapse = new EventEmitter();
    this.select = new EventEmitter();
    this.data = {};
    this.selected = false;
    this.indeterminate = false;
    this.parent = treeNodeComponent;
  }

  _getCheckbox() {
    return this.elementRef.nativeElement.querySelector('.tree-node-checkbox') || {};
  }

  ngOnInit() {
    this.selected = false;
  }

  ngOnChanges(changes) {
    if (!this.data || !this.data.id) {
      this.data = {
        id: this.id
      };
    }
    if (this.selectable !== true && this.selectable !== false) {
      this.selectable = true;
    }


    // Prevents parent onSelect update to cascade on children
    if (changes.selected && typeof changes.selected.currentValue === "string" && changes.selected.currentValue.includes('no change')) {
      this.selected = (changes.selected.currentValue.replace('no change', '') === 'true');
      return;
    }

    var checkbox = this._getCheckbox();

    this.indeterminate = false;
    checkbox.indeterminate = false;

    if (this.nodeChildren) {
      this.nodeChildren.forEach((child) => {
        child.indeterminate = false;
        child.selected = this.selected;
      });
    }
    if (this.children) {
      this.children.forEach((child) => {
        child.selected = this.selected;
      });
    }
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
    this.data.selected = this.selected;
    this.data.indeterminate = this.indeterminate;

    if (this.nodeChildren) {
      this.nodeChildren.forEach((child) => {
        child.indeterminate = false;
        child.selected = this.selected;
      });
    }
    if (this.children) {
      this.children.forEach((child) => {
        child.selected = this.selected;
      });
    }
    this.select.emit(this.data);
  }

  onSelect(data) {
    var checkbox = this._getCheckbox();
    var nbSelected = 0;
    var isIndeterminate = false;

    this.nodeChildren.forEach((child) => {
      if (child.selected) {
        ++nbSelected;
      }
      if (child.indeterminate) {
        isIndeterminate = true;
      }
    });

    // Update list of children
    this.children.forEach((child) => {
      if (child.id === data.id) {
        child.selected = data.selected + "no change";
      }
    })

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

    this.data.selected = this.selected;
    this.data.indeterminate = this.indeterminate;
    this.select.emit(this.data);
  }
}

treeNodeComponent.parameters = [ElementRef, [new Optional(), new SkipSelf(), new Inject(treeNodeComponent)]];
