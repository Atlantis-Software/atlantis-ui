import { Component} from '@angular/core';

export default class treePlugin {
  static get annotations() {
    return [
      new Component({
        selector: 'tree-plugin',
        template: `
        <span *ngIf="icon" [hidden]="!isDisplay(node)" [ngStyle]="{'visibility': isHidden(node)}" class="icon" [ngClass]="'icon-' + icon"
          [class.disabled]="isDisabled(node)"
          (click)="onClick(node)"
          (dragenter)="onDragenter(node)"
          (dragover)="onDragover(node)"
          (dragleave)="onDragleave(node)"
          (dragdrop)="onDragdrop(node)"
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
        <div [hidden]="isHidden(node)" *ngIf="plugin === 'checkbox'" class="tree-node-checkbox">
          <div class="checkbox">
            <input type="checkbox" [ngModel]="node.selected" (click)="selectedChange()" [attr.disabled]="node.disabled">
            <label>
              &nbsp;
            </label>
          </div>
        </div>
        <span [hidden]="isHidden(node)" [attr.disabled]="node.disabled"
          *ngIf="plugin === 'sortable'"
          class="tree-node-handle" atlui-sortable-handle></span>
        `,
        inputs: ['icon', 'plugin', 'node', 'disabled', 'display', 'hidden', 'click', 'dragenter', 'dragover', 'dragleave',
          'dragdrop','dragstart', 'dragend', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove',
          'mouseout', 'mouseover', 'mouseup', 'dblclick', 'selectedChange'],
        outputs: []
      })
    ];
  }
  constructor() {
  }

  isDisabled(node) {
    if (!this.disabled) {
      return false;
    }
    return this.disabled(node);
  }

  isDisplay(node) {
    if (!this.display) {
      return true;
    }
    return this.display(node);
  }

  isHidden(node) {
    if (!this.hidden) {
      return "visible";
    }
    return this.hidden(node);
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

  onDragdrop(node) {
    if (!this.dragdrop) {
      return;
    }
    this.dragdrop(node);
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
