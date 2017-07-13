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
      pause: "hover",
      indicator: true,
      activeDefault : 2
    }

    this.test = "test"


    this.Display = "Example";
  }
}


CarouselAngularComponent.parameters = [];
