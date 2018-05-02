import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class foreColor extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-foreColor',
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
    this.cmd = "foreColor";
    this.text = "foreColor";
    this.description = "Change the color's selection";
    this.val = "foreColor";
    this.active = null;
    this.colors = [
      {
        value: "#000000"
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
        value: "#FFFFFF"
      }
    ];
  }

  execCommand($event, color) {
    this.val = color.value;
    super.execCommand($event);
  }
}
