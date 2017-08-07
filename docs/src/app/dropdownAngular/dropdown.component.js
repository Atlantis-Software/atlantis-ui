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
    <dropdown [options]="{orientation:'up'}" title="Menu A">
      <dropdown-option><a>Sub-menu A</a></dropdown-option>
      <dropdown-option><a>Sub-menu B</a></dropdown-option>
      <dropdown-divider></dropdown-divider>
      <dropdown-option><a>Sub-menu separated A</a></dropdown-option>
      <dropdown-header>Menu</dropdown-header>
      <dropdown-option><a>Sub-menu separated B</a></dropdown-option>
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

    this.dropdownNgForJS = `
    this.dropdownoptions = [
      {
        label: "Sub-menu A"
      },
      {
        label: "Sub-menu B"
      },
      {
        label: "",
        options : {
          type : "divider"
        }
      },
      {
        label: "Sub-menu separated A"
      },
      {
        label: "",
        options : {
          type : "header"
        }
      },
      {
        label: "Sub-menu separated B"
      }
    ];`

    this.dropdownNgFor = `
    <dropdown class="form-group" [options]="{alignement:'left'}" title="Menu A">
      <dropdown-option *ngFor="let dropdownoption of dropdownoptions" [options]="dropdownoption.options">
        {{dropdownoption.label}}
      </dropdown-option>
    </dropdown>`

    this.Display = "Example";
  }
}


DropdownAngularComponent.parameters = [];
