import { getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import slidepickerComponent from './slidepicker.component.js';
import slidepickerOptionComponent from './slidepicker-option.component.js';
import atlModelDirective from './atlmodel.directive.js';

var assert = require('assert');

class slidepickerTestComponent {
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
    this.testData = this.b;
  }
	static get annotations() {
		return [
			new Component({
        template: `
        <link rel='stylesheet' href='/base/dist/css/atlantis-ui.css'/>
        <slidepicker [(ngModel)]="testData" class="slidepicker slidepicker-vertical">
          <slidepicker-option *ngFor="let option of options" value="option.value">{{option.label}}</slidepicker-option>
        </slidepicker>
        <div id="data" (ngModel)="testData"></div>`
	  	})
		];
	}
}

describe('slidepicker', function() {
  var testComponent;

  beforeEach(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [slidepickerTestComponent, slidepickerComponent, slidepickerOptionComponent, atlModelDirective]
    });
    TestBed.compileComponents();
  });

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render actual value and available options', function() {
    var fixture = TestBed.createComponent(slidepickerTestComponent);
    fixture.detectChanges();

    testComponent = fixture.componentInstance;
    var text = document.querySelector('#data');
  });
});
