import { Component } from '@angular/core';

export default class treePlugin {
  static get annotations() {
    return [
      new Component({
        selector: 'tree-plugin',
        template: `
        <span *ngIf="icon" [hidden]="hiden" class="icon" [ngClass]="'icon-' + icon"
          [class.icon-disabled]="disabled"
          (click)="onClick(node)"
          (dragenter)="onDragenter(node)"
          (dragover)="onDragover(node)"
          (dragleave)="onDragleave(node)"
          (drop)="onDrop(node)"
          (dragstart)="onDragstart(node)"
          (dragend)="onDragend(node)"
          (mousedown)="onMousedown(node)"
          (mouseenter)="onMouseenter(node)"
          (mouseleave)="onMouseleave(node)"
          (mousemove)="onMousemove(node)"
          (mouseout)="onMouseout(node)"
          (mouseover)="onMouseover(node)"
          (mouseup)="onMouseup(node)"
          (dblclick)="onDblclick(node)">
        </span>
        <div *ngIf="plugin === 'checkbox'" class="tree-node-checkbox">
          <div class="checkbox">
            <input type="checkbox" [ngModel]="node.selected" (click)="selectedChange()" [attr.disabled]="node.disabled">
            <label>
              &nbsp;
            </label>
          </div>
        </div>
        <span [attr.disabled]="node.disabled"
          *ngIf="plugin === 'sortable' || plugin === 'nestedSortable'"
          class="tree-node-handle" atlui-sortable-handle></span>
        `,
        inputs: ['icon', 'plugin', 'node', 'onInit', 'onChange', 'onDestroy', 'click', 'dragenter', 'dragover', 'dragleave',
          'drop','dragstart', 'dragend', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove',
          'mouseout', 'mouseover', 'mouseup', 'dblclick', 'selectedChange', 'change'],
        outputs: []
      })
    ];
  }
  constructor() {
    this.disabled = this.hiden = false;
  }

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

  ngOnDestroy(){
    if (this.onChange) {
      this.change.unsubscribe();
    }
    if (!this.onDestroy) {
      return;
    }
    this.onDestroy(this.node);
  }

  disable() {
    this.disabled = true;
  }

  activate() {
    this.disabled = false;
  }

  show() {
    this.hiden = false;
  }

  hide() {
    this.hiden = true;
  }

  onClick(node) {
    if (!this.click) {
      return;
    }
    this.click(node);
  }

  onDragenter(node) {
    if (!this.dragenter) {
      return;
    }
    this.dragenter(node);
  }

  onDragover(node) {
    if (!this.dragover) {
      return;
    }
    this.dragover(node);
  }

  onDragleave(node) {
    if (!this.dragleave) {
      return;
    }
    this.dragleave(node);
  }

  onDrop(node) {
    if (!this.drop) {
      return;
    }
    this.drop(node);
  }

  onDragstart(node) {
    if (!this.dragstart) {
      return;
    }
    this.dragstart(node);
  }

  onDragend(node) {
    if (!this.dragend) {
      return;
    }
    this.dragend(node);
  }

  onMousedown(node) {
    if (!this.mousedown) {
      return;
    }
    this.mousedown(node);
  }

  onMouseenter(node) {
    if (!this.mouseenter) {
      return;
    }
    this.mouseenter(node);
  }

  onMouseleave(node) {
    if (!this.mouseleave) {
      return;
    }
    this.mouseleave(node);
  }

  onMousemove(node) {
    if (!this.mousemove) {
      return;
    }
    this.mousemove(node);
  }

  onMouseout(node) {
    if (!this.mouseout) {
      return;
    }
    this.mouseout(node);
  }

  onMouseover(node) {
    if (!this.mouseover) {
      return;
    }
    this.mouseover(node);
  }

  onMouseup(node) {
    if (!this.mouseup) {
      return;
    }
    this.mouseup(node);
  }

  onDblclick(node) {
    if (!this.dblclick) {
      return;
    }
    this.dblclick(node);
  }
}

treePlugin.parameters = [];
