import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';

var assert = require('assert');

class tooltipTestComponent {
  constructor() {}
  static get annotations() {
    return [
      new Component({
        template: `
        <button type="button" class="btn btn-default" atlui-tooltip tooltipDirection="left" [tooltipContent]="'test1'">
          tooltip on left
        </button>

        <button type="button" class="btn btn-default" atlui-tooltip tooltipDirection="top" tooltipContent="test2">
          tooltip on top
        </button>

        <button type="button" class="btn btn-default" atlui-tooltip tooltipDirection="bottom" tooltipContent="test3">
          tooltip on bottom
        </button>

        <button type="button" class="btn btn-default" atlui-tooltip tooltipDirection="right" tooltipContent="test4">
          tooltip on right
        </button>`
      })
    ];
  }
}

describe('tooltip', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, AtlantisUiModule.forRoot()],
      declarations: [tooltipTestComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(() => {
    var fixture = TestBed.createComponent(tooltipTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var tooltip = document.querySelectorAll('atlui-tooltipcomponent');
    var content = document.querySelectorAll('.tooltip-inner');

    assert.strictEqual(tooltip.length, 4);
    assert.strictEqual(tooltip[0].classList[2], 'left');
    assert.strictEqual(tooltip[1].classList[2], 'top');
    assert.strictEqual(tooltip[2].classList[2], 'bottom');
    assert.strictEqual(tooltip[3].classList[2], 'right');

    assert.strictEqual(content.length, 4);
    assert.strictEqual(content[0].textContent, 'test1');
    assert.strictEqual(content[1].textContent, 'test2');
    assert.strictEqual(content[2].textContent, 'test3');
    assert.strictEqual(content[3].textContent, 'test4');
  }));

  it('should open on mouseenter then close on mouseleave', fakeAsync(() => {
    var fixture = TestBed.createComponent(tooltipTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var button = fixture.debugElement.queryAll(By.css('button'));
    var tooltip = document.querySelectorAll('atlui-tooltipcomponent');
    button[0].triggerEventHandler("mouseenter", {});
    button[1].triggerEventHandler("mouseenter", {});
    button[2].triggerEventHandler("mouseenter", {});
    button[3].triggerEventHandler("mouseenter", {});
    tick();
    fixture.detectChanges();

    assert.strictEqual(tooltip[0].classList[3], 'in');
    assert.strictEqual(tooltip[1].classList[3], 'in');
    assert.strictEqual(tooltip[2].classList[3], 'in');
    assert.strictEqual(tooltip[3].classList[3], 'in');


    button[0].triggerEventHandler("mouseleave", {});
    button[1].triggerEventHandler("mouseleave", {});
    button[2].triggerEventHandler("mouseleave", {});
    button[3].triggerEventHandler("mouseleave", {});
    tick();
    fixture.detectChanges();

    assert.strictEqual(tooltip[0].classList[3], void 0);
    assert.strictEqual(tooltip[1].classList[3], void 0);
    assert.strictEqual(tooltip[2].classList[3], void 0);
    assert.strictEqual(tooltip[3].classList[3], void 0);

  }));
});
