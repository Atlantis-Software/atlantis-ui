import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class insertOrderedList extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-insertOrderedList',
        template: `
        <button
          class="btn btn-default icon icon-list-ol"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "insertOrderedList";
    this.text = "Insert ordered list";
    this.description = "Create a numbered ordered list";
  }
}
