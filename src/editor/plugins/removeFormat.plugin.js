import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class removeFormat extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-removeFormat',
        template: `
        <button
          class="btn btn-default icon-stack"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
            <i class="icon icon-font icon-stack-2x"></i>
            <i class="icon icon-close icon-stack-1x"></i>
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "removeFormat";
    this.text = "Remove format";
    this.description = "Remove the format";
    this.active = null;
  }
}
