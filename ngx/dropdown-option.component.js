import { Component } from '@angular/core';
import dropdownComponent from './dropdown.component.js';

export default class dropdownOptionComponent {
  constructor(dropdownComponent) {
    this.dropdown = dropdownComponent;
  }
  static get annotations() {
    return [
      new Component({
        selector: 'dropdown-option',
        template: `<ng-content></ng-content>`,
        host: {
          "(click)": "close()"
        }
      })
    ];
  }

  ngAfterViewInit() {}

  close() {
    this.dropdown.closeDropdown();
  }
}

dropdownOptionComponent.parameters = [dropdownComponent];
