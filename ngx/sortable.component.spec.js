import { getTestBed, TestBed, inject, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { sortableContainer, sortableComponents } from './sortable.component.js';

import { dragAndDropSortableService, dragAndDropService } from './dragAndDrop.service.js';

function triggerEvent(elem, eventType){
  var event = new DragEvent(eventType, new DataTransfer);
  // event.dataTransfer = new DataTransfer();
  console.log(event)
  elem.dispatchEvent(event);
}

function swapItem(nodes, firstNodeId, secondNodeId) {
  swapMultiple(nodes, firstNodeId, nodes, secondNodeId);
}

function swapMultiple(nodesOne, firstNodeId, nodesTwo, secondNodeId) {
  triggerEvent(nodesOne[firstNodeId], 'dragstart');
  triggerEvent(nodesOne[secondNodeId], 'dragover');
  triggerEvent(nodesOne[firstNodeId], 'dragend');
  triggerEvent(nodesOne[secondNodeId], 'drop');
}

var assert = require('assert');

class sortableSimpleTestComponent {
  constructor() {
    this.listOne = [];
  }
  static get annotations() {
    return [
      new Component({
        template: `
        <div>
          <ul class="list-group" sortable-container [sortableData]="listOne">
            <li *ngFor="let item of listOne; let i = index" class="list-group-item" sortable [sortableIndex]="i">{{item}}</li>
          </ul>
        </div>
        `
      })
    ];
  }
}

describe('Sortable Drag and Drop', function() {
  var fixture, container, ds, dd;
  beforeEach(() =>{
    TestBed.configureTestingModule({
      declarations: [sortableSimpleTestComponent, sortableContainer, sortableComponents],
      providers: [dragAndDropSortableService, dragAndDropService]
    });
    TestBed.compileComponents();
  });

  beforeEach(inject([dragAndDropSortableService, dragAndDropService],
  (dragAndDropSortableService, dragAndDropService)=> {
    ds = dragAndDropSortableService;
    dd = dragAndDropService;
    fixture = TestBed.createComponent(sortableSimpleTestComponent);
    fixture.detectChanges();
    container = fixture.componentInstance;
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render list of elements draggable', () => {
    var values = ['A', 'B', 'C', 'D', 'E'];

    container.listOne = values;
    fixture.detectChanges();

    var list = fixture.elementRef.nativeElement.querySelector('ul');
    assert.strictEqual(list.children.length, values.length);

    for (var i = 0; i < list.children.length; i++) {
      var childElement = list.children[i];
      assert(childElement.attributes['draggable'], 'should be draggable');
    }
  });

  // it('should sort in the same list', ()=>{
  //   var values = ['A', 'B', 'C', 'D', 'E'];
  //   container.listOne = values;
  //   fixture.detectChanges();
  //
  //   var list = fixture.elementRef.nativeElement.querySelector('ul');
  //   assert(!ds.sortableContainer, 'should not be defined');
  //   assert(!ds.index, 'should not be defined');
  //
  //   triggerEvent(list.children[0], 'dragstart');
  //   fixture.detectChanges();
  //   assert.strictEqual(ds.sortableContainer.sortableData, values,'should not be defined');
  //   assert.strictEqual(ds.index, 0,'should not be defined');
  //
  //   swapItem(list.children, 0, 1);
  //   fixture.detectChanges();
  //   assert.strictEqual(values[0], 'B');
  //   assert.strictEqual(list.children[0].textContent, 'B');
  //   assert.strictEqual(values[1], 'A');
  //   assert.strictEqual(list.children[1].textContent, 'A');
  //
  // });
});
