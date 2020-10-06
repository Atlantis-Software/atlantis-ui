import {Component} from '@angular/core';

export default  class DatepickerComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./timepicker.html')
      })
    ];
  }
  constructor(){
    this.valueTimePicker = "13:20";
  }
}


DatepickerComponent.parameters = [];
