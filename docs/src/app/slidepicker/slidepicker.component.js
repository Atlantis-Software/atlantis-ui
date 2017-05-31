import {Component} from '@angular/core';

export default  class SlidepickerComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./slidepicker.html')
      })
    ]
  }
  constructor(){

    this.slidepickerHtml = `
    <div class="slidepicker slidepicker-vertical">
      <div class="slidepicker-track">
        <span class="slidepicker-handle" style="top: 32px;"></span>
      </div>
      <ul class="slidepicker-label">
        <li class="active">
          <a>
            C++
          </a>
        </li>
        <li class="">
          <a>
            Python
          </a>
        </li>
        <li class="">
          <a>
            Javascript
          </a>
        </li>
      </ul>
      <input type="hidden" class="slidepicker-input" value="0">
    </div>`

    this.Display = "Example";
  }
}


SlidepickerComponent.parameters = [];
