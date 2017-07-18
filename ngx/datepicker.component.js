import { Component, ContentChildren, forwardRef, ElementRef, Inject, KeyValueDiffers } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { language } from './locale.js';
import { i18n } from './i18n.js';

export default class datepickerComponent {
  constructor (elementRef, differs) {
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.elementRef = elementRef;
    this.language = language;
    //this.language = "en";
    this.differ = differs.find([]).create(null);
    this.i18n = i18n;
    this.show = false;
    this.modalOptions = {
      size : "small",
      fade : true, 
      orientation: "right"
    }

    this.modalHeaderOptions = {
      close : true
    }
  }

  static get annotations() {
    return [
      new Component({
        selector: 'datepicker',
        template: require('./datepicker.html'),
        inputs: ['numberOfMonths'],
        // necessary to use ngModel
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => datepickerComponent),
          multi: true
        }
        ]
      })
    ];
  }

  // render calendar in 6 rows and 7 cols
  renderCalendar(calendarNumber, init = false){
    var calendar = this.calendar[calendarNumber];
    var month = calendar.month();
    var year = calendar.year();
    var daysInMonth = moment([year, month]).daysInMonth();
    var firstDay = moment([year, month, 1]);
    var lastDay = moment([year, month, daysInMonth]);
    var lastMonth = moment(firstDay).subtract(1, 'month').month();
    var lastYear = moment(firstDay).subtract(1, 'month').year();
    var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
    var dayOfWeek = firstDay.day();
     
    //initialize a 6 rows x 7 columns array for the calendar
    var calendar = [];
    calendar.firstDay = firstDay;
    calendar.lastDay = lastDay;

    //Clean old calendar;
    for (var i = 0; i < 6; i++) {
      calendar[i] = [];
    }

    //populate the calendar with date objects
    var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }

    if (dayOfWeek == this.locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }

    var curDate = moment([lastYear, lastMonth, startDay, 12]);

    var col, row;
   
    for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
      if (i > 0 && col % 7 === 0) {
     
          col = 0;
          row++;
      }
      calendar[row][col] = curDate.clone()
      curDate.hour(12);
    }

    //make the calendar object available to hoverDate/clickDate
    this.calendar[calendarNumber].calendar = calendar;
    this.classes[calendarNumber] = [];
    for (var row = 0; row < 6; row++) {
      this.classes[calendarNumber][row] = [];     
      for (var col = 0; col < 7; col++) {
        // class for each date 
        this.classes[calendarNumber][row][col] = [];
        //highlight today's date
        if ( calendar[row][col].isSame(moment(), 'day')) {
          this.classes[calendarNumber][row][col].push('today');
        }
        //highlight weekends
        if (calendar[row][col].isoWeekday() > 5) {
          this.classes[calendarNumber][row][col].push('weekend');
        }
        //grey out the dates in other months displayed at beginning and end of this calendar
        if (calendar[row][col].month() != this.calendar[calendarNumber].month()) {
          this.classes[calendarNumber][row][col].push('out-month');
        }
        //highlight the currently selected start date
        if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD') && init 
        || calendar[row][col].format('YYYY-MM-DD') == moment(this.val).format('YYYY-MM-DD') && this.calendar[calendarNumber].month() == moment(this.val).month()) {
          this.classes[calendarNumber][row][col].push('active');
        }
        // all dates are available
        this.classes[calendarNumber][row][col].push('available');
      }
    }
  }

  get value() {
    return this.val;
  }

  set value(val) {
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
    }
  }

  // style on hover button previous
  changeStyleIconPrev($event){
    this.colorPrev = $event.type == 'mouseover' ? 'dark' : 'blue';
  }

  // style on hover button next
  changeStyleIconNext($event){
    this.colorNext = $event.type == 'mouseover' ? 'dark' : 'blue';
  }


  // on load page
  writeValue(val) {
    var self = this;
    if (val !== this.val) {
      // color arrows
      this.colorPrev = "blue";
      this.colorNext = "blue";
      this.val = val;
      this.onModelChange(val);
      this.classes = [];

      //Defines the language used by moment using users language
      moment.locale(this.language);         
      if (this.val) {
        // if we have a default value
        this.startDate = moment(this.val); 
      } else {
        // without default value, it's today
        this.startDate = moment().startOf('day');  
        this.predefinedDate = "toDay";
      }
      //Locales used by moment
      this.locale= {                              
        format: moment.localeData().longDateFormat('L'),
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: moment.localeData().firstDayOfWeek(),
        separator: '-'
      };
      this.calendar = [];
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      // create calendars depending on the number of the var numberOfMonths
      for (var i = 1; i< this.numberOfMonths; i++ ) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i , 'month');
      }
      this.refreshCalendar(); 
      this.refreshText();
    }
  }

  // refresh text date
  refreshText(){
    if (moment(this.val).isValid()) {
      var localeData = moment.localeData();
      var dateFormat = localeData.longDateFormat('LLLL');
      this.array = dateFormat.split("D");
      this.day = moment(this.val).format("Do");
      // text before day
      this.before = moment(this.val).format(this.array[0]);
      // text after day without hours
      this.after = moment(this.val).format(this.array[1]).replace(moment(this.val).format('LT'), '').replace(/^,/,"");
    } else { // if date is not valid , text empty
      this.day = "";
      this.before = "";
      this.after = "";
      // unselect previous value by remove active class
      if (this.elementRef.nativeElement.querySelector('.active')) {
        this.elementRef.nativeElement.querySelector('.active').classList.remove('active');
      }
    }

  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  //use to do a for each in the template
  createRange(number){
    var items = [];
    for(var i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

  // open modal
  open() {
    this.show = true;
  }

  // close modal
  close() {
    this.show = false;
  }

  // on change value selectpicker predefined date
  onChange(event) {
    this.predefinedDate = event;
    switch(this.predefinedDate) {
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
        this.startDate =  moment().subtract(1, 'weeks');
        break;
      case "last30day":
        this.startDate =  moment().subtract(1, 'months');
        break;
      case "lastYear":
        this.startDate =  moment().subtract(1, 'years').startOf('year');
        break;
      default :
        break;
     }
    this.val = this.startDate.format('YYYY-MM-DD');
    this.calendar = [];
    this.calendar[0] = {};
    this.calendar[0] = this.startDate.clone().date(2);
    // create calendars depending on the number of the var numberOfMonths
    for (var i = 1; i< this.numberOfMonths; i++ ) {
      this.calendar[i] = {};
      this.calendar[i] = this.startDate.clone().date(2).add(i , 'month');
    }
    this.refreshCalendar(); 
    this.refreshText();
    this.close();
  }

  clickPrev(event) {
    // subtract one month to all calendars
    for (var i = 0; i< this.numberOfMonths; i++) {
      this.calendar[i].subtract(1, 'month');
    }
    this.refreshCalendar(); 
  }

  refreshCalendar(init = false){
    // render each calendar
    for (var i = 0; i< this.numberOfMonths; i++) {
      this.renderCalendar(i, init);
    }
  }

  // click next button
  clickNext(event) {
    // add one month to all calendars
    for (var i = 0; i< this.numberOfMonths; i++) {
      this.calendar[i].add(1, 'month');
    }
    this.refreshCalendar()
  }

  // event on change input value
  valueChange(event) {
    if (event && moment(this.val).isValid()) {
      this.val = event;
      this.refreshText();
      this.startDate = moment(this.val);
      this.calendar = [];
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      // create calendars depending on the number of the var numberOfMonths
      for (var i = 1; i< this.numberOfMonths; i++ ) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i , 'month');
      }
      this.refreshCalendar();
      this.refreshText();
    }
  }

  // on select value date
  selectDate(date, style){
    var self = this;
    // if a date disabled return
    var index = style.indexOf("out-month");
    if (index > -1) {
       return;
    }
    // unselect previous value by remove active class
    if (this.elementRef.nativeElement.querySelector('.active')) {
      this.elementRef.nativeElement.querySelector('.active').classList.remove('active');
    }
    // select selected value by add active class
    style.push('active'); 
    // modify this.val by the selected value
    this.val = date.format('YYYY-MM-DD');
    this.onModelChange(this.val);
    this.refreshText();
    this.close();
  }
}

datepickerComponent.parameters = [ElementRef, KeyValueDiffers];
