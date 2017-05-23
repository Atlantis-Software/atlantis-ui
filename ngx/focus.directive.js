import { Directive, ElementRef} from '@angular/core';


export default class focusDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[focus]',
        inputs: ['focus']
      })
    ];
  }

  constructor(elementRef){
    this.elementRef = elementRef;
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.focus()
  }
}

focusDirective.parameters = [ElementRef];
