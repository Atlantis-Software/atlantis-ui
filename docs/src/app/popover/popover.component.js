import {Component} from '@angular/core';

export default  class PopoverComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./popover.html')
      })
    ]
  }
  constructor(){

    this.PopoverHtml = `
    <button type="button" class="btn btn-default" data-container="body" data-toggle="popover"
    data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
      Popover on left
    </button>
    ...
    <script>
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();
    });
    </script>
    `

    this.time = new Date();
    setInterval(()=>{
      this.time = new Date();
    },1000);

    this.Display = "Example";
  }

  // time() {
  //   return new Date().toString();
  // }
}


PopoverComponent.parameters = [];
