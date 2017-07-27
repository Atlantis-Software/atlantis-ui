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
      <carousel-item [options]="optionsItem1">
        test1
      </carousel-item>
      <carousel-item [options]="optionsItem2">
        test2
      </carousel-item>
    </carousel>`

    this.person = {};

    this.optionsCarousel = {
      indicator: true
    }

    this.test = "test"

    this.show1 = true
    this.show2 = true
    this.show3 = true


    this.Display = "Example";
  }

  toggle2() {
    this.show2 = !this.show2;
  }

  toggle3() {
    this.show3 = !this.show3;
  }

  toggle1() {
    this.show1 = !this.show1;
    this.show2 = !this.show2;
  }
}


CarouselAngularComponent.parameters = [];
