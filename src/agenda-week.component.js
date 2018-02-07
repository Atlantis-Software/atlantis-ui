import { Component, EventEmitter } from '@angular/core';

export class agendaWeekComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda-week',
        template: `
        <div class="week">
          <atlui-agenda-day (click)="showDay(day)" *ngFor="let day of week; let dayIndex = index" [day]="day"  [ngClass]="classes[dayIndex]" (moreEventsCallback)="moreEventsCallback.emit()">
          </atlui-agenda-day>
        </div>
        <div class="weekEvents">
          <div class="events" [ngStyle]="{'height.em':weekHeight}">
            <atlui-agenda-day-events  *ngFor="let day of week; let dayIndex = index" [day]="day" [col]="dayIndex" [row]="row">
            </atlui-agenda-day-events>
          </div>
        </div>`,
        inputs: ["week", "classes", "weekHeight", "row"],
        outputs: ["clickDayCallback", "moreEventsCallback"]
      })
    ];
  }
  constructor() {
    this.week = [];
    this.classes = [];
    this.weekHeight = 0;
    this.clickDayCallback = new EventEmitter();
    this.moreEventsCallback = new EventEmitter();
  }

  showDay(day) {
    this.clickDayCallback.emit(day);
  }

}

agendaWeekComponent.parameters = [];
