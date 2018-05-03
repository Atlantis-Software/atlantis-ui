import { Component } from '@angular/core';

export class agendaDayEventsComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda-day-events',
        template: `
        <atlui-agenda-event *ngFor="let calendarEvent of day.events; let i = index;" [agendaEvent]="calendarEvent" [event]="calendarEvent?.event" [moreEvents]="calendarEvent?.moreEvents" [col]="col" [row]="row" [duration]="calendarEvent?.duration" [name]="calendarEvent?.event.name" [color]="calendarEvent?.event.color" [index]="i" [date]="day.date">
        </atlui-agenda-event>`,
        inputs: ["day", "col", "row"],
      })
    ];
  }
  constructor() {
    this.day = {};
  }

}

agendaDayEventsComponent.parameters = [];
