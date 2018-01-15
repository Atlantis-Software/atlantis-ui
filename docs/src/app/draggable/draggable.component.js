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

    this.nodesBasic = [
      {
        label: 'Node without children'
      },
      {
        label: 'Node with children',
        children: [
          {
            label: 'Sub-node 1'
          },
          {
            label: 'Sub-node 2'
          }
        ]
      }
    ];
  }
}


DraggableComponent.parameters = [DOCUMENT];
