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
    this.DatepickerRangeHtml = `
    <datepicker-range [(start)]="start1" [(end)]="end1"></datepicker-range>`

    this.DatepickerSimpleHtml = `
    <datepicker [(ngModel)]="start3"></datepicker>`



    this.Display = "Example";

    this.start2 = "2017-05-01";
    this.end2 = "2017-05-22";
    this.start4 = "2017-05-01";
  }
}


DatepickerComponent.parameters = [];
