import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import circleProgessBarComponent from './circle-progress-bar.component.js';

var assert = require('assert');

class circleProgessBarTestComponent {
  constructor() {
    this.test = 50;
  }
	static get annotations() {
		return [
			new Component({
        template: `
        <circle-progress-bar [value]="test">
        </circle-progress-bar>
        <input id="percent" type="number" [(ngModel)]="test">`
	  	})
		];
	}
}

// describe('Circle progress bar', function() {
//   var testComponent;
//
//   beforeEach(async(function() {
//     TestBed.configureTestingModule({
//       imports: [CommonModule, FormsModule],
//       declarations: [circleProgessBarTestComponent, circleProgessBarComponent]
//     });
//     TestBed.compileComponents();
//   }));
//
//   afterEach(function() {
//     getTestBed().resetTestingModule();
//   });
//
//   it('should render default value and available options', fakeAsync(function() {
//     var fixture = TestBed.createComponent(circleProgessBarTestComponent);
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//     testComponent = fixture.componentInstance;
//     var percent = document.querySelector('.circle-progress-bar');
//
//     assert.strictEqual(percent.dataset.percent, "50")
//   }));
//
//   it('should render selected value', fakeAsync(function() {
//     var fixture = TestBed.createComponent(circleProgessBarTestComponent);
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//     testComponent = fixture.componentInstance;
//     testComponent.test = 75;
//     tick();
//     fixture.detectChanges();
//
//     var percent = document.querySelector('.circle-progress-bar');
//
//     assert.strictEqual(percent.dataset.percent, "75")
//
//   }));
//
// });
