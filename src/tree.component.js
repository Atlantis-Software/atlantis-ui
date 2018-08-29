import { Component, EventEmitter, ContentChild, TemplateRef, ChangeDetectorRef, ElementRef } from '@angular/core';

export default class treeComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-tree',
        template: require('./tree.html'),
        inputs: ['nodes', 'nodeSelected: selection', 'plugins'],
        outputs: ['onExpand', 'onCollapse', 'nodesChanges', 'onClick', 'onChecked', 'onUnchecked'],
        queries: {
          template: new ContentChild(TemplateRef),
        }
      })
    ];
  }
  constructor(changeDetectorRef, ElementRef) {
    this.onExpand = new EventEmitter();
    this.onCollapse = new EventEmitter();
    this.nodesChanges = new EventEmitter();
    this.onClick = new EventEmitter();
    this.onChecked = new EventEmitter();
    this.onUnchecked = new EventEmitter();
    this.depth = 1;
    this.cdr = changeDetectorRef;
    this.dropZones = "zone" + Math.floor(Math.random() * 100000) + 1;
    this.isSortable = false;
    this.elementRef = ElementRef;
    this.plugins = [];
  }

  // emit the node where we click
  onClickNode($event) {
    this.onClick.emit($event);
  }

  onDragCallback(element, node, value) {
    if (!this.nodes) {
      return;
    }
    // Close the node expanded if it's open
    if (this.nestedSortable) {
      if (value && this.nodes[node].expanded) {
        this.nodes[node].oldExpanded = this.nodes[node].expanded;
        this.nodes[node].expanded = false;
      } else if (!value) {
        if (this.nodes[node].oldExpanded) {
          this.nodes[node].expanded = this.nodes[node].oldExpanded;
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

  // add or remove class on drag over
  onDragOver(element, over) {
    if (over) {
      element.classList.add("tree-node-sorted");
    } else {
      element.classList.remove("tree-node-sorted");
    }
  }

  // Init the drop zones and the sortable plugins
  ngAfterViewChecked() {
    if (!this.nodes) {
      return;
    }
    if (this.plugins.indexOf('sortable') != -1) {
      this.isSortable = true;
    }
    if (this.plugins.indexOf('nestedSortable') != -1) {
      this.isSortable = this.nestedSortable = true;
    }
    if (this.nestedSortable) {
      this.dropZonesNested = this.dropZones;
    } else {
      this.dropZonesNested = undefined;
    }
    var recursiveSetDropZones = function(node, parentSelection) {
      if (parentSelection) {
        node.selected = parentSelection;
      } else {
        node.selected = node.selected || false;
      }
      if (node.children) {
        node.children.forEach(function(child) {
          recursiveSetDropZones(child, node.selected);
        });
      }
    };
    this.nodes.forEach(function(node) {
      recursiveSetDropZones(node, false);
    });
    this.cdr.detectChanges();
  }

  // Emit the checked or unchecked node
  onCheck(node) {
    this.nodesChanges.emit(this.nodes);
    if (!node) {
      return;
    }
    if (node.selected) {
      this.onChecked.emit(node);
    } else {
      this.onUnchecked.emit(node);
    }
  }

  // update the tree when we sort the node
  updateTree() {
    var treeNodeSorted = this.elementRef.nativeElement.querySelectorAll(".tree-node-sorted");
    if (treeNodeSorted.length > 0) {
      treeNodeSorted.forEach((element) => {
        element.classList.remove("tree-node-sorted");
      });
    }
    this.onCheck();
  }

  // Verify if we change the type of sortable plugins
  ngOnChanges() {
    if (this.nestedSortable) {
      this.dropZonesNested = this.dropZones;
    } else {
      this.dropZonesNested = undefined;
    }
  }

}

treeComponent.parameters = [ChangeDetectorRef, ElementRef];
