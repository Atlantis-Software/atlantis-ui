import {Component} from '@angular/core';

export default  class ProgressBarComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./progress-bar.html')
      })
    ];
  }
  constructor(){

    this.test = 50;
  }
}


ProgressBarComponent.parameters = [];
