import {Component} from '@angular/core';

export default  class SelectpickerAngularComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./selectpicker.html')
      })
    ]
  }
  constructor(){
    this.selectpickerMultipleHtml = `
    <selectpicker name="Selectpicker1" [(ngModel)]="Selectpicker1" multiple="true">
      <selectpicker-option [value]="A">AAAA</selectpicker-option>
      <selectpicker-option value="B">BBBB</selectpicker-option>
      <selectpicker-option value="C">CCCC</selectpicker-option>
      <selectpicker-option [value]="booleanFalse">boolean test</selectpicker-option>
      <selectpicker-option [value]="un">11111</selectpicker-option>
      <selectpicker-option [value]="arrayOneTwoThree">one, two, three</selectpicker-option>
      <selectpicker-option [value]="objetWithArray">objet javascript</selectpicker-option>
    </selectpicker>`

    this.selectpickerSimpleHtml = `
    <selectpicker name="Selectpicker2" [(ngModel)]="Selectpicker2">
        <selectpicker-option [value]="A">AAAA</selectpicker-option>
        <selectpicker-option value="B">BBBB</selectpicker-option>
        <selectpicker-option value="C">CCCC</selectpicker-option>
        <selectpicker-option [value]="booleanFalse">boolean test</selectpicker-option>
        <selectpicker-option [value]="one">11111</selectpicker-option>
        <selectpicker-option [value]="arrayOneTwoThree">one, two, three</selectpicker-option>
        <selectpicker-option [value]="objetWithArray">objet javascript</selectpicker-option>
        <selectpicker-option> {{ AucuneValeur }} </selectpicker-option>
    </selectpicker>
    `
    this.selectpickerOptionHtml = `
    var arrayUnDeuxTrois = ["un", "deux", "trois"];
    <selectpicker-option [value]="arrayUnDeuxTrois"> un, deux, trois </selectpicker-option>`;

    this.selectpickerOptionWithoutValueHtml = `
    var NoneValue = "none value";
    <selectpicker-option> {{ NoneValue }} </selectpicker-option>`;


    this.exempleButtonArray = `
    var arrayOneTwoThree = ["one", "two", "three"];
    var self = this;
    var index = Selectpicker1.indexOf(this.arrayOneTwoThree);
    if (index > -1 ) {
      Selectpicker1.splice(index, 1);
    } else {
      Selectpicker1.push(this.arrayOneTwoThree);
    }`;

    this.exempleDynamicSelect = `
      <selectpicker name="Selectpicker1" [(ngModel)]="Selectpicker1" multiple="true">
        <selectpicker-option *ngFor="let option of optionsSelect" [value]="option.value">{{ option.text}}</selectpicker-option>
      </selectpicker>

      with :
      optionArrayOneTwoThree = {value: arrayOneTwoThree, text: "arrayOneTwoThree"};
      optionOne = {value: one, text: "one"};
      optionObjetWithArray = {value: objetWithArray, text: "objetWithArray"};
      optionsSelect = [ optionArrayOneTwoThree , optionOne , optionObjetWithArray ];
      Selectpicker1 = [optionArrayOneTwoThree.value];
    `;

    this.Display = "Example";
    this.Selectpicker3 = [];
    this.arrayOneTwoThree = ["un", "deux", "trois"];
    this.one = 1;
    this.objetWithArray  = { fsdfds: 1, array: [1,2,3], texte: "test"};
    this.optionArrayOneTwoThree = {value: this.arrayOneTwoThree, text: "arrayOneTwoThree"};
    this.optionOne = {value: this.one, text: "one"};
    this.optionObjetWithArray = {value: this.objetWithArray, text: "objetWithArray"};
    this.optionsSelect = [ this.optionArrayOneTwoThree , this.optionOne , this.optionObjetWithArray ];
    this.Selectpicker1 = [this.optionArrayOneTwoThree.value];
    this.Selectpicker3 = [this.one, this.objetWithArray, "D"];
    this.booleanFalse = false;
    this.A = "A";

    this.selectpickerNgForOptions = `
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

    this.selectpickerNgFor = `
    <selectpicker name="Selectpicker10" [(ngModel)]="Selectpicker10" multiple="true">
      <selectpicker-option *ngFor="let option of options" [value]="option.value">
        {{option.label}}
      </selectpicker-option>
    </selectpicker>`;

    this.options = [];

    // for(var i = 0; i< 10000; i++) {
    //   this.options.push({value:i,label:"test"+i});
    // }

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
    ]


  }

  ngOnInit() {
    this.NoneValue = "none value";
  }

  changeBinding(binding, value){
    var self = this;

    if (this[binding].indexOf(value) != -1 ) {
      this[binding].splice(this[binding].indexOf(value), 1);
    } else {
      this[binding].push(value)
    }
  }

  AddRemoveASelectPicker3() {
     var index = this.Selectpicker3.indexOf(this.A);
    if (index > -1 ) {
      this.Selectpicker3.splice(index, 1);
    } else {
      this.Selectpicker3.push(this.A);
    }
  }

  ValueA() {
    this.Selectpicker2 = this.A;
  }

  AddRemove1SelectPicker3() {
    var index = this.Selectpicker3.indexOf(this.one);
    if (index > -1 ) {
      this.Selectpicker3.splice(index, 1);
    } else {
      this.Selectpicker3.push(this.one);
    }
  }

  AddRemove1() {
    var index = this.Selectpicker1.indexOf(this.one);
    if (index > -1 ) {
      this.Selectpicker1.splice(index, 1);
    } else {

      this.Selectpicker1.push(this.one);
    }
  }

  Value1() {
    this.Selectpicker2 = this.one;
  }

  AddRemoveArray() {
    var self = this;
    var index = this.Selectpicker1.indexOf(this.arrayOneTwoThree);
    if (index > -1 ) {
      this.Selectpicker1.splice(index, 1);
    } else {
      this.Selectpicker1.push(this.arrayOneTwoThree);
    }
  }

  AddRemoveArraySelectPicker3() {
    var self = this;
    var index = this.Selectpicker3.indexOf(this.arrayOneTwoThree);
    if (index > -1 ) {
      this.Selectpicker3.splice(index, 1);
    } else {
      this.Selectpicker3.push(this.arrayOneTwoThree);
    }
  }

  ValueArray() {
    this.Selectpicker2 = this.arrayOneTwoThree;
  }

  AddRemoveObjet() {
    var self = this;
    var index = this.Selectpicker1.indexOf(this.objetWithArray);
    if (index > -1 ) {
      this.Selectpicker1.splice(index, 1);
    } else {

      this.Selectpicker1.push(this.objetWithArray);
    }
  }

  AddRemoveObjetSelectPicker3() {
    var self = this;
    var index = this.Selectpicker3.indexOf(this.objetWithArray);
    if (index > -1 ) {
      this.Selectpicker3.splice(index, 1);
    } else {
      this.Selectpicker3.push(this.objetWithArray);
    }
  }

  ValueObjet() {
    this.Selectpicker2 = this.objetWithArray;
  }

  AddRemoveBooleanSlectPicker3() {
    var index = this.Selectpicker3.indexOf(this.booleanFalse);
    if (index > -1 ) {
      this.Selectpicker3.splice(index, 1);
    } else {

      this.Selectpicker3.push(this.booleanFalse);
    }
  }

  ValueBoolean() {
    this.Selectpicker2 = this.booleanFalse;
  }

  ValueNoneValue() {
    this.Selectpicker2 = this.NoneValue;
  }
}


SelectpickerAngularComponent.parameters = [];
