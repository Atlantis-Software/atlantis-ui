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
    </div>`

    this.Display = "Example";
  }
}


ButtongroupsComponent.parameters = [];
