import { Directive, ElementRef } from '@angular/core';


export default class affixDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[affix]',
        inputs: ['affix']
      })
    ];
  }

  constructor(elementRef) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit() {
    this.offsetTop = this.elementRef.nativeElement.offsetTop;
    this.elementRef.nativeElement.setAttribute("data-spy", "affix");
    this.elementRef.nativeElement.setAttribute("data-offset-top", this.offsetTop);
    this.elementRef.nativeElement.style.top = (this.affix + "px") || "0px";
  }
}

affixDirective.parameters = [ElementRef];
