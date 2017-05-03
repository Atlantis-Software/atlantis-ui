import { Component, ElementRef} from '@angular/core';

export default class slidepickeroptionComponent {
  constructor (elementRef) {
    this.elementRef = elementRef;
  }
	static get annotations() {
		return [
			new Component({
        selector: 'slidepicker-option',
        template: "<ng-content></ng-content>",
        inputs: ['value']
	  	})
		];
	}

  ngAfterViewInit() {
    if (!this.value) {
      this.value = this.elementRef.nativeElement.innerText.trim();
    }
  }
}

slidepickeroptionComponent.parameters = [ElementRef];
