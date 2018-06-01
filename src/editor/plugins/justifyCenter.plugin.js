import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class justifyCenter extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-justify-center',
        template: `
        <button
          class="btn btn-default icon icon-align-center"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "justifyCenter";
    this.text = "Justify center";
    this.description = "Centers the selection";
  }

  execCommand(event) {
    if (this.active) {
      this.cmd = "justifyLeft";
      super.execCommand(event);
      this.cmd = "justifyCenter";
    } else {
      super.execCommand(event);
    }
  }
}
