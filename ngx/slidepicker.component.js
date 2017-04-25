import { Component, EventEmitter } from '@angular/core';

export default class slidepickercomponent {
  constructor () {
    this.valueSlideChange = new EventEmitter();
  }

  static get annotations() {
    return [
      new Component({
        selector: 'slidepicker',
        template: `
        <div class="slidepicker slidepicker-vertical">
          <div class="slidepicker-track">
            <span class="slidepicker-handle"></span>
          </div>
          <ul class="slidepicker-label">
            <li *ngFor="let value of slidepickerValues" [class.active]="valueSlide === value">
              {{value}}
            </li>
          </ul>
          <input type="hidden" class="slidepicker-input" [ngModel]="valueSlide" (change)="setValue($event)"/>
        </div>`,
        inputs: ['valueSlide', 'slidepickerValues'],
        outputs: ['valueSlideChange']
      })
    ];
  }

  // event slide value change emit by the slidepicker atlantis ui
  setValue(event){
    this.valueSlide = event.target.value;
    // emit change value on valueSlideChange
    this.valueSlideChange.emit(this.valueSlide);
  }
}

slidepickercomponent.parameters = [];
