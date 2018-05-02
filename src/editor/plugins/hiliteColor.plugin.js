import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class hiliteColor extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-hiliteColor',
        template: `
        <div
          class="btn btn-default icon icon-font"
          [attr.title]="description">
            <div class="color-palette">
              <div class="color" *ngFor="let color of colors" [ngStyle]="{'background-color': color.value}" (mousedown)="execCommand($event, color)">
              </div>
            </div>
        </div>`
      })
    ];
  }
  constructor() {
    super();
    this.cmd = "hiliteColor";
    this.text = "hiliteColor";
    this.description = "Change the background color's selection";
    this.val = "hiliteColor";
    this.active = null;
    this.colors = [
      {
        value: "#FFFFFF"
      },
      {
        value: "#FF9966"
      },
      {
        value: "#6699FF"
      },
      {
        value: "#99FF66"
      },
      {
        value: "#CC0000"
      },
      {
        value: "#00CC00"
      },
      {
        value: "#0000CC"
      },
      {
        value: "#333333"
      },
      {
        value: "#0066FF"
      },
      {
        value: "#000000"
      }
    ];
  }

  execCommand($event, color) {
    this.val = color.value;
    super.execCommand($event);
  }
}
