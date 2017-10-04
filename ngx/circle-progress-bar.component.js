import { Component, ElementRef } from '@angular/core';

export default class circleProgessBarComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'circle-progress-bar, circle-progress-bar-sm, circle-progress-bar-lg',
        template: `
				<div id="cont" [attr.data-percent]="value" class="circle-progress-bar circle-progress-bar-default">
		      <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg">
		        <circle class="background-bar" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
		        <circle class="bar" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
		      </svg>
		    </div>`,
        inputs: ['value']
      })
    ];
  }

  constructor(elementRef) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit() {
    this.circle = this.elementRef.nativeElement.getElementsByClassName("bar")[0];
    this.content = this.elementRef.nativeElement.getElementsByClassName("circle-progress-bar")[0];
    this.tag = this.elementRef.nativeElement.tagName;
    this.style = this.elementRef.nativeElement.classList;
    switch (this.tag) {
      case "CIRCLE-PROGRESS-BAR-SM":
        this.circle.setAttribute("r", 60);
        this.circle.setAttribute("cx", 70);
        this.circle.setAttribute("cy", 70);
        this.content.classList.add("circle-progress-bar-sm");
        break;
      case "CIRCLE-PROGRESS-BAR-LG":
        this.circle.setAttribute("r", 76);
        this.circle.setAttribute("cx", 86);
        this.circle.setAttribute("cy", 86);
        this.content.classList.add("circle-progress-bar-lg");
        break;
      default:
        this.circle.setAttribute("r", 64);
        this.circle.setAttribute("cx", 74);
        this.circle.setAttribute("cy", 74);
        this.content.classList.add("circle-progress-bar-md");
    }
    var self = this;
    this.style.forEach(function(style) {
      self.content.classList.add(style);
    });
    if (typeof this.value !== "number" || this.value === "") {
      this.value = 0;
    }

    if (this.value > 100) {
      this.value = 100;
    } else if (this.value < 0) {
      this.value = 0;
    }
    var r = this.circle.getAttribute("r");
    this.circle.style.strokeDasharray = Math.PI * (r * 2);
    this.updateBar();
  }

  ngOnChanges() {
    if (this.circle) {
      if (typeof this.value !== "number" || this.value === "") {
        this.value = 0;
      }

      if (this.value > 100) {
        this.value = 100;
      } else if (this.value < 0) {
        this.value = 0;
      }
      this.updateBar();
    }
  }

  updateBar() {
    var r = this.circle.getAttribute("r");
    var c = Math.PI * (r * 2);
    var percent = ((100 - this.value) / 100) * c;

    this.circle.style.strokeDashoffset = percent;

  }
}

circleProgessBarComponent.parameters = [ElementRef];
