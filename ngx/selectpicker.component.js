import { Component, ContentChildren, forwardRef, ChangeDetectorRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import selectpickeroptionComponent from './selectpicker-option.component';

export default class selectpickerComponent {
  constructor (changeDetectorRef) {
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.cdr = changeDetectorRef;
    this.isOpen = false;
  }
	static get annotations() {
		return [
			new Component({
        selector: 'selectpicker',
        template: require('./selectpicker.html'),
        inputs: ['multiple'],
        queries: {
          options: new ContentChildren(selectpickeroptionComponent)
        },
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => selectpickerComponent),
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
      var self = this;
      // iniliaze list with selected values
      if (this.val) {
        this.SelectedValuesText = [];
        this.options.toArray().forEach(function(option){
          var index = self.val.indexOf(option.value);
          if (index > -1) {
            option.selected = true;
            self.SelectedValuesText.push(option.text);
          }
        })
        // if not error
        this.cdr.detectChanges();
      }
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  Open() {
    this.isOpen = this.isOpen ? false : true;
  }

  selectOption(option){
    if (!this.val) {
      this.val = [];
    }
    if (!this.SelectedValuesText) {
      this.SelectedValuesText = [];
    }
    if (option.selected) {
      option.selected = false;
      var index = this.val.indexOf(option.value);
      var indexText = this.SelectedValuesText.indexOf(option.text);
      if (index > -1) {
        //this.val = this.val.splice(index, 1);
        this.val.splice(index, 1);
      }
      if (indexText > -1) {
        this.SelectedValuesText.splice(indexText, 1);
      }
    } else {
      option.selected = true;
     //this.val = this.val.push(option.value);
     this.val.push(option.value);
     this.SelectedValuesText.push(option.text);
    }
    //this.onModelChange(this.val.toArray());
    this.onModelChange(this.val.slice(0));
  }
}

selectpickerComponent.parameters = [ChangeDetectorRef];
