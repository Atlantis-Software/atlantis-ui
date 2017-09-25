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
        <div sortable-container [sortableData]="nodes" [dropzones]="dropZones">
        <span>{{dropZones}}</span>
          <tree-node *ngFor="let node of nodes; let i = index"
            [expandable]="node.expandable"
            [(expanded)]="node.expanded"
            [label]="node.label"
            [model]="node.model"
            [id]="node.id"
            [children]="node.children"
            [selectable]="node.selectable"
            [template]="template"
            [depth]="depth"
            [disabled]="node.disabled"
            [(selected)]="node.selected"
            [sortableZones]="dropZonesNested"
            [nestedSortable]='nestedSortable'
            (expand)="expand.emit($event)"
            (collapse)="collapse.emit($event)"
            (select)="onSelect($event)"
            sortable
            [sortableIndex]="i"
            (onDragStartCallback)="onDragCallback(i, true)"
            (onDragEndCallback)="onDragCallback(i, false)">
          </tree-node>
        <ng-content *ngIf="!nodes"></ng-content>
        </div>`,
        inputs: ['nodes', 'template', 'depth', 'nestedSortable'],
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
      return;
    }
    this.nodes.forEach((child)=> {
      if (value) {
        child.oldExpanded = child.expanded;
        child.expanded = false;
      } else {
        child.expanded = child.oldExpanded;
      }
    });
  }

  ngAfterViewInit() {
    if (this.nestedSortable) {
      this.dropZonesNested = this.dropZones;
    } else {
      this.dropZonesNested = undefined;
    }
    var recursiveSetId = function(node, index, dropZones) {
      node.id = index+1;
      if (dropZones !== undefined) {
        node.dropZones = dropZones;
      }
      node.selected = node.selected || false;
      if (node.children) {
        node.children.forEach(function(child, index) {
          recursiveSetId(child, index);
        });
      }
    };
    this.nodes.forEach((node, index) => {
      recursiveSetId(node, index, this.dropZonesNested);
    });
    this.cdr.detectChanges();
  }

  onSelect() {
    this.nodesChanges.emit(this.nodes);
  }

}

treeComponent.parameters = [ChangeDetectorRef];
