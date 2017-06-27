import { Component, ContentChildren, forwardRef, ChangeDetectorRef, IterableDiffers, ElementRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import selectpickeroptionComponent from './selectpicker-option.component';

export default class selectpickerComponent {
  constructor (changeDetectorRef, differs, elementRef) {
    this.elementRef = elementRef;
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.cdr = changeDetectorRef;
    this.isOpen = false;
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
        }], 
        // need click outsite component
        host: {
          '(document:click)': 'handleClick($event)',
        }
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
      this.updateOptions();
    }
  }

  updateOptions() {
    var self = this;
    if (this.multiple && Array.isArray(this.val)) {
      this.SelectedValuesText = [];
      this.options.forEach(function(option){
        var index = self.val.indexOf(option.value);
        if (index > -1) {
          option.selected = true;
          self.SelectedValuesText.push(option.text);
        } else {
          option.selected = false;
        }
      })
    }
    // if not error
    this.cdr.detectChanges();
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

  // click outsite component
  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.isOpen = false;
    }
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
        this.val.splice(index, 1);
      }
      if (indexText > -1) {
        this.SelectedValuesText.splice(indexText, 1);
      }
    } else {
      option.selected = true;
     this.val.push(option.value);
     this.SelectedValuesText.push(option.text);
    }
    this.onModelChange(this.val.slice(0));
  }
}

selectpickerComponent.parameters = [ChangeDetectorRef, IterableDiffers, ElementRef];
