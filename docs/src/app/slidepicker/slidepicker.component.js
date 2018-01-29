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
