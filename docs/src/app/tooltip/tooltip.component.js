import {Component} from '@angular/core';

export default  class TooltipComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./tooltip.html')
      })
    ];
  }
  constructor(){
    this.left = 'left';

    this.time = new Date();
    setInterval(()=>{
      this.time = new Date();
    },1000);
  }
}


TooltipComponent.parameters = [];
