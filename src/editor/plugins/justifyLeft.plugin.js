import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class justifyLeft extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-justify-left',
        template: `
        <button
          class="btn btn-default icon icon-align-left"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "justifyLeft";
    this.text = "Justify left";
    this.description = "Justifies the selection or insertion point to the left.";
    this.active = true;
  }
}
