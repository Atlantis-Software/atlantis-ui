import { getTestBed, TestBed, async, fakeAsync, tick, DebugElement} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ngxAtlUiModule } from './ngx-atlantis-ui-module.js';

var assert = require('assert');

class slidepickerTestComponent {
  constructor() {
    this.arrayOneTwoThree = ["one", "two", "three"];
    this.one = 1;
    this.objetWithArray  = { fsdfds: 1, array: [1,2,3], texte: "test"};
    this.optionOne = {value: this.one, text: "one"};
    this.booleanFalse = false;
    this.A = "A";

    this.options = [
      {
        value: this.A,
        label: "AAAA"
      },
      {
        value: "B",
        label: "BBBB"
      },
      {
        value: "C",
        label: "CCCC"
      },
      {
        value: this.booleanFalse,
        label: "boolean test"
      },
      {
        value: this.one,
        label: "11111"
      },
      {
        value: this.arrayOneTwoThree,
        label: "one, two, three"
      },
      {
        value: this.objetWithArray,
        label: "object javascript"
      }
    ]
    this.slide = this.options[1];
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
//       imports: [CommonModule, FormsModule, ngxAtlUiModule.forRoot({})],
//       declarations: [slidepickerTestComponent]
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
//     assert.strictEqual(options.length, 7);
//     assert.strictEqual(options[0].textContent, 'AAAA');
//     assert.strictEqual(options[1].textContent, 'BBBB');
//     assert.strictEqual(options[2].textContent, 'CCCC');
//     assert.strictEqual(options[3].textContent, 'boolean test');
//     assert.strictEqual(options[4].textContent, '11111');
//     assert.strictEqual(options[5].textContent, 'one, two, three');
//     assert.strictEqual(options[6].textContent, 'object javascript');
//
//     var text = document.querySelector('#selected');
//
//     assert.strictEqual(testComponent.slide.value, 'B');
//     assert.strictEqual(testComponent.slide.label, 'BBBB');
//     assert.strictEqual(text.textContent, 'BBBB');
//   }));
//
//   it('should render selected value, string', fakeAsync(() => {
//     var fixture = TestBed.createComponent(slidepickerTestComponent);
//
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//
//     var testComponent = fixture.componentInstance;
//     var options = document.querySelectorAll('a');
//
//     options[0].click();
//     tick();
//     fixture.detectChanges();
//
//     var text = document.querySelector('#selected');
//
//     assert.strictEqual(testComponent.slide.value, 'A');
//     assert.strictEqual(testComponent.slide.label, 'AAAA');
//     assert.strictEqual(text.textContent, 'AAAA');
//   }));
//
//   it('should render selected value, boolean', fakeAsync(() => {
//     var fixture = TestBed.createComponent(slidepickerTestComponent);
//
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//
//     var testComponent = fixture.componentInstance;
//     var options = document.querySelectorAll('a');
//
//     options[3].click();
//     tick();
//     fixture.detectChanges();
//
//     var text = document.querySelector('#selected');
//
//     assert.strictEqual(testComponent.slide.value, false);
//     assert.strictEqual(testComponent.slide.label, 'boolean test');
//     assert.strictEqual(text.textContent, 'boolean test');
//   }));
//
//   it('should render selected value, number', fakeAsync(() => {
//     var fixture = TestBed.createComponent(slidepickerTestComponent);
//
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//
//     var testComponent = fixture.componentInstance;
//     var options = document.querySelectorAll('a');
//
//     options[4].click();
//     tick();
//     fixture.detectChanges();
//
//     var text = document.querySelector('#selected');
//
//     assert.strictEqual(testComponent.slide.value, 1);
//     assert.strictEqual(testComponent.slide.label, '11111');
//     assert.strictEqual(text.textContent, '11111');
//   }));
//
//   it('should render selected value, array', fakeAsync(() => {
//     var fixture = TestBed.createComponent(slidepickerTestComponent);
//
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//
//     var testComponent = fixture.componentInstance;
//     var options = document.querySelectorAll('a');
//
//     options[5].click();
//     tick();
//     fixture.detectChanges();
//
//     var text = document.querySelector('#selected');
//
//     assert.strictEqual(testComponent.slide.value, testComponent.arrayOneTwoThree);
//     assert.strictEqual(testComponent.slide.label, 'one, two, three');
//     assert.strictEqual(text.textContent, 'one, two, three');
//   }));
//
//   it('should render selected value, object', fakeAsync(() => {
//     var fixture = TestBed.createComponent(slidepickerTestComponent);
//
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//
//     var testComponent = fixture.componentInstance;
//     var options = document.querySelectorAll('a');
//
//     options[6].click();
//     tick();
//     fixture.detectChanges();
//
//     var text = document.querySelector('#selected');
//
//     assert.strictEqual(testComponent.slide.value, testComponent.objetWithArray);
//     assert.strictEqual(testComponent.slide.label, 'object javascript');
//     assert.strictEqual(text.textContent, 'object javascript');
//   }));
//
//   it('should render selected value when handle click and mouse up', fakeAsync(() => {
//     var fixture = TestBed.createComponent(slidepickerTestComponent);
//
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//
//     var testComponent = fixture.componentInstance;
//     var handle = fixture.debugElement.query(By.css('.slidepicker-handle'));
//
//     handle.triggerEventHandler("mousedown", {});
//     tick();
//     fixture.detectChanges();
//     handle.triggerEventHandler("mousemove", {pageX: 0, pageY: 74});
//     tick();
//     fixture.detectChanges();
//     handle.triggerEventHandler("mouseup", {});
//     var text = document.querySelector('#selected');
//
//     assert.strictEqual(testComponent.slide.value, testComponent.objetWithArray);
//     assert.strictEqual(testComponent.slide.label, 'object javascript');
//     assert.strictEqual(text.textContent, 'object javascript');
//   }));
// });
