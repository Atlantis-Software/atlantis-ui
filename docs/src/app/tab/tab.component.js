import {Component, ChangeDetectorRef} from '@angular/core';

export default  class TabComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./tab.html')
      })
    ];
  }

  constructor(changeDetectorRef) {
    this.cdr = changeDetectorRef;
  }

  ngAfterViewChecked() {
    this.selectedTab = "tabOversize";
    this.cdr.detectChanges();
  }
}

TabComponent.parameters = [ChangeDetectorRef];
