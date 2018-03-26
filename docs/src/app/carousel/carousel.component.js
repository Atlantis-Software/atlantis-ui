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
