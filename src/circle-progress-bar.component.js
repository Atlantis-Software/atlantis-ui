import { Component, ElementRef } from '@angular/core';

export default class circleProgessBarComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-circle-progress-bar, atlui-circle-progress-bar-sm, atlui-circle-progress-bar-lg',
        template: `
        <div [attr.data-percent]="value" class="circle-progress-bar circle-progress-bar-default">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
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
    this.circleBackground = this.elementRef.nativeElement.getElementsByClassName("background-bar")[0];
    this.content = this.elementRef.nativeElement.getElementsByClassName("circle-progress-bar")[0];
    this.style = this.elementRef.nativeElement.classList;
    this.tag = this.elementRef.nativeElement.tagName;

    this.content.classList.add(this.tag.toLowerCase());

    var contentWidth = this.content.offsetWidth;
    this.c = contentWidth / 2;
    this.r = this.c - 10;
    this.circle.setAttribute("r", this.r);
    this.circle.setAttribute("cx", this.c);
    this.circle.setAttribute("cy", this.c);
    this.circleBackground.setAttribute("r", this.r);
    this.circleBackground.setAttribute("cx", this.c);
    this.circleBackground.setAttribute("cy", this.c);
    for (var prop in this.style){
      if (Object.prototype.hasOwnProperty.call(this.style, prop)) {
        this.content.classList.add(this.style[prop]);
      }
    }

    if (typeof this.value !== "number" || this.value === "") {
      this.value = 0;
    }

    if (this.value > 100) {
      this.value = 100;
    } else if (this.value < 0) {
      this.value = 0;
    }
    this.circle.style.strokeDasharray = Math.PI * (this.r * 2);
    this.circleBackground.style.strokeDasharray = Math.PI * (this.r *2);
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

  //Update the progression on the bar
  updateBar() {
    var percent = ((100 - this.value) / 100) * (Math.PI * (this.r*2));

    this.circle.style.strokeDashoffset = percent;

  }
}

circleProgessBarComponent.parameters = [ElementRef];
