import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ngxAtlUiModule } from './ngx-atlantis-ui-module.js';

var assert = require('assert');

class datepickerRangeTestComponent {
  constructor() {
    var date = new Date('02/03/2004');
    this.startDate = date;
    var date2 = new Date('02/10/2004');
    this.endDate = date2;
  }
  static get annotations() {
    return [
      new Component({
        template: `<datepicker-range id="datepicker" [(start)]="startDate" [(end)]="endDate"></datepicker-range>
        <div id="dataStart">{{startDate}}</div>
        <div id="dataEnd">{{endDate}}</div>
        <datepicker-range [(start)]="noDateStart" [(end)]="noDateEnd" [numberOfMonths]="5"></datepicker-range>
        <div id="data2Start">{{noDateStart}}</div>
        <div id="data2End">{{noDateEnd}}</div>`
      })
    ];
  }
}


describe('datepicker-range', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [ngxAtlUiModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [datepickerRangeTestComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
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

    assert.strictEqual(new Date(datepickerStart.textContent).toDateString(), new Date('02/03/2004').toDateString());
    assert.strictEqual(new Date(datepickerEnd.textContent).toDateString(), new Date('02/10/2004').toDateString());
    assert.strictEqual(new Date(datepicker2Start.textContent).toDateString(), new Date().toDateString());
    assert.strictEqual(new Date(datepicker2End.textContent).toDateString(), new Date().toDateString());
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

    var inputStart = document.querySelectorAll("input")[2];
    var inputEnd = document.querySelectorAll("input")[3];

    assert.strictEqual(new Date(inputStart.value).toDateString(), new Date('02/03/2004').toDateString());
    assert.strictEqual(new Date(inputEnd.value).toDateString(), new Date('02/10/2004').toDateString());

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
    var input = document.querySelectorAll('datepicker-range')[0].querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var months = document.querySelectorAll('datepicker-range')[0].querySelectorAll(".calendar.calendar");

    assert.strictEqual(months.length, 3);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    input = document.querySelectorAll('datepicker-range')[1].querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    months = document.querySelectorAll('datepicker-range')[1].querySelectorAll(".calendar.calendar");

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

    var modal = document.querySelector('.modal');
    assert.strictEqual(modal.classList[3], "in");

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

    modal = document.querySelector('.modal');

    assert.strictEqual(new Date(datepickerStart.textContent).toDateString(), new Date("02/01/2004").toDateString());
    assert.strictEqual(new Date(datepickerEnd.textContent).toDateString(), new Date("02/02/2004").toDateString());

    assert.strictEqual(modal.classList[3], void 0);

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

    var modal = document.querySelector('.modal');
    assert.strictEqual(modal.classList[3], "in");

    var available = document.querySelectorAll('.available')[3];
    available.click();
    tick();
    fixture.detectChanges();

    var datepickerStart = document.querySelector('#dataStart');

    assert.strictEqual(new Date(datepickerStart.textContent).toDateString(), new Date("02/04/2004").toDateString());

    var firstAvailable = document.querySelectorAll('.available')[0];
    firstAvailable.click();
    tick();
    fixture.detectChanges();

    datepickerStart = document.querySelector('#dataStart');
    var datepickerEnd = document.querySelector('#dataEnd');

    modal = document.querySelector('.modal');

    assert.strictEqual(new Date(datepickerStart.textContent).toDateString(), new Date("02/01/2004").toDateString());
    assert.strictEqual(new Date(datepickerEnd.textContent).toDateString(), new Date("02/10/2004").toDateString());

    assert.strictEqual(modal.classList[3], "in");

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();
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

    assert.strictEqual(new Date(datepickerStart.textContent).toDateString(), new Date("01/01/2004").toDateString());
    assert.strictEqual(new Date(datepickerEnd.textContent).toDateString(), new Date("01/01/2004").toDateString());

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

    var prevArrow = document.querySelector('.next.arrow');
    prevArrow.click();
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

    assert.strictEqual(new Date(datepickerStart.textContent).toDateString(), new Date("03/01/2004").toDateString());
    assert.strictEqual(new Date(datepickerEnd.textContent).toDateString(), new Date("03/01/2004").toDateString());

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

    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepickerStart.textContent).format("YYYY-MM-DD"), moment().format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

<<<<<<< HEAD
  it('should render last week in value when choose last week in selectList', fakeAsync(function(){
=======
  it('should render today in value when choose last week in selectList', fakeAsync(function() {
>>>>>>> 2d96d735fc53c9296506426c8f3490dee75e95bb
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

    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(datepickerStart.textContent).format("YYYY-MM-DD"), moment().subtract(1, 'weeks').startOf('isoweek').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'), moment().subtract(1, 'weeks').endOf('isoweek').format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

<<<<<<< HEAD
  it('should render last month in value when choose last month in selectList', fakeAsync(function(){
=======
  it('should render today in value when choose last month in selectList', fakeAsync(function() {
>>>>>>> 2d96d735fc53c9296506426c8f3490dee75e95bb
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

<<<<<<< HEAD
    assert.strictEqual(moment(datepickerStart.textContent).format("YYYY-MM-DD"),  moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'),  moment().subtract(1, 'months').endOf('months').format('YYYY-MM-DD'));
=======
    assert.strictEqual(moment(datepickerStart.textContent).format("YYYY-MM-DD"), moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'), moment().subtract(1, 'months').endOf('months').format('YYYY-MM-DD'));
>>>>>>> 2d96d735fc53c9296506426c8f3490dee75e95bb

    assert.strictEqual(modal.classList[3], void 0);
  }));

<<<<<<< HEAD
  it('should render last 7 day in value when choose last 7 day in selectList', fakeAsync(function(){
=======
  it('should render today in value when choose last 7 day in selectList', fakeAsync(function() {
>>>>>>> 2d96d735fc53c9296506426c8f3490dee75e95bb
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

    assert.strictEqual(moment(datepickerStart.textContent).format("YYYY-MM-DD"), moment().subtract(1, 'weeks').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

<<<<<<< HEAD
  it('should render last 30 day in value when choose last 30 day in selectList', fakeAsync(function(){
=======
  it('should render today in value when choose last 30 day in selectList', fakeAsync(function() {
>>>>>>> 2d96d735fc53c9296506426c8f3490dee75e95bb
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

    assert.strictEqual(moment(datepickerStart.textContent).format("YYYY-MM-DD"), moment().subtract(1, 'months').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], void 0);
  }));

<<<<<<< HEAD
  it('should render last year in value when choose last year in selectList', fakeAsync(function(){
=======
  it('should render today in value when choose last year in selectList', fakeAsync(function() {
>>>>>>> 2d96d735fc53c9296506426c8f3490dee75e95bb
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

    assert.strictEqual(moment(datepickerStart.textContent).format("YYYY-MM-DD"), moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'), moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'));

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

    var modal = document.querySelector('.modal');

    assert.strictEqual(moment(new Date(datepickerStart.textContent)).format('YYYY-MM-DD'), moment("2004-02-03").format('YYYY-MM-DD'));
    assert.strictEqual(moment(new Date(datepickerEnd.textContent)).format('YYYY-MM-DD'), moment("2004-02-10").format('YYYY-MM-DD'));

    assert.strictEqual(modal.classList[3], "in");

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

    assert.strictEqual(moment(new Date(datepickerStart.textContent)).format('YYYY-MM-DD'), moment("2004-02-03").format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'), moment("2004-02-07").format('YYYY-MM-DD'));

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

    var endInput = document.querySelectorAll('input')[3];

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

    assert.strictEqual(moment(new Date(datepickerStart.textContent)).format('YYYY-MM-DD'), moment("2004-02-03").format('YYYY-MM-DD'));
    assert.strictEqual(moment(datepickerEnd.textContent).format('YYYY-MM-DD'), moment("2004-02-07").format('YYYY-MM-DD'));
    assert.strictEqual(modal.classList[3], void 0);

  }));
});
