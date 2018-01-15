import {Component} from '@angular/core';

export default  class CarouselComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./carousel.html')
      })
    ];
  }
  constructor(){

    this.carouselHtml = `
    <atlui-carousel indicator="true" interval="4000" activeDefault="2" pause="hover">
      <atlui-carousel-item>
        <img class="img-responsive center-block" src="../../img/carousel01.jpg" alt="">
        <div class="carousel-caption">
          Slide 1
        </div>
      </atlui-carousel-item>
      <atlui-carousel-item>
        test2
      </atlui-carousel-item>
    </atlui-carousel>`;
    this.carrouselSlideNgIf= `
    <atlui-carousel-item *ngIf="show1">
      <img class="img-responsive center-block" src="../../img/carousel02.jpg" alt="">
      <div class="carousel-caption">
        Slide 1
      </div>
    </atlui-carousel-item>`;

    this.carouselNgFor= `
    <atlui-carousel indicator="true" interval="4000" activeDefault="2" pause="hover">
      <atlui-carousel-item *ngFor="let carouselItem of carouselItems">
        <img class="img-responsive center-block" src="../../img/carousel03.jpg" alt="">
        <div class="carousel-caption">
          {{carouselItem.label}}
        </div>
      </atlui-carousel-item>
    </atlui-carousel>`;

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
    ]`;

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
    ];

    this.test = "test";

    this.show1 = true;
    this.show2 = true;
    this.show3 = true;


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


CarouselComponent.parameters = [];
