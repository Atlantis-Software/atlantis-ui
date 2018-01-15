import { Component, ElementRef } from '@angular/core';

export default class dropdownDividerComponent {
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-dropdown-divider',
        template: "",
        host: {
          "class": "divider"
        }
      })
    ];
  }

  ngAfterViewInit() {}
}

dropdownDividerComponent.parameters = [ElementRef];
