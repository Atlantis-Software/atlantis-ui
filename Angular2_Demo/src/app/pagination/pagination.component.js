import {Component} from '@angular/core';

export default  class PaginationComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./pagination.html')
      })
    ]
  }
  constructor(){

  }
}


PaginationComponent.parameters = [];
