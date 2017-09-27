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
    this.listOne = ['A', 'B', 'C', 'D', 'E'];
    this.listOneOriginal = ['A', 'B', 'C', 'D', 'E'];
    this.listTwo = ['1', '2', '3', '4!', '5'];
    this.listTwoOriginal = ['1', '2', '3', '4!', '5'];
    this.listThree = [];
    this.listThreeOriginal = [];
    this.Display = "Example";
  }
}


dragAndDropComponent.parameters = [];
