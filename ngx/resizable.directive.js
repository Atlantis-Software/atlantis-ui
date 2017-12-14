import { Directive, ElementRef, Renderer2 } from '@angular/core';

export class resizableDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[resizable]',
        inputs: ['resizable', 'options']
      })
    ];
  }

  constructor(ElementRef, Renderer2){
    this.renderer = Renderer2;
    this.elementRef = ElementRef;
    this.isResizable = true;
    this.options = {
      maxWidth: "600px",
      maxHeight: "300px",
      minWidth: "300px",
      minHeight: "100px"
    };
  }

  set resizable(setting) {
    if (setting !== void 0 && setting !== null && setting !== '') {
      this.isResizable = !!setting;

      this.element = this.elementRef.nativeElement;
      if (this.isResizable) {
        this.renderer.setStyle(this.element, "resize",'both');
        this.renderer.setStyle(this.element, "overflow",'auto');
      } else {
        this.renderer.removeStyle(this.element, 'resize');
        this.renderer.removeStyle(this.element, 'overflow');
      }
    }
  }

  ngAfterViewInit() {
    if (this.isResizable) {
      this.element = this.elementRef.nativeElement;
      this.renderer.setStyle(this.element, "resize",'both');
      this.renderer.setStyle(this.element, "overflow",'auto');
      this.renderer.setStyle(this.element, "max-width", this.options.maxWidth);
      this.renderer.setStyle(this.element, "max-height", this.options.maxHeight);
      this.renderer.setStyle(this.element, "min-width", this.options.minWidth);
      this.renderer.setStyle(this.element, "min-height", this.options.minHeight);
    }
  }

  ngOnChanges() {
    if (this.isResizable) {
      this.element = this.elementRef.nativeElement;
      this.renderer.setStyle(this.element, "resize",'both');
      this.renderer.setStyle(this.element, "overflow",'auto');
      this.renderer.setStyle(this.element, "max-width", this.options.maxWidth);
      this.renderer.setStyle(this.element, "max-height", this.options.maxHeight);
      this.renderer.setStyle(this.element, "min-width", this.options.minWidth);
      this.renderer.setStyle(this.element, "min-height", this.options.minHeight);
    }
  }
}

resizableDirective.parameters = [ElementRef, Renderer2];
