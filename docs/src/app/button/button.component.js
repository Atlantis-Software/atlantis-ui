import {Component} from '@angular/core';

export default  class ButtonComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./button.html')
      })
    ]
  }
  constructor(){
    this.buttonHtml = `
    <div class="form-group">
      <button type="button" class="btn btn-block">Basic</button>
    </div>`
    this.Display = "Example";
  }
}


ButtonComponent.parameters = [];
