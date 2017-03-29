import { Component, ElementRef} from '@angular/core';

export default class selectpickeroptionComponent {
  constructor (elementRef) {
    this.elementRef = elementRef;
  }
	static get annotations() {
		return [
			new Component({
        selector: 'selectpicker-option',
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

selectpickeroptionComponent.parameters = [ElementRef];
