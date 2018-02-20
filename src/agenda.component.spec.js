import { getTestBed, TestBed, tick, fakeAsync, async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { localeMomentService } from './localeMoment.service.js';
import { FormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';

var assert = require('assert');

class agendaTestComponent {
  constructor(localeMomentService) {
    this.date = moment('2018-01-01');
    this.month = localeMomentService.monthNames[this.date.month()];
    this.events = [
      {
        beginDate: moment("2017-12-31"),
        endDate: moment("2018-01-04"),
        name: "Begin before month and end during month 2017-12-31/2018-01-04",
        color: "#0061ff"
      },
      {
        beginDate: moment("2018-01-30"),
        endDate: moment("2018-02-12"),
        name: "Begin during month and end after month 2018-01-30/2018-02-12",
        color: "#0061ff"
      },
      {
        beginDate: moment("2018-01-22"),
        endDate: moment("2018-01-25"),
        name: "Not show 2018-01-22/2018-01-25",
        color: "#ff001d"
      },
      {
        beginDate: moment("2018-01-26"),
        endDate: moment("2018-01-29"),
        name: "Begin first line and change line in second week 2018-01-26/2018-01-29",
        color: "#1dff00"
      },
      {
        beginDate: moment("2018-01-23"),
        endDate: moment("2018-01-30"),
        name: "Begin second line and change line in second week 2018-01-23/2018-01-30",
        color: "#0061ff"
      },
      {
        beginDate: moment("2018-01-22"),
        endDate: moment("2018-01-22"),
        name: "Not show",
        color: "#ff001d"
      },
      {
        beginDate: moment("2018-01-25"),
        endDate: moment("2018-01-25"),
        name: "Not show",
        color: "#1dff00"
      },
      {
        beginDate: moment("2018-01-25"),
        endDate: moment("2018-01-25"),
        name: "Event on 1 day 2018-01-25",
        color: "#ffc596"
      },
      {
        beginDate: moment("2018-01-25"),
        endDate: moment("2018-01-25"),
        name: "Event on 1 day 2018-01-25",
        color: "#ffc596"
      },
      {
        beginDate: moment("2018-01-19"),
        endDate: moment("2018-01-23"),
        name: "Test superposition number 2 2018-01-19/2018-01-23",
        color: "#ffc596"
      },
      {
        beginDate: moment("2018-01-18"),
        endDate: moment("2018-01-20"),
        name: "Test superposition number 1 2018-01-18/2018-01-20",
        color: "#1dff00"
      },
      {
        beginDate: moment("2018-01-20"),
        endDate: moment("2018-01-22"),
        name: "Test superposition number 3 2018-01-20/2018-01-22",
        color: "#f6bf26"
      },
      {
        beginDate: moment("2017-12-20"),
        endDate: moment("2017-12-25"),
        name: "Before actual Month",
        color: "#f6bf26"
      },
      {
        beginDate: moment("2018-02-20"),
        endDate: moment("2018-02-22"),
        name: "After actual month",
        color: "#f6bf26"
      },
      {
        beginDate: moment("2018-01-29"),
        endDate: moment("2018-01-29"),
        name: "After actual month",
        color: "#f6bf26"
      }
    ];
    this.height = 606;
  }

  clickDay(event) {
    this.event = event;
  }
  static get annotations() {
    return [
      new Component({
        template: `<atlui-agenda style="height: 606px;" (clickDayCallback)="clickDay($event)" [events]="events" [date]="date"></atlui-agenda>`
      })
    ];
  }
}

agendaTestComponent.parameters = [localeMomentService];

describe('agenda', function() {
  this.timeout(4000);
  var fixture, container;

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [AtlantisUiModule.forRoot(), FormsModule],
      declarations: [agendaTestComponent]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(agendaTestComponent);
    fixture.detectChanges();
    container = fixture.componentInstance;
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render 6 week, 42 days, and correct number on each day', fakeAsync(function() {
    var agendaMonth = document.querySelector("atlui-agenda-month");
    var agendaWeek = document.querySelectorAll("atlui-agenda-week");
    var agendaDay = document.querySelectorAll("atlui-agenda-day");
    var month = container.month;
    assert.strictEqual(agendaMonth.textContent.trim(), month.toUpperCase()+" 2018");
    assert.strictEqual(agendaWeek.length, 6);
    assert.strictEqual(agendaDay.length, 42);

    agendaDay.forEach((day, index) => {
      var dayNumber = day.querySelector(".dayDateNumber");
      assert.strictEqual(dayNumber.textContent.trim()%31, ((index+1)%31));
    });
  }));

  it('should show events correctly', fakeAsync(function() {
    var agendaDay = document.querySelectorAll("atlui-agenda-day");
    agendaDay.forEach((day) => {
      if (day.classList.contains("duringEvent")) {
        day.click();
        assert(container.event.events.length > 0, "should have event if class is duringEvent");
        if (container.event.events.length > 3) {
          container.event.events.forEach((event, index) => {
            if (index < 2) {
              assert(!event.moreEvents, "should show this events");
            } else {
              assert(event.moreEvents, "should not show this events");
            }
          });
          assert(day.querySelector(".line-more-events"), "should have more event div if superior to max events per line");
        }
      }
    });
  }));

  it('should show correct events when we grow agenda', fakeAsync(function() {
    //waiting Firefox to implement resizeObserver
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      return;
    }
    var div = document.querySelector("atlui-agenda-calendar");
    div.style.height = '730px';
    container.height = 730;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var agendaDay = document.querySelectorAll("atlui-agenda-day");
    agendaDay.forEach((day) => {
      if (day.classList.contains("duringEvent")) {
        day.click();
        assert(container.event.events.length > 0, "should have event if class is duringEvent");
        if (container.event.events.length > 5) {
          container.event.events.forEach((event, index) => {
            if (index < 4) {
              assert(!event.moreEvents, "should show this events");
            } else {
              assert(event.moreEvents, "should not show this events");
            }
          });
          assert(day.querySelector(".line-more-events"), "should have more event div if superior to max events per line");
        }
      }
    });
  }));

  it('should show correct events when we shrink agenda', fakeAsync(function() {
    //waiting Firefox to implement resizeObserver
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      return;
    }
    var div = document.querySelector("atlui-agenda-calendar");
    div.style.height = '590px';
    container.height = 590;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var agendaDay = document.querySelectorAll("atlui-agenda-day");
    agendaDay.forEach((day) => {
      if (day.classList.contains("duringEvent")) {
        day.click();
        assert(container.event.events.length > 0, "should have event if class is duringEvent");
        if (container.event.events.length > 2) {
          container.event.events.forEach((event, index) => {
            if (index < 1) {
              assert(!event.moreEvents, "should show this events");
            } else {
              assert(event.moreEvents, "should not show this events");
            }
          });
          assert(day.querySelector(".line-more-events"), "should have more event div if superior to max events per line");
        }
      }
    });
  }));
});
