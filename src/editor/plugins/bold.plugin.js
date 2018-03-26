import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class bold extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-bold',
        template: `
        <button
          class="btn btn-default icon icon-bold"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "bold";
    this.text = "Bold";
    this.description = "Bold";
  }
}
