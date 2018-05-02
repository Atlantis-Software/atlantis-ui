import { Component } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class format extends pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-format',
        template: `
        <atlui-dropdown [title]="text">
          <atlui-dropdown-option *ngFor="let option of options"
            [innerHTML]="option.display"
            (mousedown)="execCommand($event, option)">
          </atlui-dropdown-option>
        </atlui-dropdown>`
      })
    ];
  }
  constructor() {
    super();
    this.type = "dropdown";
    this.cmd = "formatBlock";
    this.text = "Format";
    this.description = "Change format";
    this.options = [
      {
        value: "p",
        display: "<p>Normal</p>",
        label: "Normal"
      },
      {
        value: "h1",
        display: "<h1>Title 1</h1>",
        label: "Title 1"
      },
      {
        value: "h2",
        display: "<h2>Title 2</h2>",
        label: "Title2"
      },
      {
        value: "h3",
        display: "<h3>Title 3</h3>",
        label: "Title3"
      },
      {
        value: "h4",
        display: "<h4>Title 4</h4>",
        label: "Title4"
      },
      {
        value: "h5",
        display: "<h5>Title 5</h5>",
        label: "Title5"
      },
      {
        value: "h6",
        display: "<h6>Title 6</h6>",
        label: "Title6"
      },
      {
        value: "pre",
        display: "<pre>Preformat</pre>",
        label: "Preformat"
      },
      {
        value: "address",
        display: "<address>Address</address>",
        label: "Address"
      },
      {
        value: "div",
        display: "<div>Div</div>",
        label: "Div"
      }
    ];
    this.text = this.options[0].label;
  }

  execCommand(event, option) {
    this.val = option.value;
    this.text = option.label;
    super.execCommand(event);
  }

  commandState() {
    var value = document.queryCommandValue(this.cmd);
    this.text = "Normal";
    this.options.forEach((option)=> {
      if (option.value == value) {
        this.text = option.label;
      }
    });
  }
}
