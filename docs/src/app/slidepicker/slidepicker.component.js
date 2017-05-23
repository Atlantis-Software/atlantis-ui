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
    this.slidepickerHtml = `
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker slidepicker-vertical">
      <slidepicker-option value="test1">test1</slidepicker-option>
      <slidepicker-option value="test2">test2</slidepicker-option>
      <slidepicker-option value="test3">test3</slidepicker-option>
      <slidepicker-option value="test4">test4</slidepicker-option>
    </slidepicker>`

    this.Display = "Example"
    this.slidepicker2 = "test2"
  }
}


SlidepickerComponent.parameters = [];
