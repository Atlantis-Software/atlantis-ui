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
    this.select1 = this.options[1];
    this.select2 = [this.options[1], this.options[2]]
  }
	static get annotations() {
		return [
			new Component({
        template: `<selectpicker [(ngModel)]="select">
          <selectpicker-option *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
        <span id="selected">{{slide.label}}</span>
        <selectpicker [(ngModel)]="select2" multiple="true">
          <selectpicker-option *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
        <span id="selected">{{slide.label}}</span>
        <selectpicker [(ngModel)]="select3">
          <selectpicker-option *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
        <span id="selected">{{slide.label}}</span>
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

  it('should render actual value and available options', fakeAsync(function() {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    testComponent = fixture.componentInstance;

    var text = document.querySelector('.select-text');
    var options = document.querySelectorAll('a');

    assert.strictEqual(options.length, 7);
    assert.strictEqual(options[0].textContent, 'AAAA');
    assert.strictEqual(options[1].textContent, 'BBBB');
    assert.strictEqual(options[2].textContent, 'CCCC');
    assert.strictEqual(options[3].textContent, 'boolean test');
    assert.strictEqual(options[4].textContent, '11111');
    assert.strictEqual(options[5].textContent, 'one, two, three');
    assert.strictEqual(options[6].textContent, 'object javascript');

    var text = document.querySelector('#selected');

    assert.strictEqual(testComponent.slide.value, 'B');
    assert.strictEqual(testComponent.slide.label, 'BBBB');
    assert.strictEqual(text.textContent, 'BBBB');
  }));


});
