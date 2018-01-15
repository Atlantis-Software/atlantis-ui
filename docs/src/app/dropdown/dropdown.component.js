import {Component} from '@angular/core';

export default  class DropdownComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./dropdown.html')
      })
    ];
  }
  constructor(){
    this.dropdownoptions = [
      {
        label: "Sub-menu A"
      },{
        label: "Sub-menu B"
      },{
        label: "Sub-menu separated A"
      },{
        label: "Sub-menu separated B"
      }
    ];
  }
}


DropdownComponent.parameters = [];
