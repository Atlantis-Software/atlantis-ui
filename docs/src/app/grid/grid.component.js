import {Component} from '@angular/core';

export default  class GridComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./grid.html')
      })
    ]
  }
  constructor(){

    this.GridHtml = `
    <div class="col-md-6">
      Content
    </div>`

    this.Display = "Example";
  }
}


GridComponent.parameters = [];
