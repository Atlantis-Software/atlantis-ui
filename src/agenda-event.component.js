import { Component } from '@angular/core';

// Component that show event
export class agendaEventComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda-event',
        template: `
        <div *ngIf="event && !moreEvents" class="event"
          [ngClass]="{'showEvent': agendaEvent.isBeginEventOrBeginWeek(col, date) === 1 }"
          [ngStyle]="{'left': (100/7)*col + '%', 'width': (100/7)*duration + '%', 'top': index + 'em', opacity: agendaEvent.isBeginEventOrBeginWeek(col, date) }">
          <div class="eventName" [ngStyle]="{'background-color': color}">
            <div [ngClass]="{'beginBefore': col === 0 && row === 0 && agendaEvent.beginBefore(date), 'endAfter': col === 6 && row === 5 && agendaEvent.endAfter(date)}">
            </div>
            <span>
              {{ name }}
            </span>
          </div>
        </div>`,
        inputs: ["event", "moreEvents", "col", "row", "duration", "name", "color", "index", "date", "agendaEvent"],
      })
    ];
  }
  constructor() {
    this.day = {};
  }

}

agendaEventComponent.parameters = [];
