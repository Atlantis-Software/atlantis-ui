import { Component, EventEmitter, ContentChildren, forwardRef, ChangeDetectorRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import slidepickeroptionComponent from './slidepicker-option.component';

export default class slidepickercomponent {
  constructor (changeDetectorRef) {
    this.val = '';
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.cdr = changeDetectorRef;
    this.index = 0;
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
    if (val !== this.val) {
      var input = document.getElementsByClassName("slidepicker-input");
      var inputChangeEvent = document.createEvent('Event');
      inputChangeEvent.initEvent('change', true, true);
      input.dispatchEvent(inputChangeEvent);
      this.val = val;
      // this.updateOptions();
      this.onModelChange(val);
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  ngAfterViewInit() {
    // this.setValue();
  }


  // event slide value change emit by the slidepicker atlantis ui
  setValue(event){
    var self = this;
    this.index = event.target.value;
    this.val = this.options.toArray()[this.index].value;
    this.onModelChange(this.val);
    // this.valueSlide = event.target.value;
    // // emit change value on valueSlideChange
    // this.valueSlideChange.emit(this.valueSlide);
  }
}

slidepickercomponent.parameters = [ChangeDetectorRef];
