import {Component} from '@angular/core';

export default  class SelectpickerComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./selectpicker.html')
      })
    ];
  }
  constructor(){
    this.arrayOneTwoThree = ["one", "two", "three"];
    this.one = 1;
    this.objetWithArray  = { fsdfds: 1, array: [1,2,3], texte: "test"};
    this.optionArrayOneTwoThree = {value: this.arrayOneTwoThree, text: "arrayOneTwoThree"};
    this.optionOne = {value: this.one, text: "one"};
    this.optionObjetWithArray = {value: this.objetWithArray, text: "objetWithArray"};
    this.optionsSelect = [ this.optionArrayOneTwoThree , this.optionOne , this.optionObjetWithArray ];
    this.booleanFalse = false;
    this.A = "A";
    this.selectpicker1 = "B";
    this.selectpicker2 = ["B","C"];
    this.Selectpicker3 = [this.one, this.objetWithArray, "D"];
    this.Selectpicker4 = this.optionOne;
    this.Selectpicker5 = [];
  }

  ngOnInit() {
    this.NoneValue = "none value";
  }
}


SelectpickerComponent.parameters = [];
