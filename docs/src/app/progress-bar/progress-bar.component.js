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
    <atlui-circle-progress-bar [value]="test">
    </atlui-circle-progress-bar>`;

    this.circleProgressBarSize = `
    <atlui-circle-progress-bar-sm class="circle-progress-bar-success" [value]="test">
    </atlui-circle-progress-bar-sm>
    <atlui-circle-progress-bar [value]="test">
    </atlui-circle-progress-bar>
    <atlui-circle-progress-bar-lg class="circle-progress-bar-info" [value]="test">
    </atlui-circle-progress-bar-lg>`;

    this.circleProgressBarStyle= `
    <atlui-circle-progress-bar class="circle-progress-bar-success" [value]="test">
    </atlui-circle-progress-bar>
    <atlui-circle-progress-bar class="circle-progress-bar-info" [value]="test">
    </atlui-circle-progress-bar>
    <atlui-circle-progress-bar class="circle-progress-bar-warning" [value]="test">
    </atlui-circle-progress-bar>
    <atlui-circle-progress-bar class="circle-progress-bar-danger" [value]="test">
    </atlui-circle-progress-bar>`;

    this.Display = "Example";
  }
}


ProgressBarComponent.parameters = [];
