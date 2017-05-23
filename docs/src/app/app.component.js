import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

export default class AppComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'my-app',
        template: require('./app.html'),
        directives: [ROUTER_DIRECTIVES]
      })
    ];
  }
  constructor() {
  }

}

AppComponent.parameters = [];
