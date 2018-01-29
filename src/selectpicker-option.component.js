import { Component, ElementRef } from '@angular/core';

export default class selectpickeroptionComponent {
  constructor(elementRef) {
    this.elementRef = elementRef;
    // by default value is not selected
    this.selected = false;
  }
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-selectpicker-option',
        template: "<ng-content></ng-content>",
        inputs: ['value']
      })
    ];
  }

  // for the bind value work we must do it in the ngAfterViewInit function
  // baecause wa can't not acces to bind value before in the Lifecycle Hooks
  ngAfterViewInit() {
    this.text = this.elementRef.nativeElement.innerHTML.trim();
    // if value is not defined it take value of the text
    if (typeof this.value === void 0) {
      this.value = this.elementRef.nativeElement.innerHTML.trim();
    }
  }
}

selectpickeroptionComponent.parameters = [ElementRef];
