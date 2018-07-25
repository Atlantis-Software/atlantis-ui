import { Component, EventEmitter, ContentChild, TemplateRef, ChangeDetectorRef, ElementRef } from '@angular/core';

export default class treeComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-tree',
        template: require('./tree.html'),
        inputs: ['nodes', 'template', 'nestedSortable', 'nodeSelected: selection', 'plugins'],
        outputs: ['onExpand', 'onCollapse', 'nodesChanges', 'onClick'],
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
    this.depth = 1;
    this.cdr = changeDetectorRef;
    this.dropZones = "zone" + Math.floor(Math.random() * 100000) + 1;
    this.isSortable = false;
    this.elementRef = ElementRef;
    this.plugins = [];
  }

  onClickNode($event) {
    this.onClick.emit($event);
  }

  onDragCallback(element, node, value) {
    if (!this.nodes) {
      return;
    }
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

  onDragOver(element, over) {
    // console.log(node);
    if (over) {
      element.classList.add("tree-node-sorted");
    } else {
      element.classList.remove("tree-node-sorted");
    }
  }

  ngAfterViewChecked() {
    if (!this.nodes) {
      return;
    }
    if (this.nestedSortable) {
      this.dropZonesNested = this.dropZones;
    } else {
      this.dropZonesNested = undefined;
    }
    if (this.plugins.indexOf('sortable') != -1) {
      this.isSortable = true;
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

  onSelect() {
    this.nodesChanges.emit(this.nodes);
  }

  updateTree() {
    var treeNodeSorted = this.elementRef.nativeElement.querySelectorAll(".tree-node-sorted");
    if (treeNodeSorted.length > 0) {
      treeNodeSorted.forEach((element) => {
        element.classList.remove("tree-node-sorted");
      });
    }
    this.onSelect();
  }

  ngOnChanges() {
    if (this.nestedSortable) {
      this.dropZonesNested = this.dropZones;
    } else {
      this.dropZonesNested = undefined;
    }
  }

}

treeComponent.parameters = [ChangeDetectorRef, ElementRef];
