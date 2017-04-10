import { Component, EventEmitter } from '@angular/core';

export default class datePickerRangeComponent {
  constructor () {
    this.datesChange = new EventEmitter();
    this.resultDateStartChange = new EventEmitter();
    this.resultDateEndChange = new EventEmitter();
  }
	static get annotations() {
		return [
			new Component({
        selector: 'myDatePickerRange',
        template: require('./datePickerRange.html'), 
        inputs: ['dateStart', 'dateEnd'], 
        outputs: ['datesChange: getDates', 'resultDateStartChange: dateStartChange', 'resultDateEndChange: dateEndChange']
	  	})
		];
	}

  // event change emit by the datepicker atlantis ui
  getDates(event){
    this.dateEnd = event.target.lastElementChild.value;
    this.dateStart = event.target.firstElementChild.value;
    this.datesChange.emit(event);
    // emit change value on dateStart and dateEnd
    this.resultDateStartChange.emit(this.dateStart);
    this.resultDateEndChange.emit(this.dateEnd);
  }
}

datePickerRangeComponent.parameters = [];