import {Component} from '@angular/core';

export default  class ButtonComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./button.html')
      })
    ];
  }
  constructor(){
  }
}


ButtonComponent.parameters = [];
