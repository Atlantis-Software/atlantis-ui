import { getTestBed, TestBed, async, fakeAsync, tick , flush} from '@angular/core/testing';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';

var assert = require('assert');

class datepickerRangeTestComponent {
  constructor() {
    this.startDate = "2021-08-22T22:00:00.000Z";
    this.endDate = "30/08/2021";
  }
  static get annotations() {
    return [
      new Component({
        template: `<atlui-datepicker-range id="datepicker" [(start)]="startDate" [(end)]="endDate"></atlui-datepicker-range>
        <div id="dataStart">{{startDate}}</div>
        <div id="dataEnd">{{endDate}}</div>
        <atlui-datepicker-range [(start)]="noDateStart" [(end)]="noDateEnd" [numberOfMonths]="5"></atlui-datepicker-range>
        <div id="data2Start">{{noDateStart}}</div>
        <div id="data2End">{{noDateEnd}}</div>`
      })
    ];
  }
}


describe('datepicker-range', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [AtlantisUiModule.forRoot(), FormsModule],
      declarations: [datepickerRangeTestComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    var backdrop = document.querySelector('backdrop');
    if (backdrop) {
      backdrop.parentNode.removeChild(backdrop);
    }
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var datepicker2Start = document.querySelector('#data2Start');
    var datepicker2End = document.querySelector('#data2End');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent).toString(), moment('2021-08-23').toString());
    assert.strictEqual(moment(datepickerEnd.textContent).toString(), moment('2021-08-30').toString());
    assert.strictEqual(datepicker2Start.textContent, "");
    assert.strictEqual(datepicker2End.textContent, "");
  }));

  it('should render correct value into input datepicker modal', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var inputStart = document.querySelectorAll(".atlui-datepicker-range input")[0];
    var inputEnd = document.querySelectorAll(".atlui-datepicker-range input")[1];
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(inputStart.value, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment('2021-08-23').toString());
    assert.strictEqual(moment(inputEnd.value, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment('2021-08-30').toString());

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

  }));

  it('should render correct number of month', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('atlui-datepicker-range')[0].querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var months = document.querySelectorAll('.atlui-datepicker-range')[0].querySelectorAll(".calendar.calendar");

    assert.strictEqual(months.length, 3);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    input = document.querySelectorAll('atlui-datepicker-range')[1].querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    months = document.querySelectorAll('.atlui-datepicker-range')[1].querySelectorAll(".calendar.calendar");

    assert.strictEqual(months.length, 5);

    closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

  }));

  it('should render new value when click on other date', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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

    var secondAvailable = document.querySelectorAll('.available')[1];
    secondAvailable.click();
    tick();
    fixture.detectChanges();

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-08-01").toString());
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-08-02").toString());


  }));

  it('should reselect start date when we click before end start date', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var available = document.querySelectorAll('.available')[3];
    available.click();
    tick();
    fixture.detectChanges();

    var datepickerStart = document.querySelector('#dataStart');

    var closeButton = document.querySelector("button.close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-08-04").toString());

    input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var firstAvailable = document.querySelectorAll('.available')[0];
    firstAvailable.click();
    tick();
    fixture.detectChanges();

    datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-08-01").toString());
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-08-30").toString());


  }));

  it('should render previous month when click prev arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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
    firstAvailable.click();
    tick();
    fixture.detectChanges();

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var modal = document.querySelector('.modal');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-07-01").toString());
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-07-01").toString());

    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render next month when click next arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var nextArrow = document.querySelector('.next.arrow');
    nextArrow.click();
    tick();
    fixture.detectChanges();

    var firstAvailable = document.querySelector('.available');
    firstAvailable.click();
    tick();
    fixture.detectChanges();

    firstAvailable = document.querySelector('.available');
    firstAvailable.click();
    tick();
    fixture.detectChanges();
    firstAvailable.click();
    tick();
    fixture.detectChanges();

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var modal = document.querySelector('.modal');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-09-01").toString());
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).toString(), moment("2021-09-01").toString());

    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render today in value when choose today in selectList', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format("YYYY-MM-DD"), moment().format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render last week in value when choose last week in selectList', fakeAsync(function(){
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format("YYYY-MM-DD"), moment().subtract(1, 'weeks').startOf('isoweek').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().subtract(1, 'weeks').endOf('isoweek').format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render last month in value when choose last month in selectList', fakeAsync(function(){
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var modal = document.querySelector('.modal');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format("YYYY-MM-DD"),  moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'),  moment().subtract(1, 'months').endOf('months').format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render last 7 day in value when choose last 7 day in selectList', fakeAsync(function(){
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var modal = document.querySelector('.modal');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format("YYYY-MM-DD"), moment().subtract(1, 'weeks').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render last 30 day in value when choose last 30 day in selectList', fakeAsync(function(){
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var modal = document.querySelector('.modal');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format("YYYY-MM-DD"), moment().subtract(1, 'months').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render last year in value when choose last year in selectList', fakeAsync(function(){
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var modal = document.querySelector('.modal');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format("YYYY-MM-DD"), moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

  it('should render same value when click on off date', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
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

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment("2021-08-23").format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment("2021-08-30").format('YYYY-MM-DD'));

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();
  }));

  it('should render new end value when click on endDate', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[1];
    input.click();
    tick();
    fixture.detectChanges();

    var newEnd = document.querySelectorAll(".available")[6];
    newEnd.click();
    tick();
    fixture.detectChanges();

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var modal = document.querySelector('.modal');
    //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment("2021-08-23").format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment("2021-08-30").format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);

  }));

  it('should render new end value when open with startDate and click on end input', fakeAsync(function() {
    var fixture = TestBed.createComponent(datepickerRangeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var endInput = document.querySelectorAll(".atlui-datepicker-range input")[1];

    endInput.dispatchEvent(new Event('focus'));
    tick();
    fixture.detectChanges();


    var newEnd = document.querySelectorAll(".available")[6];
    newEnd.click();
    tick();
    fixture.detectChanges();

    var datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    var modal = document.querySelector('.modal');
   //Simulates the asynchronous passage of time for the timers in the fakeAsync zone by draining the macrotask queue until it is empty.
    flush();
    assert.strictEqual(moment(datepickerStart.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment("2021-08-23").format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent, [moment.localeData().longDateFormat('L'), "YYYY-MM-DD"]).format('YYYY-MM-DD'), moment("2021-08-30").format('YYYY-MM-DD'));
    assert.strictEqual(modal.classList[3], void 0);

  }));
});
