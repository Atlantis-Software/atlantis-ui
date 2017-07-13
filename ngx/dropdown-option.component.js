import { Component, ElementRef} from '@angular/core';

export default class dropdownOptionComponent {
  constructor (elementRef) {
    this.elementRef = elementRef;
  }
	static get annotations() {
		return [
			new Component({
        selector: 'dropdown-option',
        template: `
          <ng-content></ng-content>`,
        inputs: ["options"]
	  	})
		];
	}

  ngAfterViewInit(){
    if (!this.value) {
      this.value = this.elementRef.nativeElement.innerText.trim();
    }
  }
}

dropdownOptionComponent.parameters = [ElementRef];
