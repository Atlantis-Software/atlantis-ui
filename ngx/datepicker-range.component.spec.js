import { getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import datepickerRangeComponent from './datepicker-range.component.js';
import atlModelDirective from './atlmodel.directive.js';

var assert = require('assert');

class datepickerRangeTestComponent {
  constructor() {
    var date = new Date('02/03/2004');
    this.testDate = date;
  }
	static get annotations() {
		return [
			new Component({
        template: `<datepicker-range [(start)]="startDate" [(end)]="endDate"></datepicker-range>
        <div id="data" (ngModel)="testDate"></div>`
	  	})
		];
	}
}

describe('datepicker-range', function() {
  var testComponent;

  beforeEach(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [datepickerRangeTestComponent, datepickerRangeComponent, atlModelDirective]
    });
    TestBed.compileComponents();
  });

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render actual value and available options', function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var text = document.querySelector('#data');
  });
});
