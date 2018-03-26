import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class redo extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-redo',
        template: `
        <button
          class="btn btn-default icon icon-repeat"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "redo";
    this.text = "Redo";
    this.description = "Redoes the previous undo command.";
    this.active = null;
  }
}
