import { Component, ContentChildren, ElementRef} from '@angular/core';
import carouselItemComponent from './carousel-item.component';

export default class carouselComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'carousel',
        template: `
        <div [attr.id]="idCarousel" class="carousel slide" data-ride="carousel">
          <ol *ngIf="options.indicator" class="carousel-indicators">
            <li *ngFor="let Item of Items; let i = index" [attr.data-target]="'#'+idCarousel" [attr.data-slide-to]="i"></li>
          </ol>

          <div class="carousel-inner">
            <ng-content></ng-content>
          </div>

          <a class="left carousel-control" href="{{'#'+idCarousel}}" role="button" data-slide="prev">
            <i class="icon icon-previous" aria-hidden="true"></i>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="{{'#'+idCarousel}}" role="button" data-slide="next">
            <i class="icon icon-next" aria-hidden="true"></i>
            <span class="sr-only">Next</span>
          </a>
        </div>`,
        queries: {
          Items: new ContentChildren(carouselItemComponent)
        },
        inputs: ["options"]
      })
    ];
  }
  constructor(elementRef,) {
    this.elementRef = elementRef;
    this.idCarousel = "Carousel" + Math.floor(Math.random() * (10000000000 - 0));
  }

  ngAfterViewInit(){
    var self = this;
    var items = this.Items.toArray();

      if (this.options.activeDefault !== "" && typeof this.options.activeDefault === "number" && this.options.activeDefault >= 0) {
        if( this.options.activeDefault === items.length){
          this.options.activeDefault = items.length-1;
        } else if ( this.options.activeDefault > items.length){
          this.options.activeDefault = 0;
        }
      }else {
        this.options.activeDefault = 0;
      }
      var activeItem = this.elementRef.nativeElement.getElementsByClassName("item")[this.options.activeDefault];
      activeItem.classList.add("active");
      if (this.options.indicator){
        var activeIndicator = self.elementRef.nativeElement.getElementsByTagName("li")[this.options.activeDefault];
        activeIndicator.classList.add("active");
      }

      // items.forEach(function(element, index) {
      //   if (element.options.active) {
      //     var activeIndicator = self.elementRef.nativeElement.getElementsByTagName("li")[index];
      //     var activeItem = self.elementRef.nativeElement.getElementsByClassName("item")[index];
      //     activeIndicator.classList.add("active");
      //     activeItem.classList.add("active");
      //
      //   }
      // });


    this.carousel = this.elementRef.nativeElement.getElementsByClassName("carousel")[0];

    if (this.options.interval !== "" && typeof this.options.interval === "number") {
      if(this.options.interval < 2000){
        this.options.interval = 2000
      }
      this.carousel.setAttribute("data-interval", this.options.interval);
    }
    if (this.options.pause !== "" && typeof this.options.pause !== "undefined") {
      if (this.options.pause !== "hover" || this.options.pause !== "null"){
        this.options.pause === "hover"
      }
      this.carousel.setAttribute("data-pause", this.options.pause);
    }

  }

}

carouselComponent.parameters = [ElementRef];
