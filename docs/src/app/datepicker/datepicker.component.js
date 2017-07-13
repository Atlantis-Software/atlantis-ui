import {Component} from '@angular/core';

export default  class DropdownComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./datepicker.html')
      })
    ]
  }
  constructor(){
    this.DatepickerRangeHtml = `
    <div class="form-group">
      <label for="rangeDatePicker">datepicker range</label>
      <div id="rangeDatePicker" class="input-group">
        <input class="form-control start" type="date">
        <span class="input-group-addon"></span>
        <input class="form-control end" type="date">
      </div>
    </div>`

    this.DatepickerSimpleHtml = `
    <div class="form-group">
        <label for="singleDatePicker">datepicker</label>
        <input id="singleDatePicker" type="date" class="form-control">
    </div>`
    
    this.Display = "Example";
  }
}


DropdownComponent.parameters = [];
