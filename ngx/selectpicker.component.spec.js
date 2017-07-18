import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component, ComponentFactoryResolver } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import selectpickerComponent from './selectpicker.component.js';
import selectpickerOptionComponent from './selectpicker-option.component.js';

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
          <selectpicker-option *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
        `,
	  	})
		];
	}
}

class selectpickerMultipleTestComponent {
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
    this.select = [this.a, this.b];
  }
	static get annotations() {
		return [
			new Component({
        template: `
        <selectpicker [(ngModel)]="select" multiple="true">
          <selectpicker-option *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
        `,
	  	})
		];
	}
}

describe('selectpicker', function() {
  var testComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [selectpickerTestComponent, selectpickerMultipleTestComponent, selectpickerComponent, selectpickerOptionComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var options = document.querySelectorAll('a');

    assert.strictEqual(options.length, 3, 'should render 3 options');
    assert.strictEqual(options[0].textContent, 'A', 'first option should contain `A`');
    assert.strictEqual(options[1].textContent, 'B', 'second option should contain `B`');
    assert.strictEqual(options[2].textContent, 'C', 'third option should contain `C`');

    var text = document.querySelector('.select-text');
    assert.strictEqual(testComponent.select.value, 'a');
    assert.strictEqual(testComponent.select.label, 'A');
    assert.strictEqual(text.textContent, 'A');
  }));

  it('should render selected value', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);
    fixture.detectChanges();

    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var button = document.querySelector('button');

    button.click();
    tick();
    fixture.detectChanges();
    var options = document.querySelectorAll('a');

    options[1].click();
    tick();
    fixture.detectChanges();

    var text = document.querySelector('.select-text');
    assert.strictEqual(testComponent.select.value, 'b');
    assert.strictEqual(testComponent.select.label, 'B');
    assert.strictEqual(text.textContent, 'B');
  }));

  it('should render multiple default values and available options', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerMultipleTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var options = document.querySelectorAll('a');

    assert.strictEqual(options.length, 3, 'should render 3 options');
    assert.strictEqual(options[0].textContent, 'A', 'first option should contain `A`');
    assert.strictEqual(options[1].textContent, 'B', 'second option should contain `B`');
    assert.strictEqual(options[2].textContent, 'C', 'third option should contain `C`');

    var text = document.querySelector('.select-text');
    assert.strictEqual(testComponent.select.length, 2);
    assert.strictEqual(testComponent.select[0].value, 'a');
    assert.strictEqual(testComponent.select[0].label, 'A');
    assert.strictEqual(testComponent.select[1].value, 'b');
    assert.strictEqual(testComponent.select[1].label, 'B');
    assert.strictEqual(text.textContent, 'A,B');
  }));

  it('should render multiple selected values', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerMultipleTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var options = document.querySelectorAll('a');

    var button = document.querySelector('button');

    button.click();
    tick();
    fixture.detectChanges();
    var options = document.querySelectorAll('a');

    options[0].click();
    tick();
    fixture.detectChanges();
    options[2].click();
    tick();
    fixture.detectChanges();

    var text = document.querySelector('.select-text');
    assert.strictEqual(testComponent.select.length, 2);
    assert.strictEqual(testComponent.select[0].value, 'b');
    assert.strictEqual(testComponent.select[0].label, 'B');
    assert.strictEqual(testComponent.select[1].value, 'c');
    assert.strictEqual(testComponent.select[1].label, 'C');
    assert.strictEqual(text.textContent, 'B,C');
  }));
});
