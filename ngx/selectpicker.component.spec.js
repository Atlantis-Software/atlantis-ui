import { getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import selectpickerComponent from './selectpicker.component.js';
import selectpickeroptionComponent from './selectpicker-option.component.js';

var assert = require('assert');

class selectpickerTestComponent {
  constructor() {
    this.a = {
      value: 'a',
      label: 'A'
    };
    this.b = {
      value: 'b',
      label: 'B'
    };
    this.c = {
      value: 'c',
      label: 'C'
    };
    this.options = [this.a, this.b, this.c];
    this.select = this.a;
  }
	static get annotations() {
		return [
			new Component({
        template: `<selectpicker [(ngModel)]="select">
        <selectpicker-option *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
        `
	  	})
		];
	}
}

describe('selectpicker', function() {
  var testComponent;

  beforeEach(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [selectpickerTestComponent, selectpickerComponent, selectpickeroptionComponent]
    });
    TestBed.compileComponents();
  });

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render actual value and available options', function(done) {
    var fixture = TestBed.createComponent(selectpickerTestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var text = document.querySelector('.select-text');
    var options = document.querySelectorAll('a');

    assert.equal(options.length, 3, 'should render 3 options');
    assert.equal(options[0].textContent, 'A', 'first option should contain `A`');
    assert.equal(options[1].textContent, 'B', 'second option should contain `B`');
    assert.equal(options[2].textContent, 'C', 'third option should contain `C`');
    done();
  });
});
