import { Component, Directive, ElementRef, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';

export class popoverComponent {
  constructor(elementRef) {
    this.elementRef = elementRef;
    this.show = false;
    this.placementCorrect = false;
    this.classIn = false;
  }
  static get annotations() {
    return [
      new Component({
        selector: 'popoverComponent',
        template: `
        <div class="arrow"></div>
        <h3 class="popover-title">{{popoverTitle}}</h3>
        <div class="popover-content">{{popoverContent}}</div>`,
        inputs: ["popoverDirection", "popoverContent", "popoverTitle"],
        host: {
          '[class]': '"popover fade "+popoverDirection',
          '[class.in]': "classIn"
        },
        styles: [
          `:host {
            display: block;
          }`
        ]
      })
    ];
  }

}

popoverComponent.parameters = [ElementRef];


export class popoverDirective {
  constructor(ComponentFactoryResolver, ElementRef, Injector, ApplicationRef) {
    this.ElementRef = ElementRef;
    this.popoverComponentFactory = ComponentFactoryResolver.resolveComponentFactory(popoverComponent);
    this.injector = Injector;
    this.applicationRef = ApplicationRef;

  }

  static get annotations() {
    return [
      new Directive({
        selector: '[popover]',
        inputs: ["popoverDirection", "popoverContent", "popoverTitle"],
        host: {
          "(click)": "toggle()",
        }
      })
    ];
  }

  ngAfterContentInit() {
    this.popoverRef = this.popoverComponentFactory.create(this.injector);
    this.applicationRef.attachView(this.popoverRef.hostView);
    document.querySelector('body').appendChild(this.popoverRef.location.nativeElement);
    this.popoverRef.instance.popoverDirection = this.popoverDirection;
    this.popoverRef.instance.popoverTitle = this.popoverTitle;
    this.popoverRef.instance.popoverContent = this.popoverContent;
    this.popoverRef.changeDetectorRef.detectChanges();
  }

  ngOnChanges() {
    if (this.popoverRef) {
      this.popoverRef.instance.popoverDirection = this.popoverDirection;
      this.popoverRef.instance.popoverTitle = this.popoverTitle;
      this.popoverRef.instance.popoverContent = this.popoverContent;
    }
  }

  ngOnDestroy() {
    if (this.popoverRef) {
      this.popoverRef.destroy();
      this.popoverRef = null;
    }
  }

  toggle() {
    if (this.popoverRef.instance.classIn) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.position = this.getPosition(this.ElementRef.nativeElement);
    this.popover = this.popoverRef.location.nativeElement;
    var popoverHeight = this.popover.clientHeight;
    var popoverWidth = this.popover.clientWidth;
    var placement = this.popoverDirection == 'bottom' ? { top: this.position.top + this.position.height, left: this.position.left + this.position.width / 2 - popoverWidth / 2 } :
      this.popoverDirection == 'top' ? { top: this.position.top - popoverHeight, left: this.position.left + this.position.width / 2 - popoverWidth / 2 } :
      this.popoverDirection == 'left' ? { top: this.position.top + this.position.height / 2 - popoverHeight / 2, left: this.position.left - popoverWidth } : { top: this.position.top + this.position.height / 2 - popoverHeight / 2, left: this.position.left + popoverWidth };
    this.popover.style.top = placement.top + "px";
    this.popover.style.left = placement.left + "px";
    this.popoverRef.instance.classIn = true;
  }

  close() {
    this.popoverRef.instance.classIn = false;
  }

  getPosition(element) {
    var left = 0;
    var top = 0;
    var height = element.clientHeight;
    var width = element.clientWidth;
    while (element.offsetParent != undefined && element.offsetParent != null) {
      left += element.offsetLeft + (element.clientLeft != null ? element.clientLeft : 0);
      top += element.offsetTop + (element.clientTop != null ? element.clientTop : 0);
      element = element.offsetParent;
    }
    return { "left": left, "top": top, "height": height, "width": width };
  }

}

popoverDirective.parameters = [ComponentFactoryResolver, ElementRef, Injector, ApplicationRef];
