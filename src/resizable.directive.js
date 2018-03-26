import { Directive, ElementRef, Renderer2 } from '@angular/core';

export class resizableDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[atlui-resizable]',
        inputs: ['resizable: atlui-resizable', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight']
      })
    ];
  }

  constructor(ElementRef, Renderer2){
    this.renderer = Renderer2;
    this.elementRef = ElementRef;
    this.isResizable = false;
    this.maxWidth = "600px";
    this.maxHeigh = "300px";
    this.minWidth = "300px";
    this.minHeight = "100px";
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
      this.renderer.setStyle(this.element, "max-width", this.maxWidth);
      this.renderer.setStyle(this.element, "max-height", this.maxHeight);
      this.renderer.setStyle(this.element, "min-width", this.minWidth);
      this.renderer.setStyle(this.element, "min-height", this.minHeight);
    }
  }

  ngOnChanges() {
    if (this.isResizable) {
      this.element = this.elementRef.nativeElement;
      this.renderer.setStyle(this.element, "resize",'both');
      this.renderer.setStyle(this.element, "overflow",'auto');
      this.renderer.setStyle(this.element, "max-width", this.maxWidth);
      this.renderer.setStyle(this.element, "max-height", this.maxHeight);
      this.renderer.setStyle(this.element, "min-width", this.minWidth);
      this.renderer.setStyle(this.element, "min-height", this.minHeight);
    }
  }
}

resizableDirective.parameters = [ElementRef, Renderer2];
