import { Component, EventEmitter } from '@angular/core';

export default class datePickerRangeComponent {
  constructor () {
    this.startChange = new EventEmitter();
    this.endChange = new EventEmitter();
  }

  static get annotations() {
    return [
      new Component({
        selector: 'datepicker-range',
        template: require('./datePickerRange.html'), 
        inputs: ['start', 'end'], 
        outputs: ['startChange', 'endChange']
      })
    ];
  }

  // event start change emit by the datepicker atlantis ui
  setStart(event){
    this.start = event.target.value;
    // emit change value on startChange
    this.startChange.emit(this.start);
  }

  // event end change emit by the datepicker atlantis ui
  setEnd(event){
    this.end = event.target.value;
    // emit change value on endChange
    this.endChange.emit(this.end);
  }
}

datePickerRangeComponent.parameters = [];
