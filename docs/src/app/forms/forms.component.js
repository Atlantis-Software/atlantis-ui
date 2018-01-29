import {Component} from '@angular/core';

export default  class FormsComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./forms.html')
      })
    ];
  }
  constructor(){
    this.Selectpicker1 = [];
  }
}


FormsComponent.parameters = [];
