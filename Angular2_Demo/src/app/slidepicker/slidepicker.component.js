import {Component} from '@angular/core';

export default  class SlidepickerComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./slidepicker.html')
      })
    ]
  }
  constructor(){

  }
}


SlidepickerComponent.parameters = [];
