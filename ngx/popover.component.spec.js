import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ngxAtlUiModule } from './ngx-atlantis-ui-module.js';

var assert = require('assert');

class popoverTestComponent {
  constructor() {}
  static get annotations() {
    return [
      new Component({
        template: `
        <button type="button" class="btn btn-default" popover popoverDirection="left" popoverTitle="test1" popoverContent="test1">
          Popover on left
        </button>

        <button type="button" class="btn btn-default" popover popoverDirection="top" popoverTitle="test2" popoverContent="test2">
          Popover on top
        </button>

        <button type="button" class="btn btn-default" popover popoverDirection="bottom" popoverTitle="test3" popoverContent="test3">
          Popover on bottom
        </button>

        <button type="button" class="btn btn-default" popover popoverDirection="right" popoverTitle="test4" popoverContent="test4">
          Popover on right
        </button>`
      })
    ];
  }
}

describe('popover', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ngxAtlUiModule.forRoot({})],
      declarations: [popoverTestComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(() => {
    var fixture = TestBed.createComponent(popoverTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var popover = document.querySelectorAll('popovercomponent');
    var title = document.querySelectorAll('h3');
    var content = document.querySelectorAll('.popover-content');

    assert.strictEqual(popover.length, 4);
    assert.strictEqual(popover[0].classList[2], 'left');
    assert.strictEqual(popover[1].classList[2], 'top');
    assert.strictEqual(popover[2].classList[2], 'bottom');
    assert.strictEqual(popover[3].classList[2], 'right');

    assert.strictEqual(title.length, 4);
    assert.strictEqual(title[0].textContent, 'test1');
    assert.strictEqual(title[1].textContent, 'test2');
    assert.strictEqual(title[2].textContent, 'test3');
    assert.strictEqual(title[3].textContent, 'test4');

    assert.strictEqual(content.length, 4);
    assert.strictEqual(content[0].textContent, 'test1');
    assert.strictEqual(content[1].textContent, 'test2');
    assert.strictEqual(content[2].textContent, 'test3');
    assert.strictEqual(content[3].textContent, 'test4');
  }));

  it('should open on click then close on reclick', fakeAsync(() => {
    var fixture = TestBed.createComponent(popoverTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var button = document.querySelectorAll('button');
    button[0].click();
    button[1].click();
    button[2].click();
    button[3].click();
    tick();
    fixture.detectChanges();

    var popover = document.querySelectorAll('popovercomponent');

    assert.strictEqual(popover.length, 4);
    assert.strictEqual(popover[0].classList[3], 'in');
    assert.strictEqual(popover[1].classList[3], 'in');
    assert.strictEqual(popover[2].classList[3], 'in');
    assert.strictEqual(popover[3].classList[3], 'in');

    button = document.querySelectorAll('button');
    button[0].click();
    button[1].click();
    button[2].click();
    button[3].click();
    tick();
    fixture.detectChanges();

    popover = document.querySelectorAll('popovercomponent');

    assert.strictEqual(popover.length, 4);
    assert.strictEqual(popover[0].classList[3], void 0);
    assert.strictEqual(popover[1].classList[3], void 0);
    assert.strictEqual(popover[2].classList[3], void 0);
    assert.strictEqual(popover[3].classList[3], void 0);

  }));
});
