import { Component, ElementRef} from '@angular/core';

export default class carouselItemComponent {
  constructor (elementRef) {
    this.elementRef = elementRef;
  }
	static get annotations() {
		return [
			new Component({
        selector: 'carousel-item',
        template: `
          <ng-content>
          </ng-content>`,
        host: {"class": "item"},
	  	})
		];
	}

  ngOnInit(){
  }
}

carouselItemComponent.parameters = [ElementRef];
