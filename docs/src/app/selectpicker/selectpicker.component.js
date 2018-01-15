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
    this.selectpickerMultipleHtml = `
    <atlui-selectpicker name="Selectpicker2" [(ngModel)]="Selectpicker" multiple="true">
      <atlui-selectpicker-option [value]="A">AAAA</atlui-selectpicker-option>
      <atlui-selectpicker-option value="B">BBBB</atlui-selectpicker-option>
      <atlui-selectpicker-option value="C">CCCC</atlui-selectpicker-option>
    </atlui-selectpicker>`;

    this.selectpickerSimpleHtml = `
    <atlui-selectpicker name="Selectpicker1" [(ngModel)]="Selectpicker">
        <atlui-selectpicker-option [value]="A">AAAA</atlui-selectpicker-option>
        <atlui-selectpicker-option value="B">BBBB</atlui-selectpicker-option>
        <atlui-selectpicker-option value="C">CCCC</atlui-selectpicker-option>
    </atlui-selectpicker>`;

    this.selectpickerType = `
    <atlui-selectpicker name="Selectpicker3" [(ngModel)]="Selectpicker">
        <atlui-selectpicker-option [value]="A">AAAA</atlui-selectpicker-option>
        <atlui-selectpicker-option value="B">BBBB</atlui-selectpicker-option>
        <atlui-selectpicker-option value="C">CCCC</atlui-selectpicker-option>
        <atlui-selectpicker-option [value]="booleanFalse">boolean test</atlui-selectpicker-option>
        <atlui-selectpicker-option [value]="one">11111</atlui-selectpicker-option>
        <atlui-selectpicker-option [value]="arrayOneTwoThree">one, two, three</atlui-selectpicker-option>
        <atlui-selectpicker-option [value]="objetWithArray">objet javascript</atlui-selectpicker-option>
        <atlui-selectpicker-option> {{ AucuneValeur }} </atlui-selectpicker-option>
    </atlui-selectpicker>`;

    this.exempleDynamicSelect = `
      <atlui-selectpicker name="Selectpicker4" [(ngModel)]="Selectpicker1" multiple="true">
        <atlui-selectpicker-option *ngFor="let option of optionsSelect" [value]="option.value">{{ option.text}}</atlui-selectpicker-option>
      </atlui-selectpicker>

      with :
      optionArrayOneTwoThree = {value: arrayOneTwoThree, text: "arrayOneTwoThree"};
      optionOne = {value: one, text: "one"};
      optionObjetWithArray = {value: objetWithArray, text: "objetWithArray"};
      optionsSelect = [ optionArrayOneTwoThree , optionOne , optionObjetWithArray ];
      Selectpicker1 = [optionArrayOneTwoThree.value];`;

    this.Display = "Example";
    this.arrayOneTwoThree = ["one", "two", "three"];
    this.one = 1;
    this.objetWithArray  = { fsdfds: 1, array: [1,2,3], texte: "test"};
    this.optionArrayOneTwoThree = {value: this.arrayOneTwoThree, text: "arrayOneTwoThree"};
    this.optionOne = {value: this.one, text: "one"};
    this.optionObjetWithArray = {value: this.objetWithArray, text: "objetWithArray"};
    this.optionsSelect = [ this.optionArrayOneTwoThree , this.optionOne , this.optionObjetWithArray ];
    this.Selectpicker3 = [this.one, this.objetWithArray, "D"];
    this.booleanFalse = false;
    this.A = "A";
    this.selectpicker1 = this.A;
    this.selectpicker2 = this.A;
    this.Selectpicker4 = this.optionOne;

    // this.optionsSelect = [];
    //
    // for (var i = 0; i<10000;i++) {
    //   this.optionsSelect.push({value: i, text: i});
    // }
  }

  ngOnInit() {
    this.NoneValue = "none value";
  }
}


SelectpickerComponent.parameters = [];
