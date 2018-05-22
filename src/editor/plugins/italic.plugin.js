import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class italic extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-italic',
        template: `
        <button
          class="btn btn-default icon icon-italic"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "italic";
    this.text = "Italic";
    this.description = "Italic";
  }
}
