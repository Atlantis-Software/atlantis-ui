import { Component } from '@angular/core';

// Define the corner with more events button
export class agendaMoreEventsComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-agenda-more-events',
        template: `<span class="icon icon-add"></span>`
      })
    ];
  }
  constructor() {
  }

}

agendaMoreEventsComponent.parameters = [];
