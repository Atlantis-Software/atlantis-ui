import { getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import datepickerComponent from './datepicker.component.js';
import atlModelDirective from './atlmodel.directive.js';

var assert = require('assert');

class datepickerTestComponent {
  constructor() {
    var date = new Date('02/03/2004');
    this.testDate = date;
  }
	static get annotations() {
		return [
			new Component({
        template: `<datepicker [(ngModel)]="testDate"></datepicker>
        <div id="data" (ngModel)="testDate"></div>`
	  	})
		];
	}
}

// describe('datepicker', function() {
//   var testComponent;
//
//   beforeEach(function() {
//     TestBed.configureTestingModule({
//       imports: [CommonModule, FormsModule],
//       declarations: [datepickerTestComponent, datepickerComponent, atlModelDirective]
//     });
//     TestBed.compileComponents();
//   });
//
//   afterEach(function() {
//     getTestBed().resetTestingModule();
//   });
//
//   it('should render actual value and available options', function() {
//     var fixture = TestBed.createComponent(datepickerTestComponent);
//     fixture.detectChanges();
//     testComponent = fixture.componentInstance;
//     var text = document.querySelector('#data');
//   });
// });
