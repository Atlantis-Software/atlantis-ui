import {Component} from '@angular/core';

export default  class DraggableComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./draggable.html')
      })
    ];
  }
  constructor(){
  }
}


DraggableComponent.parameters = [];
