import {Component} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

export default  class DialogComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./dialog.html')
      })
    ];
  }
  constructor(document){
    this.showStandard = false;
    this.showStandard2 = false;
    this.showStandard3 = false;
    this.showStandard4 = false;
    this.document = document;
  }

  closeStandard() {
    this.showStandard = false;
  }
}


DialogComponent.parameters = [DOCUMENT];
