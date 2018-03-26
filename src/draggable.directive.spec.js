import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DOCUMENT } from '@angular/platform-browser';

import { draggableDirective, draggableHandleDirective } from './draggable.directive.js';

var assert = require('assert');

class draggableTestComponent {
  constructor(document) {
    this.document = document;
  }
  static get annotations() {
    return [
      new Component({
        template: `
        <div #container style="width:900px;height:600px;border: 1px solid black;">
          <div style="width:200px;height:100px;" class="well example1" atlui-dragItem [dragContainment]="container">
            <p>
              You can drag me !
            </p>
          </div>
        </div>
        <div resizable class="well example2" atlui-dragItem [dragContainment]="document.body">
          <h2 atlui-dragItem-handle class="handle">
            test
          </h2>
          <p>
            You can drag me !
          </p>
        </div>`
      })
    ];
  }
}

draggableTestComponent.parameters = [DOCUMENT];

describe('Draggable', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [draggableTestComponent, draggableDirective, draggableHandleDirective]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(function() {
    var fixture = TestBed.createComponent(draggableTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var draggableStyle1 = window.getComputedStyle(document.querySelector(".example1"));

    var draggableTop1 = draggableStyle1.getPropertyValue("top");
    var draggableLeft1 = draggableStyle1.getPropertyValue("left");
    var draggablezIndex1 = draggableStyle1.getPropertyValue("z-index");

    var draggableStyle2 = window.getComputedStyle(document.querySelector(".example2"));

    var draggableTop2 = draggableStyle2.getPropertyValue("top");
    var draggableLeft2 = draggableStyle2.getPropertyValue("left");
    var draggablezIndex2 = draggableStyle2.getPropertyValue("z-index");

    assert.strictEqual(draggableTop1, "auto");
    assert.strictEqual(draggableLeft1, "auto");
    assert.strictEqual(draggablezIndex1, "auto");


    assert.strictEqual(draggableTop2, "auto");
    assert.strictEqual(draggableLeft2, "auto");
    assert.strictEqual(draggablezIndex2, "auto");

  }));

  it('should move when drag on standard draggable', fakeAsync(function() {
    var fixture = TestBed.createComponent(draggableTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var draggable = document.querySelector(".example1");

    var mousedown = new Event('mousedown', { 'bubbles': true });
    mousedown.clientX = 10;
    mousedown.clientY = 5;

    draggable.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    var draggableStyle1 = window.getComputedStyle(draggable);

    assert.strictEqual(draggableStyle1.getPropertyValue('z-index'), '99999');

    var mouseMove = new Event('mousemove', { 'bubbles': true });
    mouseMove.clientX = 50;
    mouseMove.clientY = 20;

    draggable.dispatchEvent(mouseMove);
    tick();
    fixture.detectChanges();

    var mouseUp = new Event('mouseup', { 'bubbles': true });
    draggable.dispatchEvent(mouseUp);
    tick();
    fixture.detectChanges();

    var draggableTop1 = draggableStyle1.getPropertyValue("top");
    var draggableLeft1 = draggableStyle1.getPropertyValue("left");
    assert.strictEqual(draggableTop1, "15px");
    assert.strictEqual(draggableLeft1, "40px");
    assert.strictEqual(draggableStyle1.getPropertyValue('z-index'), 'auto');

  }));

  it('should move when drag on handle draggable', fakeAsync(function() {
    var fixture = TestBed.createComponent(draggableTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var draggableHandle = document.querySelector(".handle");

    var mousedown = new Event('mousedown', { 'bubbles': true });
    mousedown.clientX = 10;
    mousedown.clientY = 605;

    draggableHandle.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    var draggable = document.querySelector('.example2');

    var draggableStyle1 = window.getComputedStyle(draggable);

    assert.strictEqual(draggableStyle1.getPropertyValue('z-index'), '99999');

    var mouseMove = new Event('mousemove', { 'bubbles': true });
    mouseMove.clientX = 25;
    mouseMove.clientY = 50;

    draggableHandle.dispatchEvent(mouseMove);
    tick();
    fixture.detectChanges();

    var mouseUp = new Event('mouseup', { 'bubbles': true });
    draggableHandle.dispatchEvent(mouseUp);
    tick();
    fixture.detectChanges();
    var draggableTop1 = draggableStyle1.getPropertyValue("top");
    var draggableLeft1 = draggableStyle1.getPropertyValue("left");
    assert.strictEqual(draggableTop1, "-555px");
    assert.strictEqual(draggableLeft1, "0px");
    assert.strictEqual(draggableStyle1.getPropertyValue('z-index'), 'auto');

  }));

  it('should not move outer that container', fakeAsync(function() {
    var fixture = TestBed.createComponent(draggableTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var draggable = document.querySelector(".example1");

    var mousedown = new Event('mousedown', { 'bubbles': true });
    mousedown.clientX = 10;
    mousedown.clientY = 5;

    draggable.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    var draggableStyle1 = window.getComputedStyle(draggable);

    assert.strictEqual(draggableStyle1.getPropertyValue('z-index'), '99999');

    var mouseMove = new Event('mousemove', { 'bubbles': true });
    mouseMove.clientX = 800;
    mouseMove.clientY = 1000;

    draggable.dispatchEvent(mouseMove);
    tick();
    fixture.detectChanges();

    var mouseUp = new Event('mouseup', { 'bubbles': true });
    draggable.dispatchEvent(mouseUp);
    tick();
    fixture.detectChanges();
    var draggableTop1 = draggableStyle1.getPropertyValue("top");
    var draggableLeft1 = draggableStyle1.getPropertyValue("left");
    assert.strictEqual(draggableTop1, "499px");
    assert.strictEqual(draggableLeft1, "699px");
    assert.strictEqual(draggableStyle1.getPropertyValue('z-index'), 'auto');

  }));

});
