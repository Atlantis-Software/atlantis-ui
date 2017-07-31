import {Component} from '@angular/core';

export default  class GridComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./grid.html')
      })
    ]
  }
  constructor(){

    this.GridHtml = `
    <div class="col-md-6">
      Content
    </div>`
    this.gridWrapping = `
    <div class="row">
      <div class="col-md-8">.col-md-8</div>
      <div class="col-md-6">.col-md-6<br>8+6 = 13 &gt; 12 </div>
      <div class="col-md-4">.col-md-4</div>
    </div>`;
    this.gridOffset = `
    <div class="row show-grid container">
      <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
    </div>
    <div class="row show-grid container">
      <div class="col-md-3">.col-md-3</div>
      <div class="col-md-2 col-md-offset-2">.col-md-2 .col-md-offset-2</div>
      <div class="col-md-3 col-md-offset-2">.col-md-2 .col-md-offset-2</div>
    </div>`;
    this.gridOrder= `
    <div class="row show-grid container">
      <div class="col-md-8 col-md-push-4">.col-md-8 .col-md-push-4</div>
      <div class="col-md-4 col-md-pull-8">.col-md-4 .col-md-pull-8</div>
    </div>`

    this.gridNesting = `
    <div class="row">
      <div class="col-md-8">
        Level 1: .col-md-8
        <div class="row">
          <div class="col-md-7 col-sm-6">
            Level 2: .col-md-7 .col-sm-6
          </div>
          <div class="col-md-5 col-sm-6">
            Level 2: .col-md-5 .col-sm-6
          </div>
        </div>
      </div>
    </div>`;

    this.Display = "Example";
  }
}


GridComponent.parameters = [];
