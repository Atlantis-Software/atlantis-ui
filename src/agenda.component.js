import { Component, EventEmitter, ElementRef } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

// Component use by the dev to instantiate an agenda
export class agendaComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda',
        template: `
        <div class="atlui-agenda">
          <atlui-agenda-month [(month)]="month" [(year)]="year">
          </atlui-agenda-month>
          <atlui-agenda-day-name>
          </atlui-agenda-day-name>
          <atlui-agenda-calendar
            [events]="events"
            [agendaHeight]="agendaHeight"
            [month]="date"
            (clickDayCallback)="clickDay($event)"
            (moreEventsCallback)="clickMoreEvents($event)">
          </atlui-agenda-calendar>
        </div>`,
        inputs: ["events", "date"],
        outputs: ["clickDayCallback", "moreEventsCallback"]
      })
    ];
  }
  constructor(ElementRef) {
    this.events = [];
    this.date = moment();
    this.month = this.date.month();
    this.year = this.date.year();
    this.clickDayCallback = new EventEmitter();
    this.moreEventsCallback = new EventEmitter();
    this.elementRef = ElementRef;
  }

  clickDay($event) {
    this.clickDayCallback.emit($event);
  }

  clickMoreEvents($event) {
    this.moreEventsCallback.emit($event);
  }

  ngOnChanges() {
    this.month = this.date.month();
    this.year = this.date.year();
  }

  ngOnDestroy() {
    if (this.ro) {
      this.ro.disconnect();
      this.ro = null;
    }
  }

  // use resizeObserver for know when the agenda change and adapts all with that
  ngAfterViewInit() {
    this.ro = new ResizeObserver((entry)=>{
      this.agendaHeight = entry[0].contentRect.height;
    });
    var div = this.elementRef.nativeElement.querySelector("atlui-agenda-calendar");
    this.ro.observe(div);
  }
}

agendaComponent.parameters = [ElementRef];
