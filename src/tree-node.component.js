import {
  Component,
  EventEmitter,
  ElementRef,
  Optional,
  SkipSelf,
  Inject,
  ViewChildren,
  KeyValueDiffers,
  ChangeDetectorRef
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

export default class treeNodeComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-tree-node',
        template: require('./tree-node.html'),
        inputs: ['node', 'label', 'model', 'children', 'expanded', 'selectable', 'indeterminate', 'disabled',
          'template', 'depth', 'selected', 'sortableZones', 'nestedSortable', 'isSortable', 'loading',
          'nodeSelected', 'plugins'
        ],
        outputs: ['onExpand', 'onCollapse', 'check', 'selectedChange', 'expandedChange', 'indeterminateChange', 'onClickNode'],
        host: {
          '[class.selectable]': 'selectable'
        },
        queries: {
          nodeChildren: new ViewChildren(treeNodeComponent),
        }
      })
    ];
  }
  constructor(ElementRef, treeNodeComponent, differs, changeDetectorRef) {
    this.elementRef = ElementRef;
    this.onExpand = new EventEmitter();
    this.onCollapse = new EventEmitter();
    this.check = new EventEmitter();
    this.selectedChange = new EventEmitter();
    this.indeterminateChange = new EventEmitter();
    this.expandedChange = new EventEmitter();
    this.onClickNode = new EventEmitter();
    this.indeterminate = false;
    this.parent = treeNodeComponent;
    this.expanded = false;
    this.selected = false;
    this.differ = differs.find({}).create(null);
    this.change = new Subject();
    this.cdr = changeDetectorRef;
  }

  // emit the node where we click
  onClickNodeCallback() {
    this.onClickNode.emit(this.node);
  }

  // update the tree on sort
  updateTree() {
    var treeNodeSorted = this.elementRef.nativeElement.querySelectorAll(".tree-node-sorted");
    if (treeNodeSorted.length > 0) {
      treeNodeSorted.forEach((element) => {
        element.classList.remove("tree-node-sorted");
      });
    }
  }

  ngOnInit() {
    // if not we have a error
    this.updateParents();
  }

// verify if a changment occurs on a node and send to plugins the change
  ngDoCheck() {
    var changesNode = this.differ.diff(this.node);
    if (changesNode) {
      changesNode.forEachChangedItem((record) => this.changeNode());
      changesNode.forEachAddedItem((record) => this.changeNode());
      changesNode.forEachRemovedItem((record) => this.changeNode());
    }
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
      var treeNodeSorted = this.elementRef.nativeElement.querySelectorAll(".tree-node-sorted");
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

  changeNode() {
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

    if (this.children) {
      // we select or deselect all children if the parent is checked or unchecked
      this.children.forEach((child) => {
        if (!child.disabled && !child.selectable) {
          child.selected = this.selected || false;
        }
      });
    }
    this.updateParents();
  }

  updateParents() {
    var self = this;
    (function updateParent(indeterminate = self.indeterminate, parent = self.parent) {
      var nbChildrenChecked = 0;
      if (parent && parent.children && parent.children.length > 0) {
        parent.children.forEach((child) => {
          if (child.selected) {
            nbChildrenChecked++;
          }
        });
        // case no child checked
        if (nbChildrenChecked === 0) {
          // if current node is indeterminate => parent is also indeterminate
          if (indeterminate) {
            parent.indeterminate = true;
            parent.node.indeterminate = true;
          } else {
            parent.indeterminate = false;
            parent.node.indeterminate = false;
          }
          // parent is not checked
          parent.selected = false;
          parent.node.selected = false;
        } else {   // case all children checked => parent is checked
          if (nbChildrenChecked === parent.children.length) {
            parent.indeterminate = false;
            parent.node.indeterminate = false;
            parent.selected = true;
            parent.node.selected = true;
          } else { // case somme children are checked but not all => parent is indeterminate
            parent.selected = false;
            parent.node.selected = false;
            parent.indeterminate = true;
            parent.node.indeterminate = true;
          }
        }
        // if parent in node parent => update parent
        if (parent.parent) {
          updateParent(parent.indeterminate, parent.parent);
        }

      }
    }());
  }
  ngAfterViewChecked() {
    // if not we have a error => detect change
    var changesNode = this.differ.diff(this.node);
    if (changesNode) {
      changesNode.forEachChangedItem(() =>  this.cdr.detectChanges());
      changesNode.forEachAddedItem(() =>  this.cdr.detectChanges());
      changesNode.forEachRemovedItem(() =>  this.cdr.detectChanges());
    }
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.tree-node-line').style.paddingLeft = 30 * this.depth + "px";
    this.nodeChildren.changes.subscribe(()=> {
      this.nodeChildren.forEach((node) => {
        node.selected = this.selected;
      });
    });
  }


  //callback for click on expand icon
  ExpandClick() {
    if (this.disabled) {
      return;
    }
    this.expanded = !this.expanded;
    if (this.children.length === 0) {
      this.children.push({
        label:'',
        loading: true
      });
    }
    if (this.expanded) {
      this.onExpand.emit(this.node);
    } else if (!this.expanded) {
      this.onCollapse.emit(this.node);
    }
    this.expandedChange.emit(this.expanded);

  }

  onClick() {
    if (this.disabled) {
      return;
    }
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
    this.indeterminate = false;
    this.indeterminateChange.emit(this.indeterminate);
  }
}

treeNodeComponent.parameters = [ElementRef, [new Optional(), new SkipSelf(), new Inject(treeNodeComponent)], KeyValueDiffers, ChangeDetectorRef];
