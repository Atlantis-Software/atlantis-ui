import { Component, EventEmitter } from '@angular/core';
import { localeMomentService } from './localeMoment.service.js';

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
    this.month = 0;
    this.year = 0;
    this.monthChange = new EventEmitter();
    this.yearChange = new EventEmitter();
  }

}

agendaMonthComponent.parameters = [localeMomentService];
