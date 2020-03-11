import { Component, ElementRef, KeyValueDiffers, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { language } from './locale.js';
import { i18n } from './i18n.js';

const HOUR = 'hour';
const MINUTE = 'minute';
var _ = require('lodash');
export default class timepickerComponent {

  constructor(elementRef, differs, changeDetectorRef) {
    this.timeChange = new EventEmitter();
    this.predefinedHourChange = new EventEmitter();
    this.predefinedMinuteChange = new EventEmitter();
    this.elementRef = elementRef;
    this.language = language;
    this.i18n = i18n;
    this.cdr = changeDetectorRef;
    this.predefinedHour = null;
    this.predefinedMinute = null;
    this.predefinedMinute = null;
    this.time = null;
  }

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-timepicker',
        template: require('./timepicker.html'),
        inputs: ['time', 'lang'],
        outputs: ['timeChange'],
      })
    ];
  }

  // on load page
  ngOnInit() {
    //Defines the language used by moment using users language
    if (this.lang) {
      this.language = this.lang;
    }
    moment.locale(this.language);
    //Locales used by moment
    this.locale = {
      format: moment.localeData().longDateFormat('L'),
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      weekdayNames: moment.weekdaysMin(),
      firstDay: moment.localeData().firstDayOfWeek(),
      separator: '-'
    };
    // by default => time nom

    this.hour_list = [];
    this.start_hour = moment().startOf('day').hour();
    this.end_hour = parseInt(moment().endOf('day').format('kk'));
    if (this.language === "en") {
      this.end_hour = parseInt(moment().endOf('day').format('hh'));
    }
    this.start_minute = moment().startOf('hour').minute();
    this.end_minute = moment().endOf('hour').minute();
    for (var h = moment().startOf('day').hour(); h <= this.end_hour; h++) {
      this.hour_list.push(h);
    }
    this.minute_list = [];
    for (var m = moment().startOf('hour').minute(); m <= moment().endOf('hour').minute(); m++) {
      this.minute_list.push(m);
    }

  }

  ngAfterViewInit() {
    // setimeout to defer this code to another Javascript Virtual Machine turn
    setTimeout(() => {
      if (!this.time) {
        this.time = moment();
        this.timeChange.emit(this.time);
      }
      if (this.language === "en") {
        this.hour = parseInt(this.time.format('hh'));
        this.am_pm = this.time.format('A');
      } else {
        this.hour = parseInt(this.time.format('kk'));
      }

      this.minute = this.time.minute();
      this.onChanges();
    });
  }

  onChangeHour(event) {
    if (!_.isUndefined(event) && !_.isNull(event) ) {
      this.hour = event;
      this.onChanges();
    }
  }

  onChangeMinute(event) {
    if (!_.isUndefined(event) && !_.isNull(event) ) {
      this.minute = event;
      this.onChanges();
    }
  }

  // open modal
  open(e,input) {
    e.preventDefault();
    this.visible = true;
    if (input === "hour") {
      this.focus = HOUR;
    } else {
      this.focus = MINUTE;
    }
  }

  // close modal and put correct value into input
  close() {
    this.visible = false;
  }

  selectInputHour() {
    this.focus = HOUR;
  }

  selectInputMinute() {
    this.focus = MINUTE;
  }
  // if not error on keypress event
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  setHour(event) {
    if (event >= moment().startOf('day').hour() && event <= this.end_hour) {
      this.hasErrorHour = false;
      this.hour = event;
      this.onChanges();
    } else {
      delete this.hour;
      this.hasErrorHour = true;
      this.modalHeaderClose = false;
    }
  }


  onChanges() {
    if (!_.isUndefined(this.hour) && !_.isNull(this.hour) && !_.isUndefined(this.minute) && !_.isNull(this.minute) && (this.language != "en" || (this.language === "en" && this.am_pm))) {
      var string_time = this.hour + ":" + this.minute;
      var format = "kk:mm";
      if (this.language === "en") {
        string_time += " " + this.am_pm;
        format = "hh:mm A";
      }
      this.time =  moment(string_time, format);
      this.timeChange.emit(this.time);
      this.display_time = moment(string_time, format).format('LT');
    }
  }

  onChangeAM_PM(am_pm) {
    if (am_pm) {
      this.am_pm = am_pm;
      this.onChanges();
    }
  }

  setNowTime() {
    this.minute = moment().minute();
    if (this.language === "en") {
      this.hour = parseInt( moment().format('hh'));
      this.am_pm =  moment().format('A');
    } else {
      this.hour = parseInt( moment().format('kk'));
    }
    this.onChanges();
  }

  setMinute(event) {
    if (event >= moment().startOf('hour').minute() && event <= moment().endOf('hour').minute()) {
      this.hasErrorMinute = false;
      this.minute = event;
      this.onChanges();
    } else {
      delete this.minute;
      this.hasErrorMinute = true;
      this.modalHeaderClose = false;
    }
  }

  // close modal when we press enter on input, if the start or end input are valid
  closeAfterCheck() {
    if (!this.hasErrorHour && !this.hasErrorMinute && !this.hour && !this.minute) {
      this.close();
    }
  }

  focusHour(event, input) {
    this.focus = HOUR;
    input.focus();
  }

  focusMinute(event, input, end) {
    this.focus = MINUTE;
    if (!end) {
      input.focus();
    }
  }
}

timepickerComponent.parameters = [ElementRef, KeyValueDiffers, ChangeDetectorRef];
