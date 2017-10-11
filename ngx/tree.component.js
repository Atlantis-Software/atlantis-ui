import {
  Component,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ChangeDetectorRef
} from '@angular/core';

export default class treeComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'tree',
        template: `
        <div [sortable-container]="notSortable" [sortableData]="nodes" [dropzones]="dropZones">
        <span>{{dropZones}}</span>
          <tree-node *ngFor="let node of nodes; let i = index"
            [expandable]="node.expandable"
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
            [notSortable]="notSortable"
            (expand)="expand.emit($event)"
            (collapse)="collapse.emit($event)"
            (select)="onSelect($event)"
            [sortable]="notSortable"
            [sortableIndex]="i"
            (onDragStartCallback)="onDragCallback(i, true)"
            (onDragEndCallback)="onDragCallback(i, false)"
            [nested]="nestedSortable">
          </tree-node>
        <ng-content *ngIf="!nodes"></ng-content>
        </div>`,
        inputs: ['nodes', 'template', 'depth', 'nestedSortable', 'notSortable'],
        outputs: ['expand', 'collapse', 'select', 'nodesChanges'],
        queries: {
          template: new ContentChild(TemplateRef),
        }
      })
    ];
  }
  constructor(changeDetectorRef) {
    this.expand = new EventEmitter();
    this.collapse = new EventEmitter();
    this.select = new EventEmitter();
    this.nodesChanges = new EventEmitter();
    this.depth = 1;
    this.cdr = changeDetectorRef;
    this.dropZones = "zone"+Math.floor(Math.random()*100000) +1;
  }

  onDragCallback(node, value){
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
  }

  ngAfterViewInit() {
    if (this.nestedSortable) {
      this.dropZonesNested = this.dropZones;
    } else {
      this.dropZonesNested = undefined;
    }
    var recursiveSetId = function(node, dropZones) {
      if (dropZones !== undefined) {
        node.dropZones = dropZones;
      }
      node.selected = node.selected || false;
      if (node.children) {
        node.children.forEach(function(child) {
          recursiveSetId(child);
        });
      }
    };
    this.nodes.forEach(function(node) {
      recursiveSetId(node);
    });
    this.cdr.detectChanges();
  }

  onSelect() {
    this.nodesChanges.emit(this.nodes);
  }

}

treeComponent.parameters = [ChangeDetectorRef];
