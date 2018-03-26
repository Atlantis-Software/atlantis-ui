import { Directive, ElementRef } from '@angular/core';

export class codeDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '.atlui-code'
      })
    ];
  }

  constructor(elementRef) {
    this.elementRef = elementRef;
    this.elementRef.nativeElement.readOnly = true;
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 2 + "px";
  }
}

codeDirective.parameters = [ElementRef];
