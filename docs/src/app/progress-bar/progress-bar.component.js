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
    this.options = {
      size : "lg"
    };

    this.circleProgressBarHtml = `
    <circle-progress-bar [value]="test">
    </circle-progress-bar>`;

    this.circleProgressBarSize = `
    <circle-progress-bar-sm class="circle-progress-bar-success" [value]="test">
    </circle-progress-bar-sm>
    <circle-progress-bar [value]="test">
    </circle-progress-bar>
    <circle-progress-bar-lg class="circle-progress-bar-info" [value]="test">
    </circle-progress-bar-lg>`;

    this.circleProgressBarStyle= `
    <circle-progress-bar class="circle-progress-bar-success" [value]="test">
    </circle-progress-bar>
    <circle-progress-bar class="circle-progress-bar-info" [value]="test">
    </circle-progress-bar>
    <circle-progress-bar class="circle-progress-bar-warning" [value]="test">
    </circle-progress-bar>
    <circle-progress-bar class="circle-progress-bar-danger" [value]="test">
    </circle-progress-bar>`;

    this.Display = "Example";
  }
}


ProgressBarComponent.parameters = [];
