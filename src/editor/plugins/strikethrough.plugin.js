import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class strikethrough extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-strikethrough',
        template: `
        <button
          class="btn btn-default icon icon-strikethrough"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "strikeThrough";
    this.text = "Strikethrough";
    this.description = "Strikethrough";
  }
}
