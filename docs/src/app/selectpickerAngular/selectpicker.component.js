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
      <selectpicker-option [value]="arrayUnDeuxTrois">un, deux, trois</selectpicker-option>
      <selectpicker-option [value]="objetTableau">objet javascript</selectpicker-option>
    </selectpicker>`

    this.selectpickerSimpleHtml = `
    <selectpicker name="Selectpicker2" [(ngModel)]="Selectpicker2">
        <selectpicker-option [value]="A">AAAA</selectpicker-option>
        <selectpicker-option value="B">BBBB</selectpicker-option>
        <selectpicker-option value="C">CCCC</selectpicker-option>
        <selectpicker-option [value]="booleanFalse">boolean test</selectpicker-option>
        <selectpicker-option [value]="un">11111</selectpicker-option>
        <selectpicker-option [value]="arrayUnDeuxTrois">un, deux, trois</selectpicker-option>
        <selectpicker-option [value]="objetTableau">objet javascript</selectpicker-option>
        <selectpicker-option> {{ AucuneValeur }} </selectpicker-option>
    </selectpicker>
    `
    this.selectpickerOptionHtml = `
    var arrayUnDeuxTrois = ["un", "deux", "trois"];
    <selectpicker-option [value]="arrayUnDeuxTrois"> un, deux, trois </selectpicker-option>`;

    this.selectpickerOptionSansValueHtml = `
    var AucuneValeur = "aucune valeur";
    <selectpicker-option> {{ AucuneValeur }} </selectpicker-option>`;


    this.exempleBouttonMultiple = `
    var arrayUnDeuxTrois = ["un", "deux", "trois"];
    var self = this;
    var index = Selectpicker1.indexOf(this.arrayUnDeuxTrois);
    if (index > -1 ) {
      Selectpicker1.splice(index, 1);
    } else {
      Selectpicker1.push(this.arrayUnDeuxTrois);
    }`
    this.Display = "Example";
    this.Selectpicker3 = [];
    this.Selectpicker1 = ["A", "B", "C", "D"];
    this.arrayUnDeuxTrois = ["un", "deux", "trois"];
    this.un = 1;
    this.A = "A";
    this.objetTableau  = { valeur: 1, array: [1,2,3], test: "test"};
    this.booleanFalse = false;

  }

  ngOnInit() {
    this.AucuneValeur = "aucune valeur";
  }

  changeBinding(binding, value){
    var self = this;

    if (this[binding].indexOf(value) != -1 ) {
      this[binding].splice(this[binding].indexOf(value), 1);
    } else {
      this[binding].push(value)
    }
  }

  AddRemoveA() {
     var index = this.Selectpicker1.indexOf(this.A);
    if (index > -1 ) {
      this.Selectpicker1.splice(index, 1);
    } else {
      this.Selectpicker1.push(this.A);
    }
  }

  ValueA() {
    this.Selectpicker2 = this.A;
  }

  AddRemove1() {
    var index = this.Selectpicker1.indexOf(this.un);
    if (index > -1 ) {
      this.Selectpicker1.splice(index, 1);
    } else {
      this.Selectpicker1.push(this.un);
    }
  }

  Value1() {
    this.Selectpicker2 = this.un;
  }

  AddRemoveArray() {
    var self = this;
    var index = this.Selectpicker1.indexOf(this.arrayUnDeuxTrois);
    if (index > -1 ) {
      this.Selectpicker1.splice(index, 1);
    } else {
      this.Selectpicker1.push(this.arrayUnDeuxTrois);
    }
  }

  ValueArray() {
    this.Selectpicker2 = this.arrayUnDeuxTrois;
  }

  AddRemoveObjet() {
    var self = this;
    var index = this.Selectpicker1.indexOf(this.objetTableau);
    if (index > -1 ) {
      this.Selectpicker1.splice(index, 1);
    } else {
      this.Selectpicker1.push(this.objetTableau);
    }
  }

  ValueObjet() {
    this.Selectpicker2 = this.objetTableau;
  }

  AddRemoveBoolean() {
    var index = this.Selectpicker1.indexOf(this.booleanFalse);
    if (index > -1 ) {
      this.Selectpicker1.splice(index, 1);
    } else {
      this.Selectpicker1.push(this.booleanFalse);
    }
  }

  ValueBoolean() {
    this.Selectpicker2 = this.booleanFalse;
  }

  ValueAucuneValeur() {
    this.Selectpicker2 = this.AucuneValeur;
  }
}


SelectpickerAngularComponent.parameters = [];
