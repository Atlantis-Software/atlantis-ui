import {Component} from '@angular/core';

export default  class ButtongroupsComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./buttongroups.html')
      })
    ]
  }
  constructor(){

    this.buttongroupsHtml = `
    <div class="btn-group" role="group" >
      <button type="button" class="btn btn-default">1</button>
      <button type="button" class="btn btn-default">2</button>
      <button type="button" class="btn btn-default">3</button>
    </div>`;
    this.buttonToolbar = `
    <div class="btn-toolbar">
      <div class="btn-group">
        ...
      </div>
      <div class="btn-group">
        ...
      </div>
    </div>`;
    this.buttongroupsDropdown = `
    <div class="btn-group">
      <button type="button" class="btn btn-default">Save</button>
      <button type="button" class="btn btn-default">Load</button>

      <dropdown title="File">
          ...
      </dropdown>
    </div>`;
    this.buttongroupsSize = `
    <div class="btn-group btn-group-lg" role="group">
      ...
    </div>
    <div class="btn-group" role="group">
      ...
    </div>
    <div class="btn-group btn-group-sm" role="group">
      ...
    </div>
    <div class="btn-group btn-group-xs" role="group">
      ...
    </div>`;
    this.buttonVertical = `
    <div class="btn-group-vertical">
      ...
    </div>`;
    this.buttonJustified = `
    <div class="btn-group btn-group-justified">
      ..
    </div>`
  }
}


ButtongroupsComponent.parameters = [];
