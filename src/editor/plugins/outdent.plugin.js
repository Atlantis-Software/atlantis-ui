import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class outdent extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-outdent',
        template: `
        <button
          class="btn btn-default icon icon-outdent"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "outdent";
    this.text = "Outdent";
    this.description = "Outdent the line";
    this.active = null;
  }
}
