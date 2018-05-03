import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class fontName extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-fontName',
        template: `
        <atlui-dropdown [title]="text">
          <atlui-dropdown-option *ngFor="let font of fonts"
            (mousedown)="execCommand($event, font)">
            <font [attr.face]="font">{{font}}</font>
          </atlui-dropdown-option>
        </atlui-dropdown>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "fontName";
    this.text = "Font name";
    this.description = "Change font size";
    this.fonts = [ 'Arial', 'Comic sans ms', 'Courier new', 'Georgia', 'Tahoma'];
  }

  execCommand(event, font) {
    this.text = font;
    this.val = font;
    super.execCommand(event);
  }

  commandState() {
    var value = document.queryCommandValue(this.cmd);
    if (this.fonts.indexOf(value) != -1) {
      this.text = value;
    } else {
      this.text = "Font Name";
    }
  }
}
