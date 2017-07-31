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
    <dropdown title="Menu A">
      <dropdown-option>Sub-menu A</dropdown-option>
      <dropdown-option>Sub-menu B</dropdown-option>
      <dropdown-option>Sub-menu C</dropdown-option>
      <dropdown-option options="{type:'divider'}"></dropdown-option>
      <dropdown-option options="{type:'header'}"></dropdown-option>
      <dropdown-option>Sub-menu separated B</dropdown-option>
    </dropdown>`;

    this.dropup = `
    <dropdown [options]="{orientation:'up'}" title="Menu A">
    </dropdown>`;

    this.dropdownAlignement = `
    <dropdown [options]="{alignement:'left'}" title="Menu A">
    </dropdown>
    <dropdown [options]="{alignement:'right'}" title="Menu A">
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
