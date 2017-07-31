import {Component} from '@angular/core';

export default  class SlidepickerAngularComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./slidepicker.html')
      })
    ]
  }
  constructor(){
    this.slidepickerHtml = `
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker-vertical">
      <slidepicker-option value="test1">test1</slidepicker-option>
      <slidepicker-option value="test2">test2</slidepicker-option>
      <slidepicker-option value="test3">test3</slidepicker-option>
      <slidepicker-option value="test4">test4</slidepicker-option>
    </slidepicker>`
    this.slidepickerOptionNgIf= `
    <slidepicker-option *ngIf="showtest1" value="test1">test1</slidepicker-option>`
    this.slidepickerSizeHtml = `
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker-vertical slidepicker-sm">
    </slidepicker>
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker-vertical">
    </slidepicker>
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker-vertical slidepicker-lg">
    </slidepicker>`
    this.show1 = true;
    this.show2 = true;
    this.show3 = true;
    this.slidepicker2 = "test2"
  }

  changeBinding(binding, value){
    this[binding] = value;
  }

  toggle2() {
    this.show2 = !this.show2;
  }

  toggle3() {
    this.show3 = !this.show3;
  }

  toggle1() {
    this.show1 = !this.show1;
  }

  toggleAll() {
    this.show1 = !this.show1;
    this.show2 = !this.show2;
    this.show3 = !this.show3;
  }

}


SlidepickerAngularComponent.parameters = [];
