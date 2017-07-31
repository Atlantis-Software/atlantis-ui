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
    this.iconSize = `
    <i class="icon icon-add icon-1x"></i>
    <i class="icon icon-add icon-2x"></i>
    <i class="icon icon-add icon-3x"></i>
    <i class="icon icon-add icon-4x"></i>
    <i class="icon icon-add icon-5x"></i>`;
    this.iconDisabled = `
    <i class="icon icon-add icon-disabled"></i>`
  }
}


IconComponent.parameters = [];
