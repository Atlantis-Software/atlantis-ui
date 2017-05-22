import {Component} from '@angular/core';

export default  class IconComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./icon.html')
      })
    ]
  }
  constructor(){

    this.Display = "Example";
    this.iconHtml = `
    <i class="icon icon-name"></i>`

  }
}


IconComponent.parameters = [];
