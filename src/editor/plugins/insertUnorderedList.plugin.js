import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class insertUnorderedList extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-insertUnorderedList',
        template: `
        <button
          class="btn btn-default icon icon-list-ul"
          [ngClass]="{'active': active}"
          (mousedown)="execCommand($event)"
          [attr.title]="description">
        </button>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "insertUnorderedList";
    this.text = "Insert unordered list";
    this.description = "Create a bulleted unordered list";
  }
}
