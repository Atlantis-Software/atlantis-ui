import { Component, ContentChildren, forwardRef, ElementRef, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { JQ_TOKEN } from './jQuery.service';

export default class datepicker4Component {
  constructor (elementRef, jquery) {
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.val = '';
    this.elementRef = elementRef;
    this.jq = jquery;
   
  }


  ngOnInit(){
    this.classes = [];
     moment.locale($.fn.i18n.language);          //Defines the language used by moment using users language
    this.startDate = moment().startOf('day');   //Begin date
    console.log("this.startDate ", this.startDate );
    this.endDate = moment().endOf('day');       //End Date
    this.locale= {                              //Locales used by moment
      format: moment.localeData().longDateFormat('L'),
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
      separator: '-'
    };
    this.calendar = [];
    this.numberOfMonths = 4;
    //if (this.calendar[0].month.format('YYYY-MM') != this.startDate.format('YYYY-MM')){
      console.log("this.numberOfMonths", this.numberOfMonths);
      console.log("this.calendar[0]", this.calendar);
      this.calendar[0] = {};
      this.calendar[0] = this.startDate.clone().date(2);
      for (var i = 1; i< this.numberOfMonths; i++ ) {
        this.calendar[i] = {};
        this.calendar[i] = this.startDate.clone().date(2).add(i , 'month');
      }
      for (var i = 0; i< this.numberOfMonths; i++) {
        this.renderCalendar(i);
      } 
    
    var month = this.locale.monthNames[this.calendar[1].month()] + this.calendar[1].format(" YYYY");
    
  }

  renderCalendar(calendarNumber){
    var calendar = this.calendar[calendarNumber];
    console.log("calendar", calendar);
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
    if (!this.classes[calendarNumber]) {
      this.classes[calendarNumber] = [];
    }
    
    for (var row = 0; row < 6; row++) {
        if (!this.classes[calendarNumber][row]) {
          this.classes[calendarNumber][row] = [];
        }
           
      for (var col = 0; col < 7; col++) {
          if (!this.classes[calendarNumber][row][col]) {
            this.classes[calendarNumber][row][col] = [];
          }
        
        //highlight today's date
        
        //var calendardate = calendar[row][col].format('YYYY-MMM-D');
        if ( calendar[row][col].isSame(moment(), 'day')) {
          this.classes[calendarNumber][row][col].push('today');
        }
        //highlight weekends
        if (calendar[row][col].isoWeekday() > 5) {
          this.classes[calendarNumber][row][col].push('weekend');
        }
        //grey out the dates in other months displayed at beginning and end of this calendar
        if (calendar[row][col].month() != calendar[1][1].month()) {
          this.classes[calendarNumber][row][col].push('off');
        }
        //highlight the currently selected start date
        if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
          this.classes[calendarNumber][row][col].push('active', 'start-date');
        }
        //highlight the currently selected end date
        if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
          this.classes[calendarNumber][row][col].push('active', 'end-date');
        }
        //highlight dates in-between the selected dates
        if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate) {
          this.classes[calendarNumber][row][col].push('in-range');
        }
        this.classes[calendarNumber][row][col].push('available');
      }
    }
  }
  static get annotations() {
    return [
      new Component({
        selector: 'datepicker4',
        template: require('./datepicker4.html'),
        inputs: ['numberOfMonths'],
        // necessary to use ngModel
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => datepicker4Component),
          multi: true
        }]
      })
    ];
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
  writeValue(val) {
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
    }
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  createRange(number){
    var items = [];
    for(var i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

  open(event) {
    this.modal = this.elementRef.nativeElement.getElementsByClassName("modal")[0];
    this.modal.classList.add("modal-right");
    this.jq(this.modal).modal('show');
  }

  // event on change value
  valueChange(event) {
    // change the value
    this.val = event.target.value ;
    // emit the change
    this.onModelChange(this.val);
  }
  selectDate(date, style){
    this.elementRef.nativeElement.querySelector('.active').classList.remove('active');
    style.push("active");
    this.val = date.format('YYYY-MM-DD');
    this.onModelChange(this.val);
  }
}

datepicker4Component.parameters = [ElementRef, [new Inject(JQ_TOKEN)]];
