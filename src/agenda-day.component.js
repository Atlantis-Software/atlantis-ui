import { Component, EventEmitter } from '@angular/core';

export class agendaDayComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda-day',
        template: `
        <atlui-agenda-day-corner [day]="day">
        </atlui-agenda-day-corner>
        <div (click)="clickMoreEvents($event)" class="line-more-events" *ngIf="day.lastNeedMoreEvents()">
          <atlui-agenda-more-events>
          </atlui-agenda-more-events>
        </div>`,
        inputs: ["day"],
        outputs: ["moreEventsCallback"]
      })
    ];
  }
  constructor() {
    this.day = {};
    this.moreEvents = false;
    this.moreEventsCallback = new EventEmitter();
  }

  clickMoreEvents(event) {
    event.stopPropagation();
    this.moreEventsCallback.emit(this.day);
  }

}

agendaDayComponent.parameters = [];
