import {Component} from '@angular/core';

export default  class TooltipComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./tooltip.html')
      })
    ]
  }
  constructor(){

    this.tooltipHtml = `
    <button type="button" class="btn btn-default" tooltip tooltipDirection="left" [tooltipContent]="time">
      tooltip on left
    </button>

    <button type="button" class="btn btn-default" tooltip tooltipDirection="top" tooltipContent="testetstestsetest">
      tooltip on top
    </button>

    <button type="button" class="btn btn-default" tooltip tooltipDirection="bottom" tooltipContent="testetstestsetest">
      tooltip on bottom
    </button>

    <button type="button" class="btn btn-default" tooltip tooltipDirection="right" tooltipContent="testetstestsetest">
      tooltip on right
    </button>`;

    this.time = new Date();
    setInterval(()=>{
      this.time = new Date();
    },1000);

    this.Display = "Example";
  }
}


TooltipComponent.parameters = [];
