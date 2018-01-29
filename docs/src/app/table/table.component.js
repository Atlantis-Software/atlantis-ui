import {Component} from '@angular/core';

export default  class TableComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./table.html')
      })
    ];
  }
  constructor(){
  }
}


TableComponent.parameters = [];
