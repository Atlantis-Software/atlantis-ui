import { getTestBed, TestBed, inject } from '@angular/core/testing';
import { Component } from '@angular/core';
import { sortableContainer, sortableComponents, sortableHandler } from './sortable.component.js';

import { dragAndDropSortableService, dragAndDropService } from './dragAndDrop.service.js';

function triggerEvent(elem, eventType){
  var event = new DragEvent(eventType);
  elem.dispatchEvent(event);
}

function swapItem(nodes, firstNodeId, secondNodeId) {
  swapMultiple(nodes, firstNodeId, nodes, secondNodeId);
}

function swapMultiple(nodesOne, firstNodeId, nodesTwo, secondNodeId) {
  triggerEvent(nodesOne[firstNodeId], 'dragstart');
  triggerEvent(nodesTwo[secondNodeId], 'dragenter');
  triggerEvent(nodesTwo[secondNodeId], 'drop');
  triggerEvent(nodesTwo[secondNodeId], 'dragend');
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
          <ul class="list-group" [atlui-sortable-container]="listOne">
            <li *ngFor="let item of listOne; let i = index" class="list-group-item" atlui-sortable>{{item}}</li>
          </ul>
        </div>`
      })
    ];
  }
}

class sortableHandleTestComponent {
  constructor() {
    this.sortableList = [];
  }
  static get annotations() {
    return [
      new Component({
        template: `
        <div>
          <ul class="list-group" [atlui-sortable-container]="sortableList">
            <li *ngFor="let item of sortableList; let i = index" atlui-sortable>
              <span class="handle" atlui-sortable-handle>=</span>
              <span class="non-handle">{{item}}</span>
            </li>
          </ul>
        </div>
        `
      })
    ];
  }
}

class sortableMultipleTestComponent {
  constructor() {
    this.singleList = [];
    this.multiOneList = [];
    this.multiTwoList = [];
  }
  static get annotations() {
    return [
      new Component({
        template: `
        <div>
          <div id='single'>
            <ul class="list-group" [atlui-sortable-container]="singleList">
              <li *ngFor="let item of singleList; let i = index" atlui-sortable>{{item}}</li>
            </ul>
          </div>
          <div id='multiOne' [atlui-sortable-container]="multiOneList" [dropzones]="[multiList]">
            <ul class="list-group" >
              <li *ngFor="let item of multiOneList; let i = index" atlui-sortable>{{item}}</li>
            </ul>
          </div>
          <div id='multiTwo' [atlui-sortable-container]="multiTwoList" [dropzones]="[multiList]">
            <ul class="list-group" >
              <li *ngFor="let item of multiTwoList; let i = index" atlui-sortable>{{item}}</li>
            </ul>
          </div>
        </div>
        `
      })
    ];
  }
}
describe('Sortable Drag and Drop', function() {
  describe('Simple list', function() {
    var fixture, container, ds;
    beforeEach(() =>{
      TestBed.configureTestingModule({
        declarations: [sortableSimpleTestComponent, sortableContainer, sortableComponents],
        providers: [dragAndDropSortableService, dragAndDropService]
      });
      TestBed.compileComponents();
    });

    beforeEach(inject([dragAndDropSortableService, dragAndDropService],
    (dragAndDropSortableService)=> {
      ds = dragAndDropSortableService;
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

    it('should sort in the same list', ()=>{
      var values = ['A', 'B', 'C', 'D', 'E'];
      container.listOne = values;
      fixture.detectChanges();

      var list = fixture.elementRef.nativeElement.querySelector('ul');
      assert(!ds.sortableContainer, 'should not be defined');
      assert(!ds.index, 'should not be defined');

      triggerEvent(list.children[0], 'dragstart');
      fixture.detectChanges();
      assert.strictEqual(ds.sortableContainer.sortableData, values,'should be defined');
      assert.strictEqual(ds.index, 0,'should be defined');

      swapItem(list.children, 0, 1);
      fixture.detectChanges();
      assert.strictEqual(values[0], 'B');
      assert.strictEqual(list.children[0].textContent, 'B');
      assert.strictEqual(values[1], 'A');
      assert.strictEqual(list.children[1].textContent, 'A');
    });

    it('should sort with any type', ()=>{
      var elementOne = document.createElement('div');
      var elementTwo = 'elementTwo';
      var elementThree = {'key':'value'};
      var values = [elementOne, elementTwo, elementThree];
      container.listOne = values;
      fixture.detectChanges();

      var list = fixture.elementRef.nativeElement.querySelector('ul');

      swapItem(list.children, 0, 1);
      fixture.detectChanges();
      assert.strictEqual(values[0], elementTwo);
      assert.strictEqual(values[1], elementOne);

      swapItem(list.children, 1, 2);
      fixture.detectChanges();
      assert.strictEqual(values[1], elementThree);
      assert.strictEqual(values[2], elementOne);

      swapItem(list.children, 0, 1);
      fixture.detectChanges();
      assert.strictEqual(values[0], elementThree);
      assert.strictEqual(values[1], elementTwo);
    });
  });

  describe('Multiple list', function() {
    var fixture, container;
    beforeEach(() =>{
      TestBed.configureTestingModule({
        declarations: [sortableMultipleTestComponent, sortableContainer, sortableComponents],
        providers: [dragAndDropSortableService, dragAndDropService]
      });
      TestBed.compileComponents();
    });

    beforeEach(inject([dragAndDropSortableService, dragAndDropService],
    ()=> {
      fixture = TestBed.createComponent(sortableMultipleTestComponent);
      fixture.detectChanges();
      container = fixture.componentInstance;
    }));

    afterEach(function() {
      getTestBed().resetTestingModule();
    });

    it('should sort in the same list', () => {
      var singleList = ['singleOne', 'singleTwo', 'singleThree'];
      var multipleOneList = ['multipleOne', 'multipleTwo', 'multipleThree'];
      var multipleTwoList = ['multipleFour', 'multipleFive', 'multipleSix'];

      container.singleList = singleList;
      container.multiOneList = multipleOneList;
      container.multiTwoList = multipleTwoList;
      fixture.detectChanges();

      var divElement = fixture.elementRef.nativeElement.querySelector('div');
      assert.strictEqual(divElement.children.length, 3);

      var singleElement = divElement.querySelector('#single ul');
      swapItem(singleElement.children, 0, 1);
      fixture.detectChanges();
      assert.strictEqual(singleList[0], 'singleTwo');
      assert.strictEqual(singleElement.children[0].textContent, 'singleTwo');
      assert.strictEqual(singleList[1], 'singleOne');
      assert.strictEqual(singleElement.children[1].textContent, 'singleOne');

      var multipleOneElement = divElement.querySelector('#multiOne ul');
      swapItem(multipleOneElement.children, 1, 2);
      fixture.detectChanges();
      assert.strictEqual(multipleOneList[1], 'multipleThree');
      assert.strictEqual(multipleOneElement.children[1].textContent, 'multipleThree');
      assert.strictEqual(multipleOneList[2], 'multipleTwo');
      assert.strictEqual(multipleOneElement.children[2].textContent, 'multipleTwo');

      var multipleTwoElement = divElement.querySelector('#multiTwo ul');
      swapItem(multipleTwoElement.children, 0, 2);
      fixture.detectChanges();
      assert.strictEqual(multipleTwoList[0], 'multipleFive');
      assert.strictEqual(multipleTwoElement.children[0].textContent, 'multipleFive');
      assert.strictEqual(multipleTwoList[1], 'multipleSix');
      assert.strictEqual(multipleTwoElement.children[1].textContent, 'multipleSix');
      assert.strictEqual(multipleTwoList[2], 'multipleFour');
      assert.strictEqual(multipleTwoElement.children[2].textContent, 'multipleFour');

    });

    it('should move items from list one to list two', () => {
      var singleList = ['singleOne', 'singleTwo', 'singleThree'];
      var multipleOneList = ['multipleOne', 'multipleTwo', 'multipleThree'];
      var multipleTwoList = ['multipleFour', 'multipleFive', 'multipleSix'];

      container.singleList = singleList;
      container.multiOneList = multipleOneList;
      container.multiTwoList = multipleTwoList;
      fixture.detectChanges();

      var divElement = fixture.elementRef.nativeElement.querySelector('div');
      assert.strictEqual(divElement.children.length, 3);

      var multipleOneElement = divElement.querySelector('#multiOne ul');
      var multipleTwoElement = divElement.querySelector('#multiTwo ul');
      swapMultiple(multipleOneElement.children, 0, multipleTwoElement.children, 0);
      fixture.detectChanges();
      assert.strictEqual(multipleOneList.length, 2);
      assert.strictEqual(multipleTwoList.length, 4);

      assert.strictEqual(multipleOneList[0], 'multipleTwo');
      assert.strictEqual(multipleTwoList[0], 'multipleOne');
      assert.strictEqual(multipleTwoList[1], 'multipleFour');

    });

    it('should not move items from list with different sortable-zone', () => {
      var singleList = ['singleOne', 'singleTwo', 'singleThree'];
      var multipleOneList = ['multipleOne', 'multipleTwo', 'multipleThree'];
      var multipleTwoList = ['multipleFour', 'multipleFive', 'multipleSix'];

      container.singleList = singleList;
      container.multiOneList = multipleOneList;
      container.multiTwoList = multipleTwoList;
      fixture.detectChanges();

      var divElement = fixture.elementRef.nativeElement.querySelector('div');
      assert.strictEqual(divElement.children.length, 3);

      var singleElement = divElement.querySelector('#single ul');
      var multipleOneElement = divElement.querySelector('#multiOne ul');
      swapMultiple(singleElement.children, 0, multipleOneElement.children, 0);
      fixture.detectChanges();
      assert.strictEqual(singleList.length, 3);
      assert.strictEqual(multipleOneList.length, 3);

      assert.strictEqual(singleList[0], 'singleOne');
      assert.strictEqual(multipleOneList[0], 'multipleOne');

    });

    it('should move to empty list', () => {
      var singleList = ['singleOne', 'singleTwo', 'singleThree'];
      var multipleOneList = [];
      var multipleTwoList = ['multipleFour', 'multipleFive', 'multipleSix'];

      container.singleList = singleList;
      container.multiOneList = multipleOneList;
      container.multiTwoList = multipleTwoList;
      fixture.detectChanges();

      var divElement = fixture.elementRef.nativeElement.querySelector('div');
      assert.strictEqual(divElement.children.length, 3);

      var multipleOneElement = divElement.querySelector('#multiOne');
      var multipleTwoElement = divElement.querySelector('#multiTwo ul');
      triggerEvent(multipleTwoElement.children[0], 'dragstart');
      triggerEvent(multipleOneElement, 'drop');
      fixture.detectChanges();
      assert.strictEqual(multipleOneList.length, 1);
      assert.strictEqual(multipleTwoList.length, 2);

      assert.strictEqual(multipleOneList[0], 'multipleFour');
      assert.strictEqual(multipleTwoList[0], 'multipleFive');
    });
  });

  describe('Handle list', function() {
    var fixture, container, ds;
    beforeEach(() =>{
      TestBed.configureTestingModule({
        declarations: [sortableHandleTestComponent, sortableContainer, sortableComponents, sortableHandler],
        providers: [dragAndDropSortableService, dragAndDropService]
      });
      TestBed.compileComponents();
    });

    beforeEach(inject([dragAndDropSortableService, dragAndDropService],
    (dragAndDropSortableService)=> {
      ds = dragAndDropSortableService;
      fixture = TestBed.createComponent(sortableHandleTestComponent);
      fixture.detectChanges();
      container = fixture.componentInstance;
    }));

    afterEach(function() {
      getTestBed().resetTestingModule();
    });

    it('should be sortable by handle', () => {
      var value = ['singleOne', 'singleTwo', 'singleThree'];

      container.sortableList = value;
      fixture.detectChanges();

      var ulElement = fixture.elementRef.nativeElement.querySelector('ul');
      assert.strictEqual(ulElement.children.length, value.length);

      assert(!ds.sortableContainer, 'should not be defined');
      assert(!ds.index, 'should not be defined');

      var mouseDown = new Event('mousedown', { 'bubbles': true });

      ulElement.children[0].querySelector('.handle').dispatchEvent(mouseDown);
      // triggerEvent(ulElement.children[0].querySelector('.handle'), 'mousedown');
      triggerEvent(ulElement.children[0], 'dragstart');
      assert.strictEqual(ds.sortableContainer.sortableData, value,'should be defined');
      assert.strictEqual(ds.index, 0,'should be defined');
      swapItem(ulElement.children, 0, 1);
      fixture.detectChanges();

      assert.strictEqual(value[0], 'singleTwo');
      assert.strictEqual(ulElement.children[0].querySelector('.non-handle').textContent, 'singleTwo');
      assert.strictEqual(value[1], 'singleOne');
      assert.strictEqual(ulElement.children[1].querySelector('.non-handle').textContent, 'singleOne');
    });

    it('should not be sortable by non-handle', () => {
      var value = ['singleOne', 'singleTwo', 'singleThree'];

      container.sortableList = value;
      fixture.detectChanges();

      var ulElement = fixture.elementRef.nativeElement.querySelector('ul');
      assert.strictEqual(ulElement.children.length, value.length);

      assert(!ds.sortableContainer, 'should not be defined');
      assert(!ds.index, 'should not be defined');

      triggerEvent(ulElement.children[0].querySelector('.non-handle'), 'dragstart');
      fixture.detectChanges();
      assert(!ds.sortableContainer,'should not be defined');
      assert(!ds.index,'should not be defined');
    });
  });
});
