import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ngxAtlUiModule } from './ngx-atlantis-ui-module.js';

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
        <div id="data">{{testDate}}</div>`
	  	})
		];
	}
}

// var datepickerModuleTest = function() {};



// datepickerModuleTest.annotations = [
//   new NgModule({
//     imports: [CommonModule, FormsModule],
//     declarations: [datepickerComponent, selectpickerComponent, selectpickeroptionComponent, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, backdropComponent],
//     entryComponents: [backdropComponent]
//   })
// ];


describe('datepicker', function() {
  var testComponent;

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [ngxAtlUiModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [datepickerTestComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var text = document.querySelector('#data');

    assert.strictEqual(text.textContent, new Date('02/03/2004').toString());
  }));
});
