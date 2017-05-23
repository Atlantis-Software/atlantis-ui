import {Component} from '@angular/core';

export default  class SelectpickerComponent {
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
    this.Selectpicker4 = ["A", "B"];
  }

  changeBinding(binding, value){
    var self = this;
    var temp = this[binding];
    var valuePresent = false;
    temp.forEach(function(valueBinding, index){
      if (valueBinding === value){
        self[binding].splice(self[binding].indexOf(value),1);
        valuePresent = true;
      }
    })
    if (!valuePresent){
      this[binding].push(value)
    }
  }

}


SelectpickerComponent.parameters = [];
