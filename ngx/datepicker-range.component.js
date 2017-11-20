import { Component, ElementRef, KeyValueDiffers, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { language } from './locale.js';
import { i18n } from './i18n.js';

const START = 'start';
const END = 'end';
export default class datepickerComponent {

  constructor(elementRef, differs, changeDetectorRef) {
    this.startChange = new EventEmitter();
    this.endChange = new EventEmitter();
    this.elementRef = elementRef;
    this.language = language;
    this.differ = differs.find([]).create(null);
    this.i18n = i18n;
    this.visible = false;
    this.modalOptions = {
      fade: true,
      orientation: "right"
    };

    this.modalHeaderOptions = {
      close: true
    };
    this.arrayRows = this.createRange(6);
    this.arrayCols = this.createRange(7);
    this.cdr = changeDetectorRef;
  }

  static get annotations() {
    return [
      new Component({
        selector: 'datepicker-range',
        template: require('./datepicker-range.html'),
        inputs: ['numberOfMonths', 'start', 'end'],
        outputs: ['startChange', 'endChange'],
      })
    ];
  }


  // render calendar in 6 rows and 7 cols
  renderCalendar(calendarNumber) {
    var calendar = this.calendar[calendarNumber];
    var month = calendar.month();
    var year = calendar.year();
    var daysInMonth = moment([year, month]).daysInMonth();
    var firstDay = moment([year, month, 1]);
    var lastDay = moment([year, month, daysInMonth]);
    var lastMonth = moment(firstDay).subtract(1, 'months').month();
    var lastYear = moment(firstDay).subtract(1, 'months').year();
    var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
    var dayOfWeek = firstDay.day();

    //initialize a 6 rows x 7 columns array for the calendar
    calendar = [];
    calendar.firstDay = firstDay;
    calendar.lastDay = lastDay;

    //Clean old calendar;
    for (var i = 0; i < 6; i++) {
      calendar[i] = [];
    }
    //populate the calendar with date objects
    var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;

    if (dayOfWeek == this.locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }
    // if not invalid date
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }
    var curDate = moment([lastYear, lastMonth, startDay, 12]);

    // if a full week in the last month, one week ahead
    if (startDay + 6 <= daysInLastMonth) {
      curDate.add(7, 'days');
    }

    var col, row;

    //make the calendar object available to hoverDate/clickDate
    this.classes[calendarNumber] = [];
    for (row = 0; row < 6; row++) {
      this.classes[calendarNumber][row] = [];
      for (col = 0; col < 7; col++) {
        calendar[row][col] = curDate.clone();
        this.calendar[calendarNumber].calendar = calendar;
        // class for each date
        this.classes[calendarNumber][row][col] = [];

        //highlight today's date
        if (calendar[row][col].isSame(moment(), 'day')) {
          this.classes[calendarNumber][row][col].push('today');
        }
        //highlight weekends
        if (calendar[row][col].isoWeekday() > 5) {
          this.classes[calendarNumber][row][col].push('weekend');
        }
        //grey out the dates in other months displayed at beginning and end of this calendar
        if (calendar[row][col].month() != this.calendar[calendarNumber].month()) {
          this.classes[calendarNumber][row][col].push('off');
        }
        //highlight the currently selected start date
        if (calendar[row][col].format(this.locale.format) == moment(this._start, this.locale.format).format(this.locale.format) && this.calendar[calendarNumber].month() == moment(this._start, this.locale.format).month()) {
          this.classes[calendarNumber][row][col].push('active', 'start-date');
        }

        //highlight the currently selected end date
        if (calendar[row][col].format(this.locale.format) == moment(this._end, this.locale.format).format(this.locale.format) && this.calendar[calendarNumber].month() == moment(this._end, this.locale.format).month()) {
          this.classes[calendarNumber][row][col].push('active', 'end-date');
        }

        if (calendar[row][col].isAfter(moment(this._start, this.locale.format)) &&
          calendar[row][col].isBefore(moment(this._end, this.locale.format)) && this.classes[calendarNumber][row][col].indexOf("off") == -1) {
          this.classes[calendarNumber][row][col].push('in-range');
        }

        // all dates are available
        if (this.classes[calendarNumber][row][col].indexOf("off") == -1) {
          this.classes[calendarNumber][row][col].push('available');
        }
        curDate = moment(curDate).add(24, 'hour');
      }
    }
  }

  createRange(number) {
    var items = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  // on load page
  ngOnInit() {
    if (!this.numberOfMonths) {
      this.numberOfMonths = 3;
    }
    this.arrayMonths = this.createRange(this.numberOfMonths);
    this.classes = [];

    //Defines the language used by moment using users language
    // moment.locale(this.language);
    //Locales used by moment
    this.locale = {
      format: moment.localeData().longDateFormat('L'),
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      weekdayNames: moment.weekdaysMin(),
      firstDay: moment.localeData().firstDayOfWeek(),
      separator: '-'
    };
    if (this.start) {
      // if we have a default value
      this.startDate = moment(this.start, [this.locale.format, "YYYY-MM-DD"]);
      this.start = this._start = this.startDate.format(this.locale.format);
    } else {
      this.startDate = moment();
      // without default value, it's today
      setTimeout(() => { // if not setTimeout error
        this.start = this._start = this.startDate.format(this.locale.format);
        this.startChange.emit(this.start);
      });
    }

    if (this.end) {
      // if we have a default value
      this.endDate = moment(this.end, [this.locale.format, "YYYY-MM-DD"]);
      this.end = this._end = this.endDate.format(this.locale.format);
    } else {
      this.endDate = moment();
      // without default value, it's today
      setTimeout(() => { // it not setTimeout error
        this.end = this._end = this.endDate.format(this.locale.format);
        this.endChange.emit(this.end);
      });

    }


    this.calendar = [];
    this.calendar[0] = {};
    this.calendar[0] = this.startDate.clone().date(2);
    // create calendars depending on the number of the var numberOfMonths
    for (var i = 1; i < this.numberOfMonths; i++) {
      this.calendar[i] = {};
      this.calendar[i] = this.startDate.clone().date(2).add(i, 'month');
    }
    this.refreshCalendar();
    this.refreshTextDateStart();
    this.refreshTextDateEnd();
  }

  // refresh text date
  refreshTextDateStart() {
    if (moment(this._start, this.locale.format).isValid()) {
      var localeData = moment.localeData();
      var dateFormat = localeData.longDateFormat('LLLL');
      this.array = dateFormat.split("D");
      this.dayDateStart = moment(this._start, this.locale.format).format("Do");
      // text before day
      this.beforeDayDateStart = moment(this._start, this.locale.format).format(this.array[0]);
      // text after day without hours
      this.afterDayDateStart = moment(this._start, this.locale.format).format(this.array[1]).replace(moment(this._start, this.locale.format).format('LT'), '').replace(/^,/, "");
    } else { // if date is not valid , text empty
      this.dayDateStart = "";
      this.beforeDayDateStart = "";
      this.afterDayDateStart = "";
      // unselect previous value by remove active class
      if (this.elementRef.nativeElement.querySelector('.active')) {
        this.elementRef.nativeElement.querySelector('.active').classList.remove('active');
      }
    }

  }
  refreshTextDateEnd() {
    if (moment(this._end, this.locale.format).isValid()) {
      var localeData = moment.localeData();
      var dateFormat = localeData.longDateFormat('LLLL');
      this.array = dateFormat.split("D");
      this.dayDateEnd = moment(this._end, this.locale.format).format("Do");
      // text before day
      this.beforeDayDateEnd = moment(this._end, this.locale.format).format(this.array[0]);
      // text after day without hours
      this.afterDayDateEnd = moment(this._end, this.locale.format).format(this.array[1]).replace(moment(this._end, this.locale.format).format('LT'), '').replace(/^,/, "");
    } else { // if date is not valid , text empty
      this.dayDateEnd = "";
      this.beforeDayDateEnd = "";
      this.afterDayDateEnd = "";
      // unselect previous value by remove active class
      if (this.elementRef.nativeElement.querySelector('.active')) {
        this.elementRef.nativeElement.querySelector('.active').classList.remove('active');
      }
    }

  }

  // open modal
  open(e,input) {
    e.preventDefault();
    this.visible = true;
    if (input === "start") {
      this.focus = START;
    } else {
      this.focus = END;
    }
  }

  // close modal and put correct value into input
  close() {
    this.visible = false;
    this.setStart(this._start);
    this.setEnd(this._end);
    if (moment(this._start, this.locale.format).isSameOrBefore(moment(this._end, this.locale.format))) {
      this.start = this._start;
      this.end = this._end;
    } else {
      this._start = this.start;
      this._end = this.end;
    }
    this.startChange.emit(moment(this.start,this.locale.format).format(this.locale.format));
    this.endChange.emit(moment(this.end,this.locale.format).format(this.locale.format));
  }

  selectInputDateStart() {
    this.focus = START;
  }

  selectInputDateEnd() {
    this.focus = END;
  }

  // if not error on keypress event
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  // on change value selectpicker predefined date
  onChange(event) {

    this.predefinedDate = event;
    if (this.predefinedDate) {
      switch (this.predefinedDate) {
        case "toDay":
          this.startDate = moment();
          this.endDate = this.startDate;
          break;
        case "lastWeek":
          this.startDate = moment().subtract(1, 'weeks').startOf('isoweek');
          this.endDate = moment().subtract(1, 'weeks').endOf('isoweek');
          break;
        case "lastMonth":
          this.startDate = moment().subtract(1, 'months').startOf('month');
          this.endDate = moment().subtract(1, 'months').endOf('month');
          break;
        case "last7day":
          this.startDate = moment().subtract(1, 'weeks');
          this.endDate = moment();
          break;
        case "last30day":
          this.startDate = moment().subtract(1, 'months');
          this.endDate = moment();
          break;
        case "lastYear":
          this.startDate = moment().subtract(1, 'years').startOf('year');
          this.endDate = moment().subtract(1, 'years').endOf('year');
          break;
        default:
          break;
      }
      this._start = this.startDate.format(this.locale.format);
      this._end = this.endDate.format(this.locale.format);
      this.calendar = [];
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      // create calendars depending on the number of the var numberOfMonths
      for (var i = 1; i < this.numberOfMonths; i++) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i, 'month');
      }
      this.refreshCalendar();
      this.refreshTextDateStart();
      this.refreshTextDateEnd();
      this.close();
    }
  }

  clickPrev() {
    // subtract one month to all calendars
    for (var i = 0; i < this.numberOfMonths; i++) {
      this.calendar[i].subtract(1, 'month');
    }
    this.refreshCalendar();
  }

  refreshCalendar() {
    // render each calendar
    for (var i = 0; i < this.numberOfMonths; i++) {
      this.renderCalendar(i);
    }
  }

  // click next button
  clickNext() {
    // add one month to all calendars
    for (var i = 0; i < this.numberOfMonths; i++) {
      this.calendar[i].add(1, 'month');
    }
    this.refreshCalendar();
  }

  // close modal when we press enter on input, if the start or end input are valid
  closeAfterCheck(event, isStart) {
    if (isStart) {
      this.setStart(event.target.value);
    } else {
      this.setEnd(event.target.value);
    }
    if (!this.hasErrorEnd) {
      this.close();
    }
  }

  setStart(event) {
    if (moment(event, this.locale.format).isValid()) {
      if (moment(event, this.locale.format).isBefore(moment(this._end, this.locale.format))) {
        this.hasErrorEnd = false;
        this.modalHeaderOptions.close = true;
      } else {
        this.hasErrorEnd = true;
        this.modalHeaderOptions.close = false;
      }
      this._start = moment(event, this.locale.format).format(this.locale.format);
      this.startDate = moment(event, this.locale.format);
      this.calendar = [];
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      // create calendars depending on the number of the var numberOfMonths
      for (var i = 1; i < this.numberOfMonths; i++) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i, 'month');
      }
      this.refreshCalendar();
      this.refreshTextDateStart();

    } else {
      this.hasErrorEnd = true;
      this.modalHeaderOptions.close = false;
    }
  }

  // event end change emit by the datepicker atlantis ui
  setEnd(event) {
    if (moment(event, this.locale.format).isValid()) {
      if (moment(event, this.locale.format).isAfter(moment(this._start, this.locale.format))) {
        this.hasErrorEnd = false;
        this.modalHeaderOptions.close = true;
        this._end = moment(event, this.locale.format).format(this.locale.format);
        this.endDate = moment(event, this.locale.format);
        this.refreshCalendar();
        this.refreshTextDateEnd();
      } else {
        this.hasErrorEnd = true;
        this.modalHeaderOptions.close = false;
      }
    }

  }

  focusStart(event, input) {
    this.focus = START;
    input.focus();
    this.setEnd(event.target.value);
  }

  focusEnd(event, input) {
    this.focus = END;
    input.focus();
    this.setStart(event.target.value);
  }


  // on select value date
  selectDate(date, style) {
    this.predefinedDate = null;
    // if a date disabled return
    var index = style.indexOf("off");
    if (index > -1) {
      return;
    }
    if (this.focus === START) {
      this.selectDateStart(date, style);
    } else {
      if (date.isBefore(moment(this._start, this.locale.format))) {
        this.selectDateStart(date, style);
        return;
      } else {
        this.selectDateEnd(date, style);
      }

    }
    this.refreshCalendar();
  }

  selectDateStart(date, style) {
    var elementsActive = this.elementRef.nativeElement.querySelectorAll('.active');
    Array.prototype.forEach.call(elementsActive, function(node) {
      node.classList.remove('active');
    });
    style.push('start-date');
    style.push('active');
    this._start = date.format(this.locale.format);
    this.startDate = date.format(this.locale.format);
    this.refreshTextDateStart();
    this.focus = END;
    this.refreshCalendar();
  }

  selectDateEnd(date, style) {
    if (this.elementRef.nativeElement.querySelector('.end-date')) {
      this.elementRef.nativeElement.querySelector('.end-date').classList.remove('active');
    }
    style.push('end-date');
    style.push('active');
    this._end = date.format(this.locale.format);
    this.refreshTextDateEnd();
    this.hasErrorEnd = false;
    this.close();
  }
}

datepickerComponent.parameters = [ElementRef, KeyValueDiffers, ChangeDetectorRef];
