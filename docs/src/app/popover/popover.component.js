import {Component} from '@angular/core';

export default  class PopoverComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./popover.html')
      })
    ];
  }
  constructor(){

    this.time = new Date();
    setInterval(()=>{
      this.time = new Date();
    },1000);
  }
}


PopoverComponent.parameters = [];
