import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';

var assert = require('assert');

class datepickerTestComponent {
  constructor() {
    this.testDate = moment('2004-02-03').format("YYYY-MM-DD");
    this.noDate;
  }
  static get annotations() {
    return [
      new Component({
        template: `<atlui-datepicker id="datepicker" [(ngModel)]="testDate"></atlui-datepicker>
        <div id="data">{{testDate}}</div>
        <atlui-datepicker [(ngModel)]="noDate" [numberOfMonths]="5"></atlui-datepicker>
        <div id="data2">{{noDate}}</div>`
      })
    ];
  }
}

describe('datepicker', function() {
  this.timeout(4000);

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [AtlantisUiModule.forRoot(), FormsModule],
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
    var datepicker = document.querySelector('#data');
    var datepicker2 = document.querySelector('#data2');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment('2004-02-03').toString());
    assert.strictEqual(moment(datepicker2.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment().startOf('day').toString());
  }));

  it('should render correct value into input datepicker modal', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    input = document.querySelectorAll("input")[1];

    assert.strictEqual(moment(input.value, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment('2004-02-03').toString());

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

  }));

  it('should render correct number of month', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var months = document.querySelectorAll("atlui-datepicker")[0].querySelectorAll(".calendar.calendar");

    assert.strictEqual(months.length, 3);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    input = document.querySelectorAll('input')[1];
    input.click();
    tick();
    fixture.detectChanges();

    months = document.querySelectorAll("atlui-datepicker")[1].querySelectorAll(".calendar.calendar");

    assert.strictEqual(months.length, 5);

    closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

  }));

  it('should render new value when click on other date', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var firstAvailable = document.querySelector('.available');
    firstAvailable.click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2004-02-01").toString());

  }));

  it('should render previous month when click prev arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var prevArrow = document.querySelector('.prev.arrow');
    prevArrow.click();
    tick();
    fixture.detectChanges();

    var firstAvailable = document.querySelector('.available');
    firstAvailable.click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2004-01-01").toString());
    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render next month when click next arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var prevArrow = document.querySelector('.next.arrow');
    prevArrow.click();
    tick();
    fixture.detectChanges();

    var firstAvailable = document.querySelector('.available');
    firstAvailable.click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2004-03-01").toString());
    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render today in value when choose today in selectList', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var select = document.querySelector('.select');
    select.click();
    tick();
    fixture.detectChanges();

    var today = document.querySelector('li');
    today.click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render today in value when choose last week in selectList', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var select = document.querySelector('.select');
    select.click();
    tick();
    fixture.detectChanges();

    var selectOptions = document.querySelectorAll('li');
    selectOptions[1].click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().subtract(1, 'weeks').startOf('isoweek').format('YYYY-MM-DD'));
    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render today in value when choose last month in selectList', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var select = document.querySelector('.select');
    select.click();
    tick();
    fixture.detectChanges();

    var selectOptions = document.querySelectorAll('li');
    selectOptions[2].click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'));
    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render today in value when choose last 7 day in selectList', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var select = document.querySelector('.select');
    select.click();
    tick();
    fixture.detectChanges();

    var selectOptions = document.querySelectorAll('li');
    selectOptions[3].click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().subtract(1, 'weeks').format('YYYY-MM-DD'));
    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render today in value when choose last 30 day in selectList', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var select = document.querySelector('.select');
    select.click();
    tick();
    fixture.detectChanges();

    var selectOptions = document.querySelectorAll('li');
    selectOptions[4].click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().subtract(1, 'months').format('YYYY-MM-DD'));
    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render today in value when choose last year in selectList', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var select = document.querySelector('.select');
    select.click();
    tick();
    fixture.detectChanges();

    var selectOptions = document.querySelectorAll('li');
    selectOptions[5].click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD'));
    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render same value when click on off date', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var off = document.querySelector(".off");
    off.click();
    tick();
    fixture.detectChanges();

    var datepicker = document.querySelector('#data');

    assert.strictEqual(moment(datepicker.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment("2004-02-03").format('YYYY-MM-DD'));

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();
  }));
});
