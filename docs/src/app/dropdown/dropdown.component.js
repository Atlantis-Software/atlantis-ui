import {Component} from '@angular/core';

export default  class DropdownComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./dropdown.html')
      })
    ]
  }
  constructor(){

    this.dropdownHtml = `
    <div class="dropdown">
      <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
        Dropdown Menu
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li class="dropdown-header">Action group</li>
        <li><a>Action</a></li>
        <li class="disabled"><a>Another action</a></li>
        <li><a>Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li class="dropdown-header">Other Action group</li>
        <li><a>Separated link</a></li>
        <li role="separator" class="divider"></li>
        <li><a>One more separated link</a></li>
      </ul>
    </div>`

    this.Display = "Example";
  }
}


DropdownComponent.parameters = [];
