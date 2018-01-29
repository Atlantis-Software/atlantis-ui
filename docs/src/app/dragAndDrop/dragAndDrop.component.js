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
    this.listSingle = ['A', 'B', 'C', 'D', 'E'];
    this.listHandle = ['1', '2', '3', '4', '5'];
    this.listMultiple1 = ['123', '456', '789'];
    this.listMultiple2 = ['ABC', 'DEF', 'GHI'];
    this.listSingle2 = ['A', 'B', 'C', 'D', 'E'];
    this.listEmpty = [];
    this.listThreeOriginal = [];
    this.listDropzone = ['Java', 'C', 'Python'];
    this.listDropzone1 = ['Apple', 'Orange'];
    this.listDropzone2 = [];

  }
}


dragAndDropComponent.parameters = [];
