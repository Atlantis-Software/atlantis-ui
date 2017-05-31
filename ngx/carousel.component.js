import { Component } from '@angular/core';

export default class carouselComponent {
  constructor () {
  }

  static get annotations() {
    return [
      new Component({
        selector: 'carousel',
        template: `
        `,
      })
    ];
  }

}

carouselComponent.parameters = [];
