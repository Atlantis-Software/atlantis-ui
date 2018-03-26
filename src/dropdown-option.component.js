import { Component } from '@angular/core';
import dropdownComponent from './dropdown.component.js';

export default class dropdownOptionComponent {
  constructor(dropdownComponent) {
    this.dropdown = dropdownComponent;
  }
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-dropdown-option',
        template: `<ng-content></ng-content>`
      })
    ];
  }

}

dropdownOptionComponent.parameters = [dropdownComponent];
