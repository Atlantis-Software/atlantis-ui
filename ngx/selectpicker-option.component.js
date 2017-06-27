import { Component, ElementRef} from '@angular/core';

export default class selectpickeroptionComponent {
  constructor (elementRef) {
    this.elementRef = elementRef;
    this.selected = false;
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
    if (typeof this.val != 'undefined') {
      this.value = this.elementRef.nativeElement.innerText.trim();
    }

    this.text = this.elementRef.nativeElement.innerText.trim();
  }
}

selectpickeroptionComponent.parameters = [ElementRef];
