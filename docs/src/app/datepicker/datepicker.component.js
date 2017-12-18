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
    this.DatepickerRangeHtml = `
    <datepicker-range [(start)]="start1" [(end)]="end1" [numberOfMonths]="4"></datepicker-range>`;

    this.DatepickerSimpleHtml = `
    <datepicker [(ngModel)]="valueDatePicker" [numberOfMonths]="5"></datepicker>`;

    this.valueDatePicker = new Date("2004-02-03");
    this.start1 = "2017-05-01";
    this.end1 = "2017-05-22";
  }
}


DatepickerComponent.parameters = [];
