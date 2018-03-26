import { Component, ElementRef } from '@angular/core';

export default class dropdownHeaderComponent {
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-dropdown-header',
        template: `<ng-content></ng-content>`,
        host: {
          "class": "dropdown-header"
        }
      })
    ];
  }

  ngAfterViewInit() {}
}

dropdownHeaderComponent.parameters = [ElementRef];
