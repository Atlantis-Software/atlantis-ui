import { Component, forwardRef, ElementRef, KeyValueDiffers, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { language } from './locale.js';
import { i18n } from './i18n.js';

export default class datepickerComponent {
  constructor(elementRef, differs, changeDetectorRef) {
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.elementRef = elementRef;
    this.language = language;
    this.differ = differs.find([]).create(null);
    this.i18n = i18n;
    this.visible = false;
    this.modalOptions = {
      fade: true,
      orientation: "right"
    };
    this.cdr = changeDetectorRef;
    this.predefinedDate = null;
  }

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-datepicker',
        template: require('./datepicker.html'),
        inputs: ['numberOfMonths'],
        // necessary to use ngModel
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => datepickerComponent),
          multi: true
        }]
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
        if (calendar[row][col].format(this.locale.format) == moment(this._val, this.formats).format(this.locale.format) && this.calendar[calendarNumber].month() == moment(this._val, [this.locale.format, "YYYY-MM-DD"]).month()) {
          this.classes[calendarNumber][row][col].push('active');
        }

        // all dates are available
        if (this.classes[calendarNumber][row][col].indexOf("off") == -1) {
          this.classes[calendarNumber][row][col].push('available');
        }
        curDate = moment(curDate).add(24, 'hour');
      }
    }
  }

  get value() {
    return this._val;
  }

  set value(val) {
    if (val !== this._val) {
      this._val = val;
      val = moment(val, this.formats).format('YYYY-MM-DD');
      this.onModelChange(val);
    }
  }

  ngOnInit() {
    moment.locale(this.language);
    this.locale = {
      format: moment.localeData().longDateFormat('L'),
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      weekdayNames: moment.weekdaysMin(),
      firstDay: moment.localeData().firstDayOfWeek(),
      separator: '-'
    };
    this.formats = [this.locale.format, "YYYY-MM-DD HH:mm Z", "YYYY-MM-DD"];
  }

  // on load page
  writeValue(val) {
    if (val !== this._val) {
      if (!this.numberOfMonths) {
        this.numberOfMonths = 3;
      }
      this._val = val;
      this.classes = [];

      //Defines the language used by moment using users language
      moment.locale(this.language);
      if (this._val) {
        // if we have a default value
        this.startDate = moment(this._val, this.formats);
        this.val = this._val = this.startDate.format(this.locale.format);
      } else {
        this.startDate = moment();
        this.val = "";
      }
      //Locales used by moment
      this.locale = {
        format: moment.localeData().longDateFormat('L'),
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        weekdayNames: moment.weekdaysMin(),
        firstDay: moment.localeData().firstDayOfWeek(),
        separator: '-'
      };
      this.calendar = [];
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      // create calendars depending on the number of the var numberOfMonths
      for (var i = 1; i < this.numberOfMonths; i++) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i, 'month');
      }
      this.refreshCalendar();
      this.refreshText();
      if (val) {
        this.onModelChange(moment(val, this.formats).format('YYYY-MM-DD'));
      } else {
        this.onModelChange("");
      }
    }
  }

  // refresh text date
  refreshText() {
    if (moment(this._val, this.formats).isValid()) {
      var localeData = moment.localeData();
      var dateFormat = localeData.longDateFormat('LLLL');
      this.array = dateFormat.split("D");
      this.day = moment(this._val, this.formats).format("Do");
      // text before day
      this.before = moment(this._val, this.formats).format(this.array[0]);
      // text after day without hours
      this.after = moment(this._val, this.formats).format(this.array[1]).replace(moment(this._val, this.formats).format('LT'), '').replace(/^,/, "");
    } else { // if date is not valid , text empty
      this.day = "";
      this.before = "";
      this.after = "";
    }

  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  // if not error on keypress event
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  //use to do a for each in the template
  createRange(number) {
    var items = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  // open modal
  open(e) {
    e.preventDefault();
    this.visible = true;
  }

  closeAfterCheck(event) {
    this.valueChange(event.target.value);
    this.close();
  }

  // close modal
  close() {
    this.visible = false;
    if (this._val) {
      this.val = moment(this._val, this.locale.format).format(this.locale.format);
      this.onModelChange(moment(this._val, this.locale.format).format("YYYY-MM-DD"));
    } else {
      this.val = "";
      this.onModelChange(this.val);
    }
  }

  // on change value selectpicker predefined date
  onChange(event) {
    this.predefinedDate = event;
    if (this.predefinedDate) {
      switch (this.predefinedDate) {
        case "toDay":
          this.startDate = moment();
          break;
        case "lastWeek":
          this.startDate = moment().subtract(1, 'weeks').startOf('isoweek');
          break;
        case "lastMonth":
          this.startDate = moment().subtract(1, 'months').startOf('month');
          break;
        case "last7day":
          this.startDate = moment().subtract(1, 'weeks');
          break;
        case "last30day":
          this.startDate = moment().subtract(1, 'months');
          break;
        case "lastYear":
          this.startDate = moment().subtract(1, 'years').startOf('year');
          break;
        default:
          break;
      }
      this._val = this.startDate.format(this.locale.format);
      this.calendar = [];
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      // create calendars depending on the number of the var numberOfMonths
      for (var i = 1; i < this.numberOfMonths; i++) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i, 'month');
      }
      this.refreshCalendar();
      this.refreshText();
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


  // event on change input value
  valueChange(event) {
    if (moment(event, this.formats).isValid()) {
      this._val = event;
      this.startDate = moment(event, this.formats);
      this.calendar = [];
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      // create calendars depending on the number of the var numberOfMonths
      for (var i = 1; i < this.numberOfMonths; i++) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i, 'month');
      }
    } else if (!event) {
      this._val = "";
      this.startDate = "";
    }
    this.refreshCalendar();
    this.refreshText();
  }

  // on select value date
  selectDate(date, style) {
    this.predefinedDate = null;
    // if a date disabled return
    var index = style.indexOf("off");
    if (index > -1) {
      return;
    }
    // select selected value by add active class
    style.push('active');
    // modify this.val by the selected value
    this._val = date.format(this.locale.format);
    // this.onModelChange(this.val);
    this.refreshCalendar();
    this.refreshText();
    this.close();
  }

  resetDate() {
    this.val = this._val = "";
    this.refreshCalendar();
    this.refreshText();
    this.onModelChange(this._val);
  }
}

datepickerComponent.parameters = [ElementRef, KeyValueDiffers, ChangeDetectorRef];
