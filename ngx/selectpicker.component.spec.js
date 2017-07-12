import { getTestBed, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component, ViewEncapsulation } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import selectpickerComponent from './selectpicker.component.js';
import selectpickerOptionComponent from './selectpicker-option.component.js';
import atlModelDirective from './atlmodel.directive.js';

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
        template: `
        <selectpicker [(ngModel)]="select">
          <selectpicker-option *ngFor="let option of options" [value]="option.value">{{option.label}}</selectpicker-option>
        </selectpicker>
        <div id="data" (ngModel)="select"></div>
        `,
	  	})
		];
	}
}

describe('selectpicker', function() {
  var testComponent;

  beforeEach(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [selectpickerTestComponent, selectpickerComponent, selectpickerOptionComponent, atlModelDirective]
    });
    TestBed.compileComponents();
  });

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render actual value and available options', function() {
    var fixture = TestBed.createComponent(selectpickerTestComponent);
    fixture.detectChanges();
    var testComponent = fixture.componentInstance;
    var text = document.querySelector('.select-text');
    var binding = document.querySelector('#data');
    var button = document.querySelector('button');
    var options = document.querySelectorAll('a');

    assert.equal(options.length, 3, 'should render 3 options');
    assert.equal(options[0].textContent, 'A', 'first option should contain `A`');
    assert.equal(options[1].textContent, 'B', 'second option should contain `B`');
    assert.equal(options[2].textContent, 'C', 'third option should contain `C`');
    button.click();
    fixture.detectChanges();
    var options = document.querySelectorAll('a');

    options[1].click();
    fixture.detectChanges();
    var text = document.querySelector('.select-text');
    assert.equal(text.textContent, 'A');
  });
});
