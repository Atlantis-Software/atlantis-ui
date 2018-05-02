import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class removeFormat extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-removeFormat',
        template: `
        <button
          class="btn btn-default icon icon-trash"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
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
