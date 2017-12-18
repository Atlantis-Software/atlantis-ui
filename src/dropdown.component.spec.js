import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import dropdownComponent from './dropdown.component.js';
import dropdownOptionComponent from './dropdown-option.component.js';
import dropdownHeaderComponent from './dropdown-header.component.js';
import dropdownDividerComponent from './dropdown-divider.component.js';

var assert = require('assert');

class dropdownTestComponent {
  constructor() {

  }
  static get annotations() {
    return [
      new Component({
        template: `
        <dropdown title="Menu A">
          <dropdown-option><a>Sub-menu A</a></dropdown-option>
          <dropdown-option><a>Sub-menu B</a></dropdown-option>
          <dropdown-option><a>Sub-menu C</a></dropdown-option>
          <dropdown-divider></dropdown-divider>
          <dropdown-header>menu</dropdown-header>
          <dropdown-option><a>Sub-menu separated B</a></dropdown-option>
        </dropdown>
        <dropdown orientation="up" title="Menu A">
        </dropdown>
        <dropdown alignement="right" title="Menu A">
        </dropdown>`
      })
    ];
  }
}

describe('dropdown', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [dropdownTestComponent, dropdownComponent, dropdownOptionComponent, dropdownHeaderComponent, dropdownDividerComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(function() {
    var fixture = TestBed.createComponent(dropdownTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var dropdown = document.querySelectorAll('dropdown');
    var dropdownMenu = document.querySelectorAll('.dropdown-menu');
    var options = dropdown[0].querySelectorAll('dropdown-option');
    var divider = dropdown[0].querySelector('dropdown-divider');
    var header = dropdown[0].querySelector('dropdown-header');

    assert.strictEqual(dropdown.length, 3);
    assert.strictEqual(dropdown[0].classList[0], 'dropdown');
    assert.strictEqual(dropdown[1].classList[0], 'dropup');
    assert.strictEqual(dropdown[2].classList[0], 'dropdown');

    assert.strictEqual(dropdownMenu[0].classList[1], void 0);
    assert.strictEqual(dropdownMenu[1].classList[1], void 0);
    assert.strictEqual(dropdownMenu[2].classList[1], 'dropdown-menu-right');

    assert.strictEqual(options.length, 4);
    assert.strictEqual(options[0].querySelector('a').textContent, "Sub-menu A");
    assert.strictEqual(options[0].classList[0], void 0);
    assert.strictEqual(options[1].querySelector('a').textContent, "Sub-menu B");
    assert.strictEqual(options[1].classList[0], void 0);
    assert.strictEqual(options[2].querySelector('a').textContent, "Sub-menu C");
    assert.strictEqual(options[2].classList[0], void 0);
    assert.strictEqual(options[3].querySelector('a').textContent, "Sub-menu separated B");
    assert.strictEqual(options[3].classList[0], void 0);

    assert.strictEqual(divider.classList[0], "divider");

    assert.strictEqual(header.classList[0], "dropdown-header");
    assert.strictEqual(header.textContent, "menu");

  }));

  it('should open then close when click on option', fakeAsync(function() {
    var fixture = TestBed.createComponent(dropdownTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var button = document.querySelector('button');
    button.click();
    tick();
    fixture.detectChanges();

    var dropdown = document.querySelector("dropdown");

    assert.strictEqual(dropdown.classList[1], "open");

    var option = document.querySelector('dropdown-option');
    option.click();
    tick();
    fixture.detectChanges();

    dropdown = document.querySelector("dropdown");

    assert.strictEqual(dropdown.classList[1], void 0);

  }));

});
