import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class createLink extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-createLink',
        template: `
        <button
          class="btn btn-default icon icon-link"
          (mousedown)="openModal($event)"
          [attr.title]="description">
        </button>
        <atlui-modal [(show)]="showModal">
          <atlui-modal-header>
            <h3 class="modal-title">
              {{text}}
            </h3>
          </atlui-modal-header>
          <atlui-modal-body>
            <label for="url">Url</label>
            <input id="url" type="text" [(ngModel)]="val">
          </atlui-modal-body>
          <atlui-modal-footer>
            <button type="button" class="btn btn-default" (click)="closeAndExec($event)">Validate</button>
            <button type="button" class="btn btn-default" (click)="closeWithoutExec()">Cancel</button>
          </atlui-modal-footer>
        </atlui-modal>`
      })
    ];
  }
  constructor() {
    super();
    this.type = "modal";
    this.cmd = "createLink";
    this.text = "Create link";
    this.description = "Create link on selection";
    this.active = null;
    this.showModal = false;
    this.val = "";
  }

  openModal(event) {
    event.preventDefault();
    this.showModal = true;
    this.selection = window.getSelection();
    if (this.selection.rangeCount > 0) {
      this.range = this.selection.getRangeAt(0);
    }
  }

  closeAndExec(event) {
    if (this.range) {
      this.selection.removeAllRanges();
      this.selection.addRange(this.range);
      super.execCommand(event);
      this.showModal = false;
    }
  }

  closeWithoutExec() {
    this.showModal = false;
  }
}
