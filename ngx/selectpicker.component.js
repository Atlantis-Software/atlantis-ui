import { Component, ContentChildren, forwardRef, ChangeDetectorRef, IterableDiffers} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import selectpickeroptionComponent from './selectpicker-option.component';

export default class selectpickerComponent {
  constructor (changeDetectorRef, differs) {
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.cdr = changeDetectorRef;
    this.val = '';
    this.differ = differs.find([]).create(null);

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
      this.updateOptions();
      this.onModelChange(val);
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  //That check for every selectpicker widget's change.
  ngDoCheck() {
    //We use Array.isArray to verify if this.val is an array so we avoid a angular's error with IterableDiffers
    if (Array.isArray(this.val)) {
      var changes = this.differ.diff(this.val);
      if (changes) {
        this.updateOptions();
      }
    }
  }

  ngOnInit() {
    this.updateOptions();
  }

  ngAfterViewInit() {
    this.updateOptions();
  }

  updateOptions() {
    if (!this.options) {
      return;
    }
    var self = this;
    if (this.multiple && Array.isArray(this.val)) {
      this.options.forEach(function(option) {
        if (self.val.indexOf(option.value) >= 0) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
    } else {
       this.options.forEach(function(option) {
        if (self.val === option.value) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
    }
    this.cdr.detectChanges();
  }

  valueChange() {
    var self = this;
    var value = null;
    if (self.multiple) {
      value = [];
    }
    this.options.forEach(function(option) {
      if (option.selected) {
        if (self.multiple) {
          value.push(option.value);
        } else {
          value = option.value;
        }
      }
    });
    this.val = value;
    this.onModelChange(this.val);
  }
}

selectpickerComponent.parameters = [ChangeDetectorRef, IterableDiffers];
