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

    this.dropdownHtml = `
    <atlui-dropdown title="Menu A">
      <atlui-dropdown-option><a>Sub-menu A</a></atlui-dropdown-option>
      <atlui-dropdown-option><a>Sub-menu B</a></atlui-dropdown-option>
      <atlui-dropdown-divider></atlui-dropdown-divider>
      <atlui-dropdown-option><a>Sub-menu separated A</a></atlui-dropdown-option>
      <atlui-dropdown-header>Menu</atlui-dropdown-header>
      <atlui-dropdown-option><a>Sub-menu separated B</a></atlui-dropdown-option>
    </atlui-dropdown>`;

    this.dropup = `
    <atlui-dropdown orientation="up" title="Menu A">
    </atlui-dropdown>`;

    this.dropdownAlignement = `
    <atlui-dropdown alignement="left" title="Menu A">
    </atlui-dropdown>
    <atlui-dropdown alignement="right" title="Menu A">
    </atlui-dropdown>`;

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
      },{
        label: "Sub-menu B"
      },{
        label: "Sub-menu separated A"
      },{
        label: "Sub-menu separated B"
      }
    ];`;

    this.dropdownNgFor = `
    <atlui-dropdown class="form-group" [options]="{alignement:'left'}" title="Menu A">
      <atlui-dropdown-option *ngFor="let dropdownoption of dropdownoptions" [options]="dropdownoption.options">
        {{dropdownoption.label}}
      </atlui-dropdown-option>
    </atlui-dropdown>`;

    this.dropdownIcon = `
    <atlui-dropdown title="Menu A" icon="add">`;
  }
}


DropdownComponent.parameters = [];
