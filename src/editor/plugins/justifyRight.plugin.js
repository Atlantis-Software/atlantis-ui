import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class justifyRight extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-justify-right',
        template: `
        <button
          class="btn btn-default icon icon-align-right"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "justifyRight";
    this.text = "Justify right";
    this.description = "Justifies the selection or insertion point to the right.";
  }

  execCommand(event) {
    if (this.active) {
      this.cmd = "justifyLeft";
      super.execCommand(event);
      this.cmd = "justifyRight";
    } else {
      super.execCommand(event);
    }
  }
}
