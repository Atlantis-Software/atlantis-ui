import {Component} from '@angular/core';

export default  class InputgroupComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./inputgroup.html')
      })
    ];
  }
  constructor(){
  }
}


InputgroupComponent.parameters = [];
