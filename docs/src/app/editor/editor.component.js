import {Component} from '@angular/core';

export default class EditorComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./editor.html')
      })
    ];
  }
  constructor(){
  }
}


EditorComponent.parameters = [];
