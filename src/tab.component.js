import { Component, ContentChildren, ElementRef, EventEmitter } from '@angular/core';
import { tabpanelDirective } from './tab-panel.component.js';

export default class tabsComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-tabs',
        template: require('./tab.component.html'),
        queries: {
          tabpanels: new ContentChildren(tabpanelDirective)
        },
        inputs: ['height', 'selected'],
        outputs: ["selectedChange"]
      })
    ];
  }

  constructor(ElementRef) {
    this.activeId = 0;
    this.height = "150px";
    this.elementRef = ElementRef;
    // input value
    // output valueChange for the two way data binding works
    this.selectedChange = new EventEmitter();
  }
  // execute when a property of the input is modified ( height or selected )
  ngOnChanges(changes) {
    if (changes.selected && changes.selected.currentValue) {
      let tabSelected = this._getPanelSelected(changes.selected.currentValue);
      if (tabSelected) {
        this.select(tabSelected);
      }
    }
  }

  select(tab) {
    if (!tab.disabled && !tab.active) {
      this.tabpanels.forEach((panel)=>{
        panel.active = false;
      });
      tab.active = true;
      // get the index of the selected tab
      if (this.tabpanels && this.tabpanels._results) {
        this.selected = this.tabpanels._results.findIndex(tab => tab.active === true);
      }
    }
  }

  ngAfterContentChecked() {
    // if not tab selected by default tab with index 0 is selected
    var index = this.selected || 0;
    var tabSelected = this._getPanelSelected(index);
    if (tabSelected) {
      tabSelected.active = true;
    }
  }

  _getPanelSelected(index) {
    if (this.tabpanels && this.tabpanels._results && this.tabpanels._results[index]) {
      return this.tabpanels._results[index];
    }
  }

}

tabsComponent.parameters = [ElementRef];
