import { Component, EventEmitter, ContentChildren, forwardRef, ChangeDetectorRef, ElementRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import slidepickeroptionComponent from './slidepicker-option.component';

export default class slidepickercomponent {
  constructor (changeDetectorRef, elementRef) {
    this.val = '';
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.cdr = changeDetectorRef;
    this.index = 0;
    this.elementRef = elementRef;
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
            <li *ngFor="let option of options">
              <input type="hidden" [(ngModel)]="option.value"/>
              <a [innerHTML]="option.elementRef.nativeElement.innerHTML"></a>
            </li>
          </ul>
          <input type="hidden" class="slidepicker-input" [(ngModel)]="index" (change)="setValue($event)"/>
        </div>`,
        // inputs: ['valueSlide', 'slidepickerValues'],
        // outputs: ['valueSlideChange'],
        queries: {
          options: new ContentChildren(slidepickeroptionComponent)
        },
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => slidepickercomponent),
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
    var self = this;
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
      if (this.options) {

        //Transform from angular queries object (this.options) to flat array.
        var options = this.options.toArray();
        options.forEach(function(element, index) {
          // Check index value.
          if (element.value === self.val) {
            self.index = index;
            self.updateHandlerPosition();
          }
        });
      }
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  // event slide value change emit by the slidepicker atlantis ui
  setValue(event){
    var self = this;
    if (event.target.value !== "" && this.index !== event.target.value) {
      this.index = event.target.value;
      if (this.options) {
        this.val = this.options.toArray()[this.index].value;
        this.onModelChange(this.val);
      }
    }
  }

  // Send value to jquery to update curser position
  updateHandlerPosition(){
    var input = this.elementRef.nativeElement.getElementsByClassName("slidepicker-input");
    input[0].value = this.index;
    var inputChangeEvent = document.createEvent('Event');
    inputChangeEvent.initEvent('change', true, true);
    input[0].dispatchEvent(inputChangeEvent);
    this.cdr.detectChanges();
  }
}

slidepickercomponent.parameters = [ChangeDetectorRef, ElementRef];
