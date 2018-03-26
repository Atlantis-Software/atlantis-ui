import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class undo extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-undo',
        template: `
        <button
          class="btn btn-default icon icon-undo"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "undo";
    this.text = "Undo";
    this.description = "Undoes the last executed command";
    this.active = null;
  }
}
