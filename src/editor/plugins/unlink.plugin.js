import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class unlink extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-unlink',
        template: `
        <button
          class="btn btn-default icon icon-chain-broken"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "unlink";
    this.icon = "chain-broken";
    this.text = "Unlink";
    this.description = "Remove the anchor tag from a selected anchor link";
    this.active = null;
  }
}
