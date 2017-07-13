import {Component} from '@angular/core';

export default  class SelectpickerComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./selectpicker.html')
      })
    ]
  }
  constructor(){

    this.selectpicker1Html = `
    <div class="form-group">
      <label for="select-html">html select simple</label>
      <div id="select-html" class="select">
        <button class="btn btn-default select-toggle" type="button" id="select-html" data-toggle="select">
            <span class="select-text">&nbsp;</span>
            <span class="caret"></span>
          </button>
        <ul class="select-options">
          <li>
            <a href="#">
                Messages
              </a>
          </li>
          <li>
            <a href="#">
                Another action
              </a>
          </li>
          <li>
            <a href="#">
                Something else here
              </a>
          </li>
          <li>
            <a href="#">
                Something else here
              </a>
          </li>
          <li role="separator" class="divider"></li>
          <li>
            <a href="#">
                Separated link
              </a>
          </li>
        </ul>
      </div>
    </div>`

    this.selectpicker2Html = `
    <div class="form-group">
      <label for="select">dynamic select simple</label>
      <select id="select" class="selectpicker">
          <option value='1'>a</option>
          <option>b</option>
          <option>c</option>
        </select>
    </div>`

    this.Display = "Example";
  }
}


SelectpickerComponent.parameters = [];
