import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class blockquote extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-bold',
        template: `
        <button
          class="btn btn-default icon icon-quote-right"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "formatBlock";
    this.text = "blockquote";
    this.description = "Blockquote";
    this.val = this._val = "blockquote";
  }

  execCommand(event) {
    if (this.active) {
      this.val = "div";
    } else {
      this.val = "blockquote";
    }
    super.execCommand(event);
  }
}
