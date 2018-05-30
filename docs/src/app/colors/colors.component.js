import {Component} from '@angular/core';

export default  class ColorsComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./colors.html')
      })
    ];
  }
  constructor(){
  }
}


ColorsComponent.parameters = [];
