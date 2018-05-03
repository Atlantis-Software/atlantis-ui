import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class indent extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-indent',
        template: `
        <button
          class="btn btn-default icon icon-indent"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "indent";
    this.text = "Indent";
    this.description = "Indent the line";
    this.active = null;
  }
}
