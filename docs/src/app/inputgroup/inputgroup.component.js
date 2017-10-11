import {Component} from '@angular/core';

export default  class InputgroupComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./inputgroup.html')
      })
    ];
  }
  constructor(){

    this.inputgroupBasicHtml= `
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon" id="basic-inputgroup1">@</span>
        <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-inputgroup1">
      </div>
    </div>`;

    this.inputgroupCheckHtml=`
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon">
          <input type="checkbox" aria-label="...">
        </span>
        <input type="text" class="form-control" aria-label="...">
      </div>
    </div>`;

    this.inputgroupButtonHtml=`
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">Action</button>
        </span>
        <input type="text" class="form-control" aria-label="...">
      </div>
    </div>`;

    this.inputgroupDropdownHtml= `
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-btn">
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li><a>Action</a></li>
            <li><a>Another action</a></li>
            <li><a>Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a>Separated link</a></li>
          </ul>
        </div>
        <input type="text" class="form-control" aria-label="...">
      </div>
    </div>`;

    this.Display = "Example";
  }
}


InputgroupComponent.parameters = [];
