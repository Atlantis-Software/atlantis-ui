import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';
var moment = require('moment');
require("moment/min/locales.min");
var assert = require('assert');

class timepickerTestEsComponent {
  constructor() {
    this.testTime = moment('13:20', 'kk:mm');
    this.noTime;
  }
  static get annotations() {
    return [
      new Component({
        template: `<atlui-timepicker id="timepicker" [(time)]="testTime" lang="es"></atlui-timepicker>
        <div id="data">{{testTime}}</div>
        <atlui-timepicker [(time)]="noTime"></atlui-timepicker>
        <div id="data2">{{noTime}}</div>`
      })
    ];
  }
}

class timepickerTestEnComponent {
  constructor() {
    this.testTime = moment('13:20', 'hh:mm');
    this.noTime;
  }
  static get annotations() {
    return [
      new Component({
        template: `<atlui-timepicker id="timepicker" [(time)]="testTime" lang="en"></atlui-timepicker>
        <div id="data">{{testTime}}</div>
        <atlui-timepicker [(time)]="noTime"></atlui-timepicker>
        <div id="data2">{{noTime}}</div>`
      })
    ];
  }
}

describe('timepicker', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [AtlantisUiModule.forRoot(), FormsModule],
      declarations: [timepickerTestEsComponent, timepickerTestEnComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default values local es', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var timepicker = document.querySelector('#data');
    var timepicker2 = document.querySelector('#data2');
    assert.strictEqual(timepicker.textContent.toString(), moment('13:20', 'kk:mm').toString());
    assert.strictEqual(moment(timepicker2.textContent).format('kk:mm').toString(), moment().format('kk:mm').toString());
  }));

  it('should render default values local en', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEnComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var timepicker = document.querySelector('#data');
    var timepicker2 = document.querySelector('#data2');
    assert.strictEqual(timepicker.textContent.toString(), moment('13:20', 'kk:mm').toString());
    assert.strictEqual(moment(timepicker2.textContent).format('kk:mm').toString(), moment().format('kk:mm').toString());
  }));

  it('should render correct values into input timepicker modal local es', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var inputHour = document.querySelector('.atlui-timepicker input[name="hour"]');
    var inputMinute = document.querySelector('.atlui-timepicker input[name="minute"]');
    tick();
    fixture.detectChanges();
    assert.strictEqual(inputHour.value, '13');
    assert.strictEqual(inputMinute.value, '20');

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

  }));

  it('should render correct values into input timepicker modal local en', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEnComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var inputHour = document.querySelector('.atlui-timepicker input[name="hour"]');
    var inputMinute = document.querySelector('.atlui-timepicker input[name="minute"]');

    tick();
    fixture.detectChanges();

    assert.strictEqual(inputHour.value, '01');
    assert.strictEqual(inputMinute.value, '20');
    var select = document.querySelectorAll('atlui-selectpicker');
    var options = select[2].querySelectorAll('a');
    assert.strictEqual(options[0].textContent, 'AM');
    assert.strictEqual(options[1].textContent, 'PM');
    var text = document.querySelectorAll('.select-text');
    assert.strictEqual(text[2].textContent, "PM");

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();
  }));

  it('should render error with invalid hour', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var input_hour = document.querySelector('.atlui-timepicker input[name="hour"]');
    input_hour.value = 25;
    input_hour.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();

    var div_input_hour =  document.querySelectorAll(".form-group")[0];
    assert.strictEqual(div_input_hour.classList.contains('has-error'), true);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

  }));

  it('should render error with invalid minute', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var input_minute = document.querySelector('.atlui-timepicker input[name="minute"]');
    input_minute.value = 74;
    input_minute.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();

    var div_input_minute =  document.querySelectorAll(".form-group")[1];
    assert.strictEqual(div_input_minute.classList.contains('has-error'), true);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

  }));

  it('should render new value when enter a new time', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var input_hour = document.querySelector('.atlui-timepicker input[name="hour"]');
    input_hour.value = 9;
    input_hour.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
   // fixture.detectChanges();


    var input_minute = document.querySelector('.atlui-timepicker input[name="minute"]');
    input_minute.value = 9;
    input_minute.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    var timepicker = document.querySelector('#data');

    assert.strictEqual(timepicker.textContent, moment('09:09', 'kk:mm').toString());
  }));

  it('should render new value when select new time in local en', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEnComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var select_hour = document.querySelectorAll('atlui-selectpicker');
    var options_hour = select_hour[0].querySelectorAll('a');
    console.log("  options_hour[9]",   options_hour[9]);
    options_hour[9].click();
    tick();
    fixture.detectChanges();


    var select_minute = document.querySelectorAll('atlui-selectpicker');
    var options_minute = select_minute[1].querySelectorAll('a');
    options_minute[12].click();
    console.log("  options_minute[12]",   options_minute[12]);
    tick();
    fixture.detectChanges();



    var select_am_pm = document.querySelectorAll('atlui-selectpicker');
    var options_am_pm = select_am_pm[2].querySelectorAll('a');
    console.log("  options_am_pm[1]",   options_am_pm[1]);
    options_am_pm[1].click();
    tick();
    fixture.detectChanges();


    var timepicker = document.querySelector('#data');
    console.log("should render new value when select new time in local en", timepicker.textContent);
    assert.strictEqual(timepicker.textContent, moment('20:11', 'kk:mm').toString());
  }));


  it('should render new value when select new time in local es', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var select_hour = document.querySelectorAll('atlui-selectpicker');
    var options_hour = select_hour[0].querySelectorAll('a');
    options_hour[9].click();
    console.log("  options_hour[9]",   options_hour);
    tick();
    fixture.detectChanges();

    var select_minute = document.querySelectorAll('atlui-selectpicker');
    var options_minute = select_minute[1].querySelectorAll('a');
    options_minute[12].click();
    console.log("  options_hour[12]",   options_hour[12]);
    tick();
    fixture.detectChanges();

    var timepicker = document.querySelector('#data');
    console.log("should render new value when select new time in local es", timepicker.textContent);
    assert.strictEqual(timepicker.textContent, moment('08:11', 'kk:mm').toString());
  }));

  it('should render time now when click on now button', fakeAsync(function() {
    var fixture = TestBed.createComponent(timepickerTestEsComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelectorAll('input')[0];
    input.click();
    tick();
    fixture.detectChanges();

    var now_button = document.querySelector('#now');
    now_button.click();
    tick();
    fixture.detectChanges();

    var timepicker = document.querySelector('#data');
    console.log("(timepicker.textContent now ", timepicker.textContent);
    assert.strictEqual(moment(timepicker.textContent).format('kk:mm').toString(), moment().format('kk:mm').toString());
  }));
});
