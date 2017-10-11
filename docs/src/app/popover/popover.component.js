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

    this.PopoverHtml = `
    <button type="button" class="btn btn-default" popover popoverDirection="left" popoverTitle="test" [popoverContent]="time">
      Popover on left
    </button>

    <button type="button" class="btn btn-default" popover popoverDirection="top" popoverTitle="test" popoverContent="testetstestsetest">
      Popover on top
    </button>

    <button type="button" class="btn btn-default" popover popoverDirection="bottom" popoverTitle="test" popoverContent="testetstestsetest">
      Popover on bottom
    </button>

    <button type="button" class="btn btn-default" popover popoverDirection="right" popoverTitle="test" popoverContent="testetstestsetest">
      Popover on right
    </button>`;

    this.time = new Date();
    setInterval(()=>{
      this.time = new Date();
    },1000);

    this.Display = "Example";
  }
}


PopoverComponent.parameters = [];
