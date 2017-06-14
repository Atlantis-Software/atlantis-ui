import {Component} from '@angular/core';

export default  class DropdownAngularComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./dropdown.html')
      })
    ]
  }
  constructor(){

    this.options1 = {
      type: "header"
    }

    this.options2 = {
      type: "divider"
    }
    
    this.Display = "Example";
  }
}


DropdownAngularComponent.parameters = [];
