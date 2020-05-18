import { Component } from '@angular/core';

export default class treePlugin {
  static get annotations() {
    return [
      new Component({
        selector: 'tree-plugin',
        template: `
        <span *ngIf="icon" [title]="description" [hidden]="hidden" class="icon" [ngClass]="'icon-' + icon"
          [class.icon-disabled]="disabled"
          (click)="click(node)"
          (dragenter)="dragenter(node)"
          (dragover)="dragover(node)"
          (dragleave)="dragleave(node)"
          (drop)="drop(node)"
          (dragstart)="dragstart(node)"
          (dragend)="dragend(node)"
          (mousedown)="mousedown(node)"
          (mouseenter)="mouseenter(node)"
          (mouseleave)="mouseleave(node)"
          (mousemove)="mousemove(node)"
          (mouseout)="mouseout(node)"
          (mouseover)="mouseover(node)"
          (mouseup)="mouseup(node)"
          (dblclick)="dblclick(node)">
        </span>
        <ng-container *ngIf="node.selectable !== false">
          <div *ngIf="plugin === 'checkbox'" class="tree-node-checkbox">
            <div class="checkbox">
              <input type="checkbox" [checked]="node.selected"  [indeterminate]="node.indeterminated" (click)="selectedChange()" [attr.disabled]="node.disabled">
              <label>
                &nbsp;
              </label>
            </div>
          </div>
        </ng-container>
        <span [attr.disabled]="node.disabled"
          *ngIf="plugin === 'sortable' || plugin === 'nestedSortable'"
          class="tree-node-handle" atlui-sortable-handle></span>
        `,
        inputs: ['icon', 'description', 'plugin', 'node', 'onInit', 'onChange', 'onDestroy', 'onClick', 'onDragenter', 'onDragover', 'onDragleave',
          'onDrop','onDragstart', 'onDragend', 'onMousedown', 'onMouseenter', 'onMouseleave', 'onMousemove',
          'onMouseout', 'onMouseover', 'onMouseup', 'onDblclick', 'selectedChange', 'change'],
        outputs: []
      })
    ];
  }
  constructor() {
    this.disabled = this.hidden = false;
  }
  // function we can send in plugins on initialisation
  ngOnInit(){
    if (this.onChange) {
      var self = this;
      this.change.subscribe({
        next() {
          self.onChange(self.node);
        }
      });
    }
    if (!this.onInit) {
      return;
    }
    this.onInit(this.node);
  }

  // function we can send in plugins on destroy
  ngOnDestroy(){
    if (this.disabled) {
      return;
    }
    if (this.onChange) {
      this.change.unsubscribe();
    }
    if (!this.onDestroy) {
      return;
    }
    this.onDestroy(this.node);
  }
  // methods we can use in plugins for disable/activate/show and hide plugins
  disable() {
    this.disabled = true;
  }

  activate() {
    this.disabled = false;
  }

  show() {
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

  // All function we can use in our plugins
  click(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onClick) {
      return;
    }
    this.onClick(node);
  }

  dragenter(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onDragenter) {
      return;
    }
    this.onDragenter(node);
  }

  dragover(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onDragover) {
      return;
    }
    this.onDragover(node);
  }

  dragleave(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onDragleave) {
      return;
    }
    this.onDragleave(node);
  }

  drop(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onDrop) {
      return;
    }
    this.onDrop(node);
  }

  dragstart(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onDragstart) {
      return;
    }
    this.onDragstart(node);
  }

  dragend(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onDragend) {
      return;
    }
    this.onDragend(node);
  }

  mousedown(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onMousedown) {
      return;
    }
    this.onMousedown(node);
  }

  mouseenter(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onMouseenter) {
      return;
    }
    this.onMouseenter(node);
  }

  mouseleave(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onMouseleave) {
      return;
    }
    this.onMouseleave(node);
  }

  mousemove(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onMousemove) {
      return;
    }
    this.onMousemove(node);
  }

  mouseout(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onMouseout) {
      return;
    }
    this.onMouseout(node);
  }

  mouseover(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onMouseover) {
      return;
    }
    this.onMouseover(node);
  }

  mouseup(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onMouseup) {
      return;
    }
    this.onMouseup(node);
  }

  dblclick(node) {
    if (this.disabled) {
      return;
    }
    if (!this.onDblclick) {
      return;
    }
    this.onDblclick(node);
  }
}

treePlugin.parameters = [];
