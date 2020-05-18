import { Directive, ElementRef} from '@angular/core';


export default class indeterminateDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[indeterminate]',
        inputs: ['indeterminate']
      })
    ];
  }

  constructor(elementRef){
    this.elementRef = elementRef;
    this.indeterminate = false;
  }

  set indeterminate(value)
  {
    if (this.elementRef.nativeElement.querySelector('input[type="checkbox"]')) {
      this.elementRef.nativeElement.querySelector('input[type="checkbox"]').indeterminate = value;
    }
  }
}

indeterminateDirective.parameters = [ElementRef];
