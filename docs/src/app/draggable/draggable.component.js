import {Component} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

export default  class DraggableComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./draggable.html')
      })
    ];
  }
  constructor(document) {
    this.document = document;
  }
}


DraggableComponent.parameters = [DOCUMENT];
