import {Component} from '@angular/core';

export default  class DialogComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./dialog.html')
      })
    ];
  }
  constructor(){
    this.showStandard = false;
    this.showStandard2 = false;
    this.showStandard3 = false;
    this.options = {
      resizable: true,
      width: 1000,
      height: 600,
      minHeight: 300,
      minWidth: 300,
      maxWidth : 1000,
      maxHeight: 600,
      title: "dialog Header"
    };
  }

  closeStandard() {
    this.showStandard = false;
  }
}


DialogComponent.parameters = [];
