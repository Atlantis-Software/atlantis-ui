import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { accordionComponent } from './accordion.component.js';
import { accordionPanelComponent } from './accordion.component.js';

var assert = require('assert');

class accordionTestComponent {
  constructor() {}
  static get annotations() {
    return [
      new Component({
        template: `
    <accordion openDefault="1" style="success">
      <accordion-panel [title]="'test1'">
        Panel1
      </accordion-panel>
      <accordion-panel [title]="'test2'">
        Panel2
      </accordion-panel>
      <accordion-panel [title]="'test3'">
        Panel3
      </accordion-panel>
    </accordion>`
      })
    ];
  }
}

describe('accordion', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [accordionTestComponent, accordionComponent, accordionPanelComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(function() {
    var fixture = TestBed.createComponent(accordionTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var options = document.querySelectorAll('a');
    var panels = document.querySelectorAll('.panel');

    assert.strictEqual(options.length, 3);
    assert.strictEqual(options[0].textContent, 'test1');
    assert.strictEqual(options[1].textContent, 'test2');
    assert.strictEqual(options[2].textContent, 'test3');

    assert.strictEqual(panels.length, 3);
    assert.strictEqual(panels[0].classList[2], void 0);
    assert.strictEqual(panels[1].classList[2], 'panel-open');
    assert.strictEqual(panels[2].classList[2], void 0);
  }));

  it('should render selected value', fakeAsync(function() {
    var fixture = TestBed.createComponent(accordionTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var options = document.querySelectorAll('a');
    options[0].click();
    tick();
    fixture.detectChanges();
    var panels = document.querySelectorAll('.panel');
    assert.strictEqual(panels.length, 3);
    assert.strictEqual(panels[0].classList[2], 'panel-open');
    assert.strictEqual(panels[1].classList[2], void 0);
    assert.strictEqual(panels[2].classList[2], void 0);
  }));

  it('should render no open', fakeAsync(function() {
    var fixture = TestBed.createComponent(accordionTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var options = document.querySelectorAll('a');
    options[1].click();
    tick();
    fixture.detectChanges();
    var panels = document.querySelectorAll('.panel');
    assert.strictEqual(panels.length, 3);
    assert.strictEqual(panels[0].classList[2], void 0);
    assert.strictEqual(panels[1].classList[2], void 0);
    assert.strictEqual(panels[2].classList[2], void 0);
  }));
});
