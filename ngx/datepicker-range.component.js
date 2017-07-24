import { Component, ContentChildren, forwardRef, ElementRef, Inject, KeyValueDiffers, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { language } from './locale.js';
import { i18n } from './i18n.js';

const START  = 'start';
const END = 'end'
export default class datepickerComponent {
  
  constructor (elementRef, differs) {
    this.startChange = new EventEmitter();
    this.endChange = new EventEmitter();
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

    this.arrayRows = this.createRange(6);
    this.arrayCols = this.createRange(7);
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
  renderCalendar(calendarNumber){
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

    //make the calendar object available to hoverDate/clickDate
    this.classes[calendarNumber] = [];
    for (var row = 0; row < 6; row++) {
      this.classes[calendarNumber][row] = [];     
      for (var col = 0; col < 7; col++) {
        curDate = moment(curDate).add(24, 'hour');
        calendar[row][col] = curDate.clone()
        this.calendar[calendarNumber].calendar = calendar;
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
          this.classes[calendarNumber][row][col].push('off');
        }
        //highlight the currently selected start date
        console.log("start", this.start);
        if ( calendar[row][col].format('YYYY-MM-DD') == moment(this.start).format('YYYY-MM-DD') && this.calendar[calendarNumber].month() == moment(this.start).month()) {
          this.classes[calendarNumber][row][col].push('active', 'start-date');
        }

        //highlight the currently selected end date
        if (calendar[row][col].format('YYYY-MM-DD') == moment(this.end).format('YYYY-MM-DD') && this.calendar[calendarNumber].month() == moment(this.end).month()
        && !this.notActiveDateEnd) {
          this.classes[calendarNumber][row][col].push('active', 'end-date');
        }

        if (!this.notActiveDateEnd && calendar[row][col].isAfter(moment(this.start))
        && calendar[row][col].isBefore(moment(this.end)) && this.classes[calendarNumber][row][col].indexOf("off") == -1) {
          this.classes[calendarNumber][row][col].push('in-range');
        }
        
        // all dates are available
        this.classes[calendarNumber][row][col].push('available');
      }
    }
  }

  createRange(number){
    var items = [];
    for(var i = 0; i < number; i++){
      items.push(i);
    }
    return items;
  }

  // click outsite component to close select
  handleClick(event){
    var clickedComponent = event.target;
    console.log("clickedComponent", clickedComponent);
    console.log("this.elementRef.nativeElement", this.elementRef.nativeElement);
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      console.log("close");
      this.close();
    }
    console.log("inside", inside);
  }

  // on load page
  ngOnInit() {
    var self = this;
    if (!this.numberOfMonths) {
      this.numberOfMonths = 3;
    }
    this.arrayMonths = this.createRange(this.numberOfMonths)
    // color arrows
    this.colorPrev = "blue";
    this.colorNext = "blue";
    this.classes = [];

    //Defines the language used by moment using users language
    moment.locale(this.language);         
    if (this.start) {
      // if we have a default value
      this.startDate = moment(this.start); 
    } else {
      // without default value, it's today
      this.startDate = moment().startOf('day');  
      // this.predefinedDate = "toDay";
    }

    if (this.end) {
      // if we have a default value
      this.endDate = moment(this.end); 
    } else {
      // without default value, it's today
      this.endDate = moment().endOf('day'); 
      this.end = moment().endOf('day'); 
      //this.predefinedDate = "toDay";
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
    this.refreshTextDateStart();
    this.refreshTextDateEnd();
  }

  // refresh text date
  refreshTextDateStart(){
    if (moment(this.start).isValid()) {
      var localeData = moment.localeData();
      var dateFormat = localeData.longDateFormat('LLLL');
      this.array = dateFormat.split("D");
      this.dayDateStart = moment(this.start).format("Do");
      // text before day
      this.beforeDayDateStart = moment(this.start).format(this.array[0]);
      // text after day without hours
      this.afterDayDateStart = moment(this.start).format(this.array[1]).replace(moment(this.start).format('LT'), '').replace(/^,/,"");
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
  refreshTextDateEnd(){
    if (moment(this.end).isValid()) {
      var localeData = moment.localeData();
      var dateFormat = localeData.longDateFormat('LLLL');
      this.array = dateFormat.split("D");
      this.dayDateEnd = moment(this.end).format("Do");
      // text before day
      this.beforeDayDateEnd = moment(this.end).format(this.array[0]);
      // text after day without hours
      this.afterDayDateEnd = moment(this.end).format(this.array[1]).replace(moment(this.end).format('LT'), '').replace(/^,/,"");
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
  open(input) {
    this.show = true;
    if (input === "start") {
      this.focus = START;
    } else {
      this.focus = END;
    }
  }

  // close modal
  close() {
    this.show = false;
  }

  selectInputDateStart() {
    this.focus = START;
  }

  selectInputDateEnd() {
   this.focus = END;
  }

  // on change value selectpicker predefined date
  onChange(event) {
    this.predefinedDate = event;
    switch(this.predefinedDate) {
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
        this.endDate =  moment().subtract(1, 'months').endOf('month');
        break;
      case "last7day":
        this.startDate =  moment().subtract(1, 'weeks');
        this.endDate = moment();
        break;
      case "last30day":
        this.startDate =  moment().subtract(1, 'months');
        this.endDate = moment();
        break;
      case "lastYear":
        this.startDate =  moment().subtract(1, 'years').startOf('year');
        this.endDate =  moment().subtract(1, 'years').endOf('year');
        break;
      default :
        break;
     }
    this.start = this.startDate.format('YYYY-MM-DD');
    this.end = this.endDate.format('YYYY-MM-DD');
    this.calendar = [];
    this.calendar[0] = {};
    this.calendar[0] = this.startDate.clone().date(2);
    // create calendars depending on the number of the var numberOfMonths
    for (var i = 1; i< this.numberOfMonths; i++ ) {
      this.calendar[i] = {};
      this.calendar[i] = this.startDate.clone().date(2).add(i , 'month');
    }
    this.refreshCalendar(); 
    this.refreshTextDateStart();
    this.refreshTextDateEnd();
    this.close();
  }

  clickPrev(event) {
    // subtract one month to all calendars
    for (var i = 0; i< this.numberOfMonths; i++) {
      this.calendar[i].subtract(1, 'month');
    }
    this.refreshCalendar(); 
  }

  refreshCalendar(){
    // render each calendar
    for (var i = 0; i< this.numberOfMonths; i++) {
      this.renderCalendar(i);
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

  setStart(event){
    if(moment(event).isValid()) {
      if (moment(event).isBefore(moment(this.end))) {
        this.hasErrorEnd = false;
        this.modalHeaderOptions.close = true;
      } else {
        this.hasErrorEnd = true;
        this.modalHeaderOptions.close = false;
      }
      this.start = event;
      this.startDate = moment(event);
      // emit change value on startChange
      this.startChange.emit(this.start);
      this.calendar = [];
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      // create calendars depending on the number of the var numberOfMonths
      for (var i = 1; i< this.numberOfMonths; i++ ) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i , 'month');
      }
      this.refreshCalendar();
      this.refreshTextDateStart();
 
    }
  }

  // event end change emit by the datepicker atlantis ui
  setEnd(event){
    if(moment(event).isValid()) {
      if (moment(event).isAfter(moment(this.start))) {
        this.hasErrorEnd = false;
        this.modalHeaderOptions.close = true;
        this.end = event;
        this.endDate = event;
        // emit change value on endChange
        this.endChange.emit(this.end);
        this.refreshCalendar();
        this.refreshTextDateEnd();
        this.close();
      } else {
        this.hasErrorEnd = true;
        this.modalHeaderOptions.close = false;
      }
    }

  }

  // on select value date
  selectDate(date, style){
    this.notActiveDateEnd = false;
    var self = this;
    // if a date disabled return
    var index = style.indexOf("off");
    if (index > -1) {
       return;
    }
    if (this.focus === START) {
      this.selectDateStart(date, style);
    } else {
      if (date.isBefore(moment(this.start))) {
        this.selectDateStart(date, style);
        return;
      } else {
        this.selectDateEnd(date, style);
      }

    }
    this.refreshCalendar();
  }

  selectDateStart(date, style) {
    this.notActiveDateEnd = true;
    var elementsActive = this.elementRef.nativeElement.querySelectorAll('.active');
    Array.prototype.forEach.call( elementsActive, function( node ) {
      node.classList.remove('active');
    });
    style.push('start-date');
    style.push('active');
    this.start = date.format('YYYY-MM-DD');
    this.startDate = date.format('YYYY-MM-DD');
    this.refreshTextDateStart();
    this.focus = END;
    console.log("this.focus ", this.focus );
    this.refreshCalendar();
  }

  selectDateEnd(date, style) {
    if (this.elementRef.nativeElement.querySelector('.end-date')) {
      this.elementRef.nativeElement.querySelector('.end-date').classList.remove('active');
    }
    style.push('end-date');
    style.push('active');
    this.end = date.format('YYYY-MM-DD');
    this.refreshTextDateEnd();
    this.hasErrorEnd = false;
    this.close();
  }
}

datepickerComponent.parameters = [ElementRef, KeyValueDiffers];
