import {Component} from '@angular/core';

export default  class PaginationComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./pagination.html')
      })
    ]
  }
  constructor(){

    this.PaginationHtml= `
    <ul class="pagination">
      <li>
        <a href="#">
          <i class="icon icon-previous"></i>
        </a>
      </li>
      <li>
        <a href="#">1</a>
      </li>
      <li class="disabled">
        <a href="#">
          2
        </a>
      </li>
      <li class="active">
        <a href="#">
          3
        </a>
      </li>
      <li>
        <a href="#">
          4
        </a>
      </li>
      <li>
        <a href="#">
          5
        </a>
      </li>
      <li>
        <a href="#">
          ...
        </a>
      </li>
      <li>
        <a href="#">
          399
        </a>
      </li>
      <li>
        <a href="#">
          <i class="icon icon-next"></i>
        </a>
      </li>
    </ul>`

    this.Display = "Example";
  }
}


PaginationComponent.parameters = [];
