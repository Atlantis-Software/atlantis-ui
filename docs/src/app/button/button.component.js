import {Component} from '@angular/core';

export default  class ButtonComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./button.html')
      })
    ]
  }
  constructor(){
    this.buttonHtml = `
    <div class="form-group">
      <button type="button" class="btn">Basic</button>
    </div>`;
    this.buttonLinkInputHtml= `
    <div class="form-group">
      <button type="button" class="btn">Basic</button>
    </div>
    <div class="form-group">
      <a class="btn btn-default" role="button">
        Link button
      </a>
    </div>
    <div class="form-group">
      <input type="button" class="btn btn-default" value="Input Button"/>
    </div>
    <div class="form-group">
      <input type="submit" class="btn btn-default" value="Submit Button"/>
    </div>`;
    this.buttonStyleHtml = `
    <button type="button" class="btn"></button>
    <button type="button" class="btn btn-default"></button>
    <button type="button" class="btn btn-primary"></button>
    <button type="button" class="btn btn-success"></button>
    <button type="button" class="btn btn-info"></button>
    <button type="button" class="btn btn-warning"></button>
    <button type="button" class="btn btn-danger></button>
    <button type="button" class="btn btn-link"></button>`;
    this.buttonIcon = `
    <button type="button" class="btn btn-icon icon-add"></button>
    `
    this.buttonDisabled= `
    <button class="btn btn-default" disabled>
      Default disabled
    </button>`;
    this.buttonBlock = `
    <button class="btn btn-default btn-block"></button>`
    this.buttonSize = `
    <button class="btn btn-default btn-lg">
      Large
    </button>
    <button class="btn btn-default btn-md">
      Medium
    </button>
    <button class="btn btn-default btn-sm">
      Small
    </button>
    <button class="btn btn-default btn-xs">
      XSmall
    </button>`
  }
}


ButtonComponent.parameters = [];
