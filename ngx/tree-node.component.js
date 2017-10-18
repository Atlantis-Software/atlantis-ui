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
        <div class="tree-node-line">
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
          <span *ngIf="isSortable" sortable-handle></span>
        </div>
        <ng-content *ngIf="expanded"></ng-content>
        <div *ngIf="children?.length" [hidden]="!expanded" [sortable-container]="children" [draggable]="isSortable" [dropzones]="[sortableZones]">
          <tree-node *ngFor="let child of children; let i = index"
            [(expanded)]="child.expanded"
            [(selected)]="child.selected"
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
            [isSortable]="isSortable"
            (expand)="expand.emit($event)"
            (collapse)="collapse.emit($event)"
            (select)="onSelect($event)"
            [sortable]="isSortable"
            [sortableIndex]="i"
            [dropzones]="[sortableZones]"
            [nested]="nestedSortable"
            (onDragStartCallback)="onDragCallback($event, i, true)"
            (onDragEndCallback)="onDragCallback($event, i, false)"
            (onDragEnterCallback)="onDragOver($event, true)"
            (onDragLeaveCallback)="onDragOver($event, false)">
          </tree-node>
        </div>`,
        inputs: ['node', 'label', 'model', 'children', 'expanded', 'selectable', 'disabled',
          'template', 'depth', 'selected', 'sortableZones', 'nestedSortable', 'isSortable'
        ],
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
    this.expanded = false;
  }

  //close the tree-node we drag if the nestedSortable is activate and if this tree-node has child
  onDragCallback(element, node, value) {
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
    if (value) {
      element.classList.add("tree-node-sorted");
    } else {
      var treeNodeSorted = document.querySelectorAll(".tree-node-sorted");
      if (treeNodeSorted.length > 0) {
        treeNodeSorted.forEach((element) => {
          element.classList.remove("tree-node-sorted");
        });
      }
    }
  }

  onDragOver(element, over) {
    if (over) {
      element.classList.add("tree-node-sorted");
    } else {
      element.classList.remove("tree-node-sorted");
    }
  }

  //Return the checkbox element
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

    //Define the dropZones if it's not a nestedSortable
    if (!this.nestedSortable && this.isSortable) {
      this.sortableZones = "zone" + Math.floor(Math.random() * 100000) + 1;
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

    //if this tree-node have children we change their value selected with this value selected
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

  //callback for click on expand icon
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

  //Callback for click on checkbox
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

  //function call when a children selected value has changed
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

    //that define if this tree-node is checked, not checked or indeterminate
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
