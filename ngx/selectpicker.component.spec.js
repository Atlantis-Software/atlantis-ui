import { getTestBed, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
    this.objetWithArray = { fsdfds: 1, array: [1, 2, 3], texte: "test" };
    this.optionOne = { value: this.one, text: "one" };
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
    ];
    this.select1 = this.options[1];
    this.select2 = [this.options[1], this.options[2]];
    this.select3;
  }
  static get annotations() {
    return [
      new Component({
        template: `<selectpicker [(ngModel)]="select1">
          <selectpicker-option *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
        <span id="selected">{{select1.label}}</span>
        <selectpicker [(ngModel)]="select2" multiple="true">
          <selectpicker-option *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
        <span id="selected2">{{select2.label}}</span>
        <selectpicker [(ngModel)]="select3" multiple="true">
          <selectpicker-option class="multipleEmpty" *ngFor="let option of options" [value]="option">{{option.label}}</selectpicker-option>
        </selectpicker>
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
    var select = document.querySelector('selectpicker');
    var options = select.querySelectorAll('a');

    assert.strictEqual(options.length, 7);
    assert.strictEqual(options[0].textContent, 'AAAA');
    assert.strictEqual(options[1].textContent, 'BBBB');
    assert.strictEqual(options[2].textContent, 'CCCC');
    assert.strictEqual(options[3].textContent, 'boolean test');
    assert.strictEqual(options[4].textContent, '11111');
    assert.strictEqual(options[5].textContent, 'one, two, three');
    assert.strictEqual(options[6].textContent, 'object javascript');

    text = document.querySelector('#selected');

    assert.strictEqual(testComponent.select1.value, 'B');
    assert.strictEqual(testComponent.select1.label, 'BBBB');
    assert.strictEqual(text.textContent, 'BBBB');
    assert.strictEqual(testComponent.select2[0].value, 'B');
    assert.strictEqual(testComponent.select2[0].label, 'BBBB');
    assert.strictEqual(testComponent.select2[1].value, 'C');
    assert.strictEqual(testComponent.select2[1].label, 'CCCC');
  }));

  it('should open on click and close on reclick', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var button = document.querySelector('.select-toggle');

    button.click();
    tick();
    fixture.detectChanges();

    var select = document.querySelector('.select');

    assert.strictEqual(select.classList[1], 'open');

    button.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(select.classList[1], void 0);

  }));

  it('should render selected value, string', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var options = document.querySelectorAll('a');

    options[0].click();
    tick();
    fixture.detectChanges();

    var text = document.querySelector('#selected');

    assert.strictEqual(testComponent.select1.value, 'A');
    assert.strictEqual(testComponent.select1.label, 'AAAA');
    assert.strictEqual(text.textContent, 'AAAA');
  }));

  it('should render selected value, boolean', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var options = document.querySelectorAll('a');

    options[3].click();
    tick();
    fixture.detectChanges();

    var text = document.querySelector('#selected');

    assert.strictEqual(testComponent.select1.value, false);
    assert.strictEqual(testComponent.select1.label, 'boolean test');
    assert.strictEqual(text.textContent, 'boolean test');
  }));

  it('should render selected value, number', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var options = document.querySelectorAll('a');

    options[4].click();
    tick();
    fixture.detectChanges();

    var text = document.querySelector('#selected');

    assert.strictEqual(testComponent.select1.value, 1);
    assert.strictEqual(testComponent.select1.label, '11111');
    assert.strictEqual(text.textContent, '11111');
  }));

  it('should render selected value, array', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var options = document.querySelectorAll('a');

    options[5].click();
    tick();
    fixture.detectChanges();

    var text = document.querySelector('#selected');

    assert.strictEqual(testComponent.select1.value, testComponent.arrayOneTwoThree);
    assert.strictEqual(testComponent.select1.label, 'one, two, three');
    assert.strictEqual(text.textContent, 'one, two, three');
  }));

  it('should render selected value, object', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var options = document.querySelectorAll('a');

    options[6].click();
    tick();
    fixture.detectChanges();

    var text = document.querySelector('#selected');

    assert.strictEqual(testComponent.select1.value, testComponent.objetWithArray);
    assert.strictEqual(testComponent.select1.label, 'object javascript');
    assert.strictEqual(text.textContent, 'object javascript');
  }));

  it('should render selected value, multiple selection with ctrl key', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var select = document.querySelectorAll('selectpicker');
    var options = select[1].querySelectorAll('a');

    var click = new Event("click", { 'bubbles': true });
    click.ctrlKey = true;

    options[0].dispatchEvent(click);
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.select2.length, 3);
    assert.strictEqual(testComponent.select2[0].value, "B");
    assert.strictEqual(testComponent.select2[0].label, 'BBBB');
    assert.strictEqual(testComponent.select2[1].value, "C");
    assert.strictEqual(testComponent.select2[1].label, 'CCCC');
    assert.strictEqual(testComponent.select2[2].value, "A");
    assert.strictEqual(testComponent.select2[2].label, 'AAAA');
  }));

  it('should render selected value, toggle selection with ctrl key', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var select = document.querySelectorAll('selectpicker');
    var options = select[1].querySelectorAll('a');

    var click = new Event("click", { 'bubbles': true });
    click.ctrlKey = true;

    options[0].dispatchEvent(click);
    tick();
    fixture.detectChanges();

    options[0].dispatchEvent(click);
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.select2.length, 2);
    assert.strictEqual(testComponent.select2[0].value, "B");
    assert.strictEqual(testComponent.select2[0].label, 'BBBB');
    assert.strictEqual(testComponent.select2[1].value, "C");
    assert.strictEqual(testComponent.select2[1].label, 'CCCC');

  }));

  it('should render selected value, multiple selection with shift key', fakeAsync(() => {
    var fixture = TestBed.createComponent(selectpickerTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;

    var button = document.querySelectorAll('.select-toggle');

    button[2].click();
    tick();
    fixture.detectChanges();

    var selectpicker = document.querySelectorAll("selectpicker");
    var options = selectpicker[2].querySelectorAll("a");

    options[0].click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.select3[0].value, "A");
    assert.strictEqual(testComponent.select3[0].label, 'AAAA');

    var click = new Event("click", { 'bubbles': true });
    click.shiftKey = true;

    options[2].dispatchEvent(click);
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.select3[0].value, "C");
    assert.strictEqual(testComponent.select3[0].label, 'CCCC');
    assert.strictEqual(testComponent.select3[1].value, "A");
    assert.strictEqual(testComponent.select3[1].label, 'AAAA');
    assert.strictEqual(testComponent.select3[2].value, "B");
    assert.strictEqual(testComponent.select3[2].label, 'BBBB');
  }));


});
