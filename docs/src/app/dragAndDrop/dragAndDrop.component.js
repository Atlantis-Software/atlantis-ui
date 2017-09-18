import {Component} from '@angular/core';

export default  class dragAndDropComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./dragAndDrop.html')
      })
    ];
  }
  constructor(){
    this.listOne = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
    this.Display = "Example";
  }
}


dragAndDropComponent.parameters = [];
