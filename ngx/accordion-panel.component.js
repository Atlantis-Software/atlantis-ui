import { Component, ContentChildren, ElementRef, forwardRef} from '@angular/core';
import  accordionComponent  from './accordion.component'
import { NG_VALUE_ACCESSOR } from '@angular/forms';


export default class accordionPanelComponent {
  constructor (elementRef) {
    this.elementRef = elementRef;
    this.idPanel = "panel" + Math.floor(Math.random() * (10000000000 - 0));
  }
	static get annotations() {
		return [
			new Component({
        selector: 'accordion-panel',
        template: `
          <div class="panel-heading">
            <h4 class="panel-title">
              <a role="button" data-toggle="collapse" href="{{'#'+idPanel+i}}">
                {{title}}
              </a>
            </h4>
          </div>
          <div id="{{idPanel+i}}" class="panel-collapse collapse">
            <div class="panel-body">
              <ng-content></ng-content>
            </div>
          </div>`,
        inputs: ["title"],
        host: {"class": "panel"},
        styles: [':host {display: block}']
	  	})
		];
	}

  ngAfterViewInit(){
    this.value = this.elementRef.nativeElement;
  }
}

accordionPanelComponent.parameters = [ElementRef];
