import {Component} from '@angular/core';

export default  class GridComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./grid.html')
      })
    ];
  }
  constructor(){
  }
}


GridComponent.parameters = [];
