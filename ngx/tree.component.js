import { Component, EventEmitter, ContentChild, TemplateRef, ChangeDetectorRef, ElementRef} from '@angular/core';

export default class treeComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'tree',
        template: `
        <div [sortable-container]="nodes" [dropzones]="[dropZones]" [draggable]="isSortable">
          <tree-node *ngFor="let node of nodes; let i = index"
            [(expanded)]="node.expanded"
            [(selected)]="node.selected"
            [label]="node.label"
            [model]="node.model"
            [id]="node.id"
            [children]="node.children"
            [selectable]="node.selectable"
            [template]="template"
            [depth]="depth"
            [disabled]="node.disabled"
            [sortableZones]="dropZonesNested"
            [nestedSortable]='nestedSortable'
            [isSortable]="isSortable"
            (expand)="expand.emit($event)"
            (collapse)="collapse.emit($event)"
            (select)="onSelect($event)"
            [sortable]="isSortable"
            [sortableIndex]="i"
            (onDragStartCallback)="onDragCallback($event, i, true)"
            (onDragEndCallback)="onDragCallback($event, i, false)"
            (onDragEnterCallback)="onDragOver($event, true)"
            (onDragLeaveCallback)="onDragOver($event, false)"
            [nested]="nestedSortable">
          </tree-node>
        <ng-content *ngIf="!nodes"></ng-content>
        </div>`,
        inputs: ['nodes', 'template', 'depth', 'nestedSortable', 'isSortable'],
        outputs: ['expand', 'collapse', 'nodesChanges'],
        queries: {
          template: new ContentChild(TemplateRef),
        }
      })
    ];
  }
  constructor(changeDetectorRef, ElementRef) {
    this.expand = new EventEmitter();
    this.collapse = new EventEmitter();
    this.nodesChanges = new EventEmitter();
    this.depth = 1;
    this.cdr = changeDetectorRef;
    this.dropZones = "zone"+Math.floor(Math.random()*100000) +1;
    this.isSortable = false;
    this.ElementRef = ElementRef;
  }

  onDragCallback(element, node, value){
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
      var treeNodeSorted = document.querySelectorAll(".tree-node-sorted");
      if (treeNodeSorted.length > 0) {
        treeNodeSorted.forEach((element)=> {
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

  ngAfterViewInit() {
    if (!this.nodes) {
      return;
    }
    if (this.nestedSortable) {
      this.dropZonesNested = this.dropZones;
    } else {
      this.dropZonesNested = undefined;
    }
    var recursiveSetDropZones = function(node) {
      node.selected = node.selected || false;
      if (node.children) {
        node.children.forEach(function(child) {
          recursiveSetDropZones(child);
        });
      }
    };
    this.nodes.forEach(function(node) {
      recursiveSetDropZones(node);
    });
    this.cdr.detectChanges();
  }

  onSelect() {
    this.nodesChanges.emit(this.nodes);
  }

}

treeComponent.parameters = [ChangeDetectorRef, ElementRef];
