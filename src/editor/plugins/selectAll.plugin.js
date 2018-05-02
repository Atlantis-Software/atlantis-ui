import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class selectAll extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-selectAll',
        template: `
        <button
          class="btn btn-default icon icon-file-text"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "selectAll";
    this.text = "Select all";
    this.description = "Select all";
    this.active = null;
  }
}
