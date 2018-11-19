import { Component, ContentChildren, ElementRef, EventEmitter } from '@angular/core';
import { tabpanelDirective } from './tab-panel.component.js';
//TODO Add custom scrollbar component

export default class tabsComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-tabs',
        template: require('./tab.component.html'),
        queries: {
          tabpanels: new ContentChildren(tabpanelDirective)
        },
        inputs: ['height', 'activeTab'],
        outputs: ["activeTabChange"]
      })
    ];

  }

  constructor(ElementRef) {
    this.activeId = 0;
    this.height = "150px";
    this.elementRef = ElementRef;
    // input value
    // output valueChange for the two way data binding works
    this.activeTabChange = new EventEmitter();
  }

  ngOnChanges(changes) {
    if (changes.activeTab && changes.activeTab.currentValue) {
      this.select(changes.activeTab.currentValue);
    }
  }

  select(tabpanelId) {
    let selectedpanel = this._getPanelById(tabpanelId);
    if (selectedpanel && !selectedpanel.disabled && this.activeId !== selectedpanel.id) {
      this.tabpanels.forEach((panel)=>{
        panel.active = false;
      });
      this.activeId = tabpanelId;
      selectedpanel.active = true;
      // two way data binding
      // change value of activeTab
      this.activeTab = selectedpanel.id;
      this.activeTabChange.emit(this.activeTab);
    }
  }

  ngAfterContentChecked() {
    let activePanel = this._getPanelById(this.activeId);
    this.activeId = activePanel ? activePanel.id : ( this.tabpanels.length ? this.tabpanels.first.id : null);
    activePanel = this._getPanelById(this.activeId);
    activePanel.active = true;
  }

  _getPanelById(id) {
    let tabpanelsWithId = this.tabpanels.filter( panel=> panel.id === id);
    return tabpanelsWithId.length ? tabpanelsWithId[0] : null;
  }

}

tabsComponent.parameters = [ElementRef];
