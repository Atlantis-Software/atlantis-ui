import {Component} from '@angular/core';

export default  class navbarComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./navbar.html')
      })
    ];
  }
  constructor(){
  }
}
