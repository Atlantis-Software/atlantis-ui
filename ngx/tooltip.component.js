import { Component, Directive, ElementRef, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';

export class tooltipComponent {
  constructor(elementRef) {
    this.elementRef = elementRef;
    this.show = false;
    this.placementCorrect = false;
    this.active = false;
  }
  static get annotations() {
    return [
      new Component({
        selector: 'tooltipComponent',
        template: `
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner">{{tooltipContent}}</div>`,
        inputs: ["tooltipDirection", "tooltipContent"],
        host: {
          '[class]': '"tooltip fade "+tooltipDirection',
          '[class.in]': "classIn"
        },
        styles: [
          `:host {
            display: block;
            z-index: -1;
          }
          :host.in {
            z-index: 1070;
          }`
        ]
      })
    ];
  }

}

tooltipComponent.parameters = [ElementRef];


export class tooltipDirective {
  constructor(ComponentFactoryResolver, ElementRef, Injector, ApplicationRef) {
    this.ElementRef = ElementRef;
    this.injector = Injector;
    this.applicationRef = ApplicationRef;
    this.tooltipComponentFactory = ComponentFactoryResolver.resolveComponentFactory(tooltipComponent);
  }

  static get annotations() {
    return [
      new Directive({
        selector: '[tooltip]',
        inputs: ["tooltipDirection", "tooltipContent"],
        host: {
          "(mouseenter)": "open()",
          "(mouseleave)": "close()"
        }
      })
    ];
  }

  ngAfterContentInit() {
    this.tooltipRef = this.tooltipComponentFactory.create(this.injector);
    this.applicationRef.attachView(this.tooltipRef.hostView);
    document.querySelector('body').appendChild(this.tooltipRef.location.nativeElement);
    this.tooltipRef.instance.tooltipDirection = this.tooltipDirection;
    this.tooltipRef.instance.tooltipContent = this.tooltipContent;
    this.tooltipRef.changeDetectorRef.detectChanges();
  }

  ngOnChanges() {
    if (this.tooltipRef) {
      this.tooltipRef.instance.tooltipDirection = this.tooltipDirection;
      this.tooltipRef.instance.tooltipContent = this.tooltipContent;
    }
  }

  ngOnDestroy() {
    if (this.tooltipRef) {
      this.tooltipRef.destroy();
      this.tooltipRef = null;
    }
  }

  open() {
    this.position = this.getPosition(this.ElementRef.nativeElement);
    this.tooltip = this.tooltipRef.location.nativeElement;
    var tooltipHeight = this.tooltip.clientHeight;
    var tooltipWidth = this.tooltip.clientWidth;
    var placement = this.tooltipDirection == 'bottom' ? { top: this.position.top + this.position.height, left: this.position.left + this.position.width / 2 - tooltipWidth / 2 } :
      this.tooltipDirection == 'top' ? { top: this.position.top - tooltipHeight, left: this.position.left + this.position.width / 2 - tooltipWidth / 2 } :
      this.tooltipDirection == 'left' ? { top: this.position.top + this.position.height / 2 - tooltipHeight / 2, left: this.position.left - tooltipWidth } : { top: this.position.top + this.position.height / 2 - tooltipHeight / 2, left: this.position.left + this.position.width };
    this.tooltip.style.top = placement.top + "px";
    this.tooltip.style.left = placement.left + "px";
    this.tooltipRef.instance.classIn = true;
  }

  close() {
    this.tooltipRef.instance.classIn = false;
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

tooltipDirective.parameters = [ComponentFactoryResolver, ElementRef, Injector, ApplicationRef];
