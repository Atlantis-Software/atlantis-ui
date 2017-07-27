import {Component} from '@angular/core';

export default  class ProgressBarComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./progress-bar.html')
      })
    ]
  }
  constructor(){

    this.test = 50;
    this.options = {
      size : "lg"
    }

    this.circleProgressBarHtml = `
    <circle-progress-bar [value]="test">
    </circle-progress-bar>
    <circle-progress-bar-sm class="circle-progress-bar-success" [value]="test">
    </circle-progress-bar-sm>
    <circle-progress-bar-lg class="circle-progress-bar-info" [value]="test">
    </circle-progress-bar-lg>`

    this.Display = "Example";
  }
}


ProgressBarComponent.parameters = [];
