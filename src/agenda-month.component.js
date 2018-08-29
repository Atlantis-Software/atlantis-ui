import { Component, EventEmitter } from '@angular/core';
import { localeMomentService } from './localeMoment.service.js';

// Component with the name of the month and year
export class agendaMonthComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda-month',
        template: `
          {{ locale.monthNames[month] + " " + year | uppercase}}`,
        inputs: ["month", "year"],
        outputs: ["monthChange", "yearChange"]
      })
    ];
  }
  constructor(localeMoment) {
    this.locale = localeMoment;
    this.month = moment().month();
    this.year = moment().year();
    this.monthChange = new EventEmitter();
    this.yearChange = new EventEmitter();
  }

}

agendaMonthComponent.parameters = [localeMomentService];
