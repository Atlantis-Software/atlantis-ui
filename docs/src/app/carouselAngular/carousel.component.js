import {Component} from '@angular/core';

export default  class CarouselAngularComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./carousel.html')
      })
    ]
  }
  constructor(){

    this.carouselHtml = `
    <carousel [idCarousel]="'test'" [options]="optionsCarousel">
      <carousel-item>
        <img class="img-responsive center-block" src="../../img/carousel04.jpg" alt="">
        <div class="carousel-caption">
          Slide 1
        </div>
      </carousel-item>
      <carousel-item [options]="optionsItem2">
        test2
      </carousel-item>
    </carousel>`
    this.carrouselSlideNgIf= `
    <carousel-item *ngIf="show1">
      <img class="img-responsive center-block" src="../../img/carousel04.jpg" alt="">
      <div class="carousel-caption">
        Slide 1
      </div>
    </carousel-item>`;

    this.carouselNgFor= `
    <carousel [options]="optionsCarousel">
      <carousel-item *ngFor="let carouselItem of carouselItems">
        <img class="img-responsive center-block" src="../../img/carousel04.jpg" alt="">
        <div class="carousel-caption">
          {{carouselItem.label}}
        </div>
      </carousel-item>
    </carousel>`;

    this.carouselNgForItems = `
    this.carouselItems = [
      {
        label: "slide1",
      },
      {
        label: "slide2",
      },
      {
        label: ""
      }
    ]`

    this.optionsCarousel = {
      indicator: true,
      interval: 4000
    }

    this.carouselItems = [
      {
        label: "slide1",
      },
      {
        label: "slide2",
      },
      {
        label: ""
      }
    ]

    this.test = "test"

    this.show1 = true
    this.show2 = true
    this.show3 = true


  }

  toggle2() {
    this.show2 = !this.show2;
  }

  toggle3() {
    this.show3 = !this.show3;
  }

  toggle1() {
    this.show1 = !this.show1;
  }
}


CarouselAngularComponent.parameters = [];
