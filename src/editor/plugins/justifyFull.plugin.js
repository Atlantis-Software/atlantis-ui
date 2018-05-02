import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class justifyFull extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-justify-full',
        template: `
        <button
          class="btn btn-default icon icon-align-justify"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "justifyFull";
    this.text = "Justify full";
    this.description = "Justifies the selection or insertion point.";
  }
}
