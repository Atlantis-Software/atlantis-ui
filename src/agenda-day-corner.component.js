import { Component } from '@angular/core';

export class agendaDayCornerComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda-day-corner',
        template: `
        <div class="dayDateNumber">
          {{ day.date.date() }}
        </div>`,
        inputs: ["day"],
      })
    ];
  }
  constructor() {
    this.day = {};
  }

}

agendaDayCornerComponent.parameters = [];
