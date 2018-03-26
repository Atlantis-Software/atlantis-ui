import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class insertImage extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-image',
        template: `
        <button
          class="btn btn-default icon icon-picture"
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
            <label for="url">Upload file</label>
            <input id="url" type="file" (change)="changeFiles($event.target.files)">
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
    this.cmd = "insertImage";
    this.text = "Insert image";
    this.description = "Insert an image";
    this.active = null;
    this.showModal = false;
    this.val = "";
    this.file = '';
  }

  changeFiles(files) {
    if (files[0]) {
      this.file = files[0];
    }
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
      var reader = new FileReader();
      reader.onloadend = () => {
        this.val = reader.result;
        super.execCommand(event);
      };
      reader.readAsDataURL(this.file);
    }
    this.showModal = false;
  }

  closeWithoutExec() {
    this.showModal = false;
  }
}
