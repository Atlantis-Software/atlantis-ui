import { Component } from '@angular/core';

export default class backdropComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-backdrop',
        template: '',
        host: {
          "class": "modal-backdrop fade in",
        }
      })
    ];
  }
}
