import { Directive, ElementRef, EventEmitter } from '@angular/core';

export default class atlModelDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[atlmodel]',
        inputs: ['atlmodel'],
        outputs: ['atlmodelChange']
      })
    ];
  }

  constructor(elementRef) {
    this.atlmodelChange = new EventEmitter();
    this.elementRef = elementRef;
  }

  get atlmodel() {
    return this.model;
  }

  set atlmodel(val) {
    this.model = val;
    if (this.model) {
      this.elementRef.nativeElement.checked = true;
    } else {
      this.elementRef.nativeElement.checked = false;
    }
    this.emitChange();
    this.atlmodelChange.emit(this.model);
  }

  emitChange() {
    var changeEvent = document.createEvent('Event');
    changeEvent.initEvent('change', true, true);
    this.elementRef.nativeElement.dispatchEvent(changeEvent);
  }

  ngAfterViewInit() {
    var self = this;
    this.elementRef.nativeElement.addEventListener('change', function() {
      self.model = self.elementRef.nativeElement.checked;
      self.atlmodelChange.emit(self.model);
    }, true);
  }



}

atlModelDirective.parameters = [ElementRef];
