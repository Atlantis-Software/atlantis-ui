import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class underline extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-underline',
        template: `
        <button
          class="btn btn-default icon icon-underline"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "underline";
    this.text = "Underline";
    this.description = "Underline";
  }
}
