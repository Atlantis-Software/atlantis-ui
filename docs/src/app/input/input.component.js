import {Component} from '@angular/core';

export default  class InputComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./input.html')
      })
    ]
  }
  constructor(){

    this.Display = "Example";

    this.input1 = "test";
    this.input2 = "test2";
  }
}


InputComponent.parameters = [];
