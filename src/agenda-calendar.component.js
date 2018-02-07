import { Component, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { localeMomentService } from './localeMoment.service.js';
import { agendaEvents } from './agenda-event.class.js';

class dateEvent {
  constructor(date) {
    this.date = date;
    this.events = [];
  }

  findEmptyEvent() {
    var i = 0;
    var indexEmpty = -1;
    while (i != this.events.length && indexEmpty == -1) {
      if (this.events[i] === void 0 || (this.events[i] && this.events[i].event === void 0)) {
        indexEmpty = i;
      }
      i++;
    }
    return indexEmpty;
  }

  lastNeedMoreEvents() {
    if (this.events.length === 0) {
      return false;
    }
    var lastIndex = this.events.length - 1;
    var moreEvents = this.events[lastIndex].moreEvents;
    return moreEvents;
  }
}

export class agendaCalendarComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda-calendar',
        template: `
        <atlui-agenda-week *ngFor="let week of calendar; let weekIndex = index" [week]="week" [classes]="classes[weekIndex]" [row]="weekIndex" [weekHeight]="eventsMax"
          (clickDayCallback)="clickDayCallback.emit()"
          (moreEventsCallback)="moreEventsCallback.emit()">
        </atlui-agenda-week>`,
        inputs: ["events"],
        outputs: ["clickDayCallback", "moreEventsCallback"]
      })
    ];
  }
  constructor(localeMomentService, cdr) {
    this.locale = localeMomentService;
    this.calendar = [];
    this.renderCalendar(moment("2018-01-01"));
    this.cdr = cdr;
    this.clickDayCallback = new EventEmitter();
    this.moreEventsCallback = new EventEmitter();
  }

  ngOnChanges() {
    this.events.sort( (a, b)=> {
      if ( a.beginDate < b.beginDate) {
        return -1;
      } else if (b.beginDate < a.beginDate) {
        return 1;
      } else {
        return 0;
      }
    });
    this.reloadEvents();
  }

  ngAfterViewInit() {
    this.eventsPerDay();
    this.reloadEvents();
    this.cdr.detectChanges();
  }

  eventsPerDay() {
    var eventsHeightAvailable = document.querySelector(".weekEvents").clientHeight;
    var fontSize = parseInt(window.getComputedStyle(document.querySelector(".events")).fontSize);
    this.eventsMax = Math.trunc(eventsHeightAvailable / fontSize);
  }

  renderCalendar(monthSelected) {
    var calendar = monthSelected;
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
    this.classes = [];
    for (row = 0; row < 6; row++) {
      this.classes[row] = [];
      for (col = 0; col < 7; col++) {
        calendar[row][col] = new dateEvent(curDate.clone());
        // class for each date
        this.classes[row][col] = [];

        //highlight today's date
        if (calendar[row][col].date.isSame(moment(), 'day')) {
          this.classes[row][col].push('today');
        }
        //highlight sunday
        if (calendar[row][col].date.isoWeekday() > 6) {
          this.classes[row][col].push('sunday');
        }
        //grey out the dates in other months displayed at beginning and end of this calendar
        if (calendar[row][col].date.month() != monthSelected.month()) {
          this.classes[row][col].push('off');
        }
        // all dates are available
        if (this.classes[row][col].indexOf("off") == -1) {
          this.classes[row][col].push('available');
        }
        curDate = moment(curDate).add(24, 'hour');
      }
    }
    this.calendar = calendar;
  }

  positionInCalendar(number) {
    return {
      row: Math.trunc(number/7),
      col: number%7
    };
  }

  reloadEvents() {
    this.calendar.forEach((row)=> {
      row.forEach((column) => {
        column.events.length = 0;
      });
    });
    this.placeEvents();
  }

  placeEvents() {
    if (this.events) {
      this.events.forEach((event)=> {
        var firstDayOfCalendar = this.calendar[0][0].date.startOf('day');
        if (event.endDate.isBefore(firstDayOfCalendar) || event.beginDate.isAfter(this.calendar[5][6].date.startOf('day'))) {
          return;
        }
        var nbrDayFromFirstToEventBegin = event.beginDate.startOf('day').diff(firstDayOfCalendar, "day");
        if (nbrDayFromFirstToEventBegin < 0) {
          nbrDayFromFirstToEventBegin = 0;
        }
        var index;
        var currentDateEvent;
        var matrixPos = this.positionInCalendar(nbrDayFromFirstToEventBegin);
        currentDateEvent = this.calendar[matrixPos.row][matrixPos.col];
        var totalDuration = event.endDate.startOf('day').diff(firstDayOfCalendar, 'day');
        index = currentDateEvent.findEmptyEvent();
        //+1 for count the last day;
        var duration = event.endDate.startOf('day').diff(currentDateEvent.date.startOf('day'), 'day') + 1;
        if (duration > 7) {
          duration = 7;
        }
        var dayToEndWeek = 7 - currentDateEvent.date.isoWeekday();
        if ((duration - dayToEndWeek > 0)) {
          //+1 for count last day of week
          duration = dayToEndWeek + 1;
        }
        if (duration < 1) {
          duration = 1;
        }
        var moreEvents = false;
        if (currentDateEvent.events.length >= this.eventsMax && index == -1) {
          moreEvents = true;
        }
        var eventDay = new agendaEvents(event, duration, moreEvents);
        if (index == -1) {
          if (moreEvents) {
            currentDateEvent.events[currentDateEvent.events.length-1].moreEvents = true;
          }
          currentDateEvent.events.push(eventDay);
          index = currentDateEvent.events.length - 1;
        } else {
          if (moreEvents) {
            currentDateEvent.events[index-1].moreEvents = true;
          }
          currentDateEvent.events[index] = eventDay;
        }
        // col * row
        if (totalDuration > (7*6-1)) {
          totalDuration = 7*6-1;
        }
        for (var i = nbrDayFromFirstToEventBegin; i <= totalDuration; i++) {
          matrixPos = this.positionInCalendar(i);
          currentDateEvent = this.calendar[matrixPos.row][matrixPos.col];
          if (matrixPos.col === 0 && !event.beginDate.startOf('day').isSame(currentDateEvent.date.startOf('day')) && i != 0 ) {
            //+1 for count the last day;
            duration = event.endDate.startOf('day').diff(currentDateEvent.date.startOf('day'), 'day') + 1;
            if (duration > 7) {
              duration = 7;
            }
            dayToEndWeek = 7 - currentDateEvent.date.isoWeekday();
            if ((duration - dayToEndWeek > 0)) {
              //+1 for count last day of week
              duration = dayToEndWeek + 1;
            }
            if (duration < 1) {
              duration = 1;
            }
            index = currentDateEvent.findEmptyEvent();
            moreEvents = false;
            if (currentDateEvent.events.length >= this.eventsMax) {
              moreEvents = true;
            }
            eventDay = new agendaEvents(event, duration, moreEvents);
            if (index == -1) {
              if (moreEvents) {
                currentDateEvent.events[currentDateEvent.events.length-1].moreEvents = true;
              }
              currentDateEvent.events.push(eventDay);
              index = currentDateEvent.events.length - 1;
            } else {
              if (moreEvents) {
                currentDateEvent.events[index-1].moreEvents = true;
              }
              currentDateEvent.events[index] = eventDay;
            }
          } else if (!event.beginDate.startOf('day').isSame(currentDateEvent.date.startOf('day'))) {
            currentDateEvent.events[index] = eventDay;
          }
          this.classes[matrixPos.row][matrixPos.col].push("duringEvent");
        }
      });
    }
  }

}

agendaCalendarComponent.parameters = [localeMomentService, ChangeDetectorRef];
