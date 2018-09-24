import {
  Component,
  EventEmitter,
  ElementRef,
  Optional,
  SkipSelf,
  Inject,
  ViewChildren,
  KeyValueDiffers
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

export default class treeNodeComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-tree-node',
        template: require('./tree-node.html'),
        inputs: ['node', 'label', 'model', 'children', 'expanded', 'selectable', 'disabled',
          'template', 'depth', 'selected', 'sortableZones', 'nestedSortable', 'isSortable', 'loading',
          'nodeSelected', 'plugins'
        ],
        outputs: ['onExpand', 'onCollapse', 'check', 'selectedChange', 'expandedChange', 'onClickNode'],
        host: {
          '[class.selectable]': 'selectable'
        },
        queries: {
          nodeChildren: new ViewChildren(treeNodeComponent),
        }
      })
    ];
  }
  constructor(ElementRef, treeNodeComponent, differs) {
    this.elementRef = ElementRef;
    this.onExpand = new EventEmitter();
    this.onCollapse = new EventEmitter();
    this.check = new EventEmitter();
    this.selectedChange = new EventEmitter();
    this.expandedChange = new EventEmitter();
    this.onClickNode = new EventEmitter();
    this.indeterminate = false;
    this.parent = treeNodeComponent;
    this.expanded = false;
    this.selected = false;
    this.differ = differs.find({}).create(null);
    this.change = new Subject();
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

  // verify if a changment occurs on a node and send to plugins the change
  ngDoCheck() {
    var changes = this.differ.diff(this.node);
    if (changes) {
      this.change.next();
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
    this.nodeChildren.changes.subscribe(()=> {
      this.nodeChildren.forEach((node) => {
        node.selected = this.selected;
      });
      this.onCheck(this.node);
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

  //Callback for click on checkbox
  onClick() {
    var self = this;
    if (this.disabled) {
      return;
    }
    this.selected = !this.selected;
    this.indeterminate = false;

    var recursiveSetDropZones = function(node) {
      node.selected = self.selected || false;
      if (node.children) {
        node.children.forEach(function(child) {
          recursiveSetDropZones(child);
        });
      }
    };
    if (this.children) {
      this.children.forEach((child) => {
        if (!child.disabled && !child.selectable) {
          recursiveSetDropZones(child);
        }
      });
    }
    this.selectedChange.emit(this.selected);
    this.check.emit(this.node);
  }

  //function call when a children selected value has changed
  onCheck(node) {
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
    this.check.emit(node);
  }
}

treeNodeComponent.parameters = [ElementRef, [new Optional(), new SkipSelf(), new Inject(treeNodeComponent)], KeyValueDiffers];
