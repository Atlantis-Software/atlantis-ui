import {Component} from '@angular/core';

export default  class DatepickerComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./datepicker.html')
      })
    ]
  }
  constructor(){
    this.start = "2017-05-01";
    this.end = "2017-05-22";
  }
}


DatepickerComponent.parameters = [];
