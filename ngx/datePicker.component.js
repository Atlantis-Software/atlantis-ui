import { Component, ContentChildren, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export default class datePickerComponent {
  constructor (elementRef) {
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.val = '';
    this.elementRef = elementRef;
  }
	static get annotations() {
		return [
			new Component({
        selector: 'myDatePicker',
        template: require('./datePicker.html'),
        // necessary to use ngModel
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => datePickerComponent),
          multi: true
        }]
	  	})
		];
	}

  get value() {
    return this.val;
  }
  set value(val) {
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
    }
  }
  writeValue(val) {
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
    }
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  // event on change value
  valueChange(event) {
    // change the value
    this.val = event.target.value ;
    // emit the change
    this.onModelChange(this.val);
  }
}

datePickerComponent.parameters = [ElementRef];