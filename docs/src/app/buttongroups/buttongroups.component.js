import {Component} from '@angular/core';

export default  class ButtongroupsComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./buttongroups.html')
      })
    ];
  }
  constructor(){
  }
}


ButtongroupsComponent.parameters = [];
