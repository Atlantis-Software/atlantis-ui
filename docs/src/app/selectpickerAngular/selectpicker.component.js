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
    this.selectpickerHtml = `
    <selectpicker [(ngModel)]="mode" multiple="false">
      <selectpicker-option value="A">A</selectpicker-option>
      <selectpicker-option value="B">B</selectpicker-option>
      <selectpicker-option value="C">C</selectpicker-option>
    </selectpicker>`

    this.Display = "Example";
    this.Selectpicker3 = [];
    this.Selectpicker2 = "A";
    this.Selectpicker4 = ["A", "B","D"];
  }

  changeBinding(binding, value){
    var self = this;
    // var temp = [];
    // this[binding].forEach(function(valueBinding, index){
    //   temp[index] = valueBinding;
    // })

    if (this[binding].indexOf(value) != -1 ) {
      this[binding].splice(this[binding].indexOf(value), 1);
    } else {
      this[binding].push(value)
    }

    // this[binding] = temp;
  }

}


SelectpickerAngularComponent.parameters = [];
