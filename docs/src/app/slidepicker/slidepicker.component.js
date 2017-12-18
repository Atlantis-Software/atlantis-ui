import {Component} from '@angular/core';

export default  class SlidepickerComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./slidepicker.html')
      })
    ];
  }
  constructor(){
    this.slidepickerHtml = `
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker-vertical">
      <slidepicker-option value="test1">test1</slidepicker-option>
      <slidepicker-option value="test2">test2</slidepicker-option>
      <slidepicker-option value="test3">test3</slidepicker-option>
      <slidepicker-option value="test4">test4</slidepicker-option>
    </slidepicker>`;
    this.slidepickerOptionNgIf= `
    <slidepicker-option *ngIf="showtest1" value="test1">test1</slidepicker-option>`;
    this.slidepickerSizeHtml = `
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker-vertical slidepicker-sm">
    </slidepicker>
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker-vertical">
    </slidepicker>
    <slidepicker [(ngModel)]="slidepicker2" class="slidepicker-vertical slidepicker-lg">
    </slidepicker>`;
    this.show1 = true;
    this.show2 = true;
    this.show3 = true;
    this.slidepicker2 = "test2";


    this.arrayOneTwoThree = ["un", "deux", "trois"];
    this.one = 1;
    this.objetWithArray  = { fsdfds: 1, array: [1,2,3], texte: "test"};
    this.optionOne = {value: this.one, text: "one"};
    this.booleanFalse = false;
    this.A = "A";

    this.slidepickerValue = `
    <slidepicker class="slidepicker-vertical" [(ngModel)]="slidepicker5">
      <slidepicker-option [value]="A">AAAA</slidepicker-option>
      <slidepicker-option value="B">BBBB</slidepicker-option>
      <slidepicker-option value="C">CCCC</slidepicker-option>
      <slidepicker-option [value]="booleanFalse">boolean test</slidepicker-option>
      <slidepicker-option [value]="one">11111</slidepicker-option>
      <slidepicker-option [value]="arrayOneTwoThree">one, two, three</slidepicker-option>
      <slidepicker-option [value]="objetWithArray">objet javascript</slidepicker-option>
    </slidepicker>`;

    this.options = [
      {
        value: this.A,
        label: "AAAA"
      },
      {
        value: "B",
        label: "BBBB"
      },
      {
        value: "C",
        label: "CCCC"
      },
      {
        value: this.booleanFalse,
        label: "boolean test"
      },
      {
        value: this.one,
        label: "11111"
      },
      {
        value: this.arrayOneTwoThree,
        label: "one, two, three"
      },
      {
        value: this.objetWithArray,
        label: "object javascript"
      }
    ];

    this.slidepickerNgFor = `
    <slidepicker [(ngModel)]="slidepicker4" class="slidepicker-vertical" name="slidepicker4">
      <slidepicker-option *ngFor="let option of options" [value]="option.value">
        {{option.label}}
      </slidepicker-option>
    </slidepicker>`;

    this.slidepickerNgForOptions= `
    this.options = [
      {
        value: this.A,
        label: "AAAA"
      },
      {
        value: "B",
        label: "BBBB"
      },
      {
        value: "C",
        label: "CCCC"
      },
      {
        value: this.booleanFalse,
        label: "boolean test"
      },
      {
        value: this.one,
        label: "11111"
      },
      {
        value: this.arrayOneTwoThree,
        label: "one, two, three"
      },
      {
        value: this.objetWithArray,
        label: "object javascript"
      }
    ]`;
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


SlidepickerComponent.parameters = [];
