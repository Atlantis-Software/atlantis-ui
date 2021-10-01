import {Component} from '@angular/core';

export default  class DatepickerComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./datepicker.html')
      })
    ];
  }
  constructor(){
    this.valueDatePicker = "2021-02-10T23:00:00.000Z";
    this.start1 = "2021-08-22T22:00:00.000Z";
    this.end1 = "30/08/2021";
  }
}


DatepickerComponent.parameters = [];
