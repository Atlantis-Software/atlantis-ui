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

    this.dropdownHtml = `
    <dropdown title="test">
      <dropdown-option></dropdown-option>
      <dropdown-option [options]="options1">test1</dropdown-option>
      <dropdown-option [options]="options2">test2</dropdown-option>
      <dropdown-option>test3</dropdown-option>
    </dropdown>`

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
