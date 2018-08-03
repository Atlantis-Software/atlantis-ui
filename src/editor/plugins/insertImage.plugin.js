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
        <atlui-modal class="insert-image" [(show)]="showModal">
          <atlui-modal-header>
            <h3 class="modal-title">
              {{text}}
            </h3>
          </atlui-modal-header>
          <atlui-modal-body>
            <label for="url">Choose image</label>
            <input class="form-control" id="url" type="file" (change)="changeFiles($event.target.files)">
          </atlui-modal-body>
          <atlui-modal-footer>
            <button type="button" class="btn btn-default" (click)="closeAndExec($event)">Ok</button>
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
    this.reader = new FileReader();

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
    if (!this.file) {
      this.showModal = false;
      return;
    }
    if (this.range) {
      this.selection.removeAllRanges();
      this.selection.addRange(this.range);
      this.reader.onload = () => {
        this.val = this.reader.result;
        super.execCommand(event);
      };
      this.reader.readAsDataURL(this.file);
    }
    this.showModal = false;
  }

  closeWithoutExec() {
    this.showModal = false;
  }
}
