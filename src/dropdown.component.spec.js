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
        <atlui-dropdown title="Menu A">
          <atlui-dropdown-option><a>Sub-menu A</a></atlui-dropdown-option>
          <atlui-dropdown-option><a>Sub-menu B</a></atlui-dropdown-option>
          <atlui-dropdown-option><a>Sub-menu C</a></atlui-dropdown-option>
          <atlui-dropdown-divider></atlui-dropdown-divider>
          <atlui-dropdown-header>menu</atlui-dropdown-header>
          <atlui-dropdown-option><a>Sub-menu separated B</a></atlui-dropdown-option>
        </atlui-dropdown>
        <atlui-dropdown orientation="up" title="Menu A" autoOpen="true">
        </atlui-dropdown>
        <atlui-dropdown alignement="right" title="Menu A">
        </atlui-dropdown>
        <ul>
          <li>
            <atlui-dropdown title="Menu A">
            </atlui-dropdown>
          </li>
        </ul>`
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

    var dropdown = document.querySelectorAll('atlui-dropdown');
    var dropdownMenu = document.querySelectorAll('.dropdown-menu');
    var options = dropdown[0].querySelectorAll('atlui-dropdown-option');
    var divider = dropdown[0].querySelector('atlui-dropdown-divider');
    var header = dropdown[0].querySelector('atlui-dropdown-header');

    assert.strictEqual(dropdown.length, 4);
    assert.strictEqual(dropdown[0].classList[0], 'dropdown');
    assert.strictEqual(dropdown[1].classList[0], 'dropup');
    assert.strictEqual(dropdown[2].classList[0], 'dropdown');
    assert.strictEqual(dropdown[3].classList[0], 'dropdown');


    assert.strictEqual(dropdownMenu[0].classList[1], void 0);
    assert.strictEqual(dropdownMenu[1].classList[1], void 0);
    assert.strictEqual(dropdownMenu[2].classList[1], 'dropdown-menu-right');
    assert.strictEqual(dropdownMenu[3].classList[1], void 0);

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

    var dropdown = document.querySelector("atlui-dropdown");

    assert.strictEqual(dropdown.classList[1], "open");

    var option = document.querySelector('atlui-dropdown-option');
    option.click();
    tick();
    fixture.detectChanges();

    dropdown = document.querySelector("atlui-dropdown");

    assert.strictEqual(dropdown.classList[1], void 0);

  }));

  it('should render the correct element according to the parent HTML element', fakeAsync(function() {
    var fixture = TestBed.createComponent(dropdownTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var dropdown = document.querySelectorAll("atlui-dropdown");
    assert.strictEqual(dropdown[3].firstElementChild.nodeName, "A");
    assert.strictEqual(dropdown[0].firstElementChild.nodeName, "BUTTON");

  }));

  it('should check the autoOpen class', fakeAsync(function() {
    var fixture = TestBed.createComponent(dropdownTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var dropdown = document.querySelectorAll("atlui-dropdown")[1];
    var button = dropdown.querySelector('button');
    let event = new Event('mouseenter');
    button.dispatchEvent(event);
    tick();
    fixture.detectChanges();

    dropdown = document.querySelectorAll("atlui-dropdown")[1];
    assert.strictEqual(dropdown.classList[1], "open");

    event = new Event('mouseleave');
    button.dispatchEvent(event);
    tick();
    fixture.detectChanges();

    dropdown = document.querySelectorAll("atlui-dropdown")[1];
    assert.strictEqual(dropdown.classList[1], undefined);


  }));

});


