import {Component} from '@angular/core';

export default  class CarouselComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./carousel.html')
      })
    ]
  }
  constructor(){
    this.carouselHtml = `
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
      </ol>


      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="..." alt="">
          <div class="carousel-caption">
            Slide 1
          </div>
        </div>
        <div class="item">
          <img src="..." alt="">
          <div class="carousel-caption">
            Slide2
          </div>
        </div>
        <div class="item">
          <img src="..." alt="">
          <div class="carousel-caption">
            Slide3
          </div>
        </div>
      </div>

      <!-- Controls -->
      <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <i class="icon icon-previous" aria-hidden="true"></i>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <i class="icon icon-next" aria-hidden="true"></i>
        <span class="sr-only">Next</span>
      </a>
    </div>`
    this.Display = "Example";
  }
}


CarouselComponent.parameters = [];
