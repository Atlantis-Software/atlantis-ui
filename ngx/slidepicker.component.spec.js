import { getTestBed, TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {slidepickerComponent} from './slidepicker.component.js';
import {slidepickerOptionComponent} from './slidepicker.component.js';

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
    this.slide = this.a;
  }
	static get annotations() {
		return [
			new Component({
        template: `
        <slidepicker [(ngModel)]="slide" class="slidepicker slidepicker-vertical">
          <slidepicker-option *ngFor="let option of options" [value]="option">{{option.label}}</slidepicker-option>
        </slidepicker>
        <span id="selected">{{slide.label}}</span>
        `
	  	})
		];
	}
}

// describe('slidepicker', function() {
//   var testComponent;
//
//   beforeEach(async(function() {
//     TestBed.configureTestingModule({
//       imports: [CommonModule, FormsModule],
//       declarations: [slidepickerTestComponent, slidepickerComponent, slidepickerOptionComponent]
//     });
//     TestBed.compileComponents();
//   }));
//
//   afterEach(function() {
//     getTestBed().resetTestingModule();
//   });
//
//   it('should render default value and available options', fakeAsync(() => {
//     var fixture = TestBed.createComponent(slidepickerTestComponent);
//
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//
//     var testComponent = fixture.componentInstance;
//     var options = document.querySelectorAll('a');
//
//     assert.strictEqual(options.length, 3, 'should render 3 options');
//     assert.strictEqual(options[0].textContent, 'A', 'first option should contain `A`');
//     assert.strictEqual(options[1].textContent, 'B', 'second option should contain `B`');
//     assert.strictEqual(options[2].textContent, 'C', 'third option should contain `C`');
//
//     var text = document.querySelector('#selected');
//
//     assert.strictEqual(testComponent.slide.value, 'a');
//     assert.strictEqual(testComponent.slide.label, 'A');
//     assert.strictEqual(text.textContent, 'A');
//   }));
//
//   it('should render selected value', fakeAsync(() => {
//     var fixture = TestBed.createComponent(slidepickerTestComponent);
//
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//
//     var testComponent = fixture.componentInstance;
//     var options = document.querySelectorAll('a');
//
//     options[1].click();
//     tick();
//     fixture.detectChanges();
//
//     var text = document.querySelector('#selected');
//     console.log('LNEMKFEIJNE : ', text);
//
//     assert.strictEqual(testComponent.slide.value, 'b');
//     assert.strictEqual(testComponent.slide.label, 'B');
//     assert.strictEqual(text.textContent, 'B');
//   }));
// });
