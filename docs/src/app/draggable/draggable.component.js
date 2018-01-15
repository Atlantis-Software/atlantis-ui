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

    this.draggableBasic = `
    <div dragItem>
      Some text
    </div>`;

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

    this.draggableContainer = `
    <div #container>
      <div style="width:200px;height:100px;" class="well" dragItem [dragContainment]="container">
        <p>
          You can drag me into this box
        </p>
      </div>
    </div>
    <div class="well" dragItem [dragContainment]="document.body">
      <p>
        You can drag me all in body
      </p>
    </div>`;

    this.draggableHandle = `
    <div class="well" dragItem [dragContainment]="document.body">
      <h4 dragItem-handle>
        Draggable handle
      </h4>
      <p>
        You can drag me all in body
      </p>
    </div>`;
  }
}


DraggableComponent.parameters = [DOCUMENT];
