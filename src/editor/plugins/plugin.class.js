import { Component } from '@angular/core';

export default class pluginClass {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin',
        template: ''
      })
    ];
  }
  constructor() {
    this.type = "button";
    this.cmd = "";
    this.icon = "";
    this.text = "";
    this.description = "description";
    this.val = null;
    this.active = false;
  }

  execCommand(event) {
    if (this.test) {
      this.test();
    }
    event.preventDefault();
    if (typeof this.active === "boolean") {
      this.active = !this.active;
    }
    document.execCommand(this.cmd, false, this.val);
  }

  commandState() {
    if (typeof this.active !== "boolean") {
      return;
    }
    var state = document.queryCommandState(this.cmd);
    var value = document.queryCommandValue(this.cmd);
    if (state || value === this._val) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
}
