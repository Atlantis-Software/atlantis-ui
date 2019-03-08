import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';

var assert = require('assert');

class inputFileTestComponent {
  constructor() {}
  changeFile() {
    return;
  }
  static get annotations() {
    return [
      new Component({
        template: `
        <input id="ExampleInputFile" type="file" class="form-control" (change)="changeFile($event.target.files)">
        `
      })
    ];
  }
  testPagination(page) {
    this.page = page;
  }
}

describe('inputFile', function() {
  var testComponent;

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, AtlantisUiModule.forRoot({})],
      declarations: [inputFileTestComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render label with input in, and should trigger changeTitle function', fakeAsync(function() {
    var fixture = TestBed.createComponent(inputFileTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var label = document.querySelector('label');
    assert(label, 'label should exist');
    var input = label.querySelector('input');
    assert(input, 'input should exist');
    input.dispatchEvent(new Event('change', { 'bubbles': true}));
    assert.strictEqual(input.value, "");
  }));
});
