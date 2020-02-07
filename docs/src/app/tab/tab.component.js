import {Component} from '@angular/core';

export default  class TabComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./tab.html')
      })
    ];
  }
  constructor(){
  }

  onChangeTab(selectedpanel) {
    this.selectedpanel = selectedpanel;
  }
}
