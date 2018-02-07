import { Component, EventEmitter } from '@angular/core';

export class agendaComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda',
        template: `
        <atlui-agenda-month [(month)]="month" [(year)]="year">
        </atlui-agenda-month>
        <atlui-agenda-day-name>
        </atlui-agenda-day-name>
        <atlui-agenda-calendar [events]="events"
          (clickDayCallback)="clickDayCallback.emit()"
          (moreEventsCallback)="moreEventsCallback.emit()">
        </atlui-agenda-calendar>`,
        inputs: ["events"],
        outputs: ["clickDayCallback", "moreEventsCallback"]
      })
    ];
  }
  constructor() {
    this.events = [];
    this.month = moment("2018-01-01").month();
    this.year = moment("2018-01-01").year();
    this.clickDayCallback = new EventEmitter();
    this.moreEventsCallback = new EventEmitter();
  }

}

agendaComponent.parameters = [];
