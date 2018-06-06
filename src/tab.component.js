import { Component, ContentChildren, ElementRef } from '@angular/core';
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
        inputs: ['panelHeight']
      })
    ];

  }

  constructor(ElementRef) {
    this.activeId = 0;
    this.panelHeight = "100%";
    this.elementRef = ElementRef;
  }

  select(tabpanelId) {
    let selectedpanel = this._getPanelById(tabpanelId);
    if (selectedpanel && !selectedpanel.disabled && this.activeId !== selectedpanel.id) {
      this.tabpanels.forEach((panel)=>{
        panel.active = false;
      });
      this.activeId = tabpanelId;
      selectedpanel.active = true;
    }
  }

  ngAfterContentChecked() {
    let activePanel = this._getPanelById(this.activeId);
    this.activeId = activePanel ? activePanel.id : ( this.tabpanels.length ? this.tabpanels.first.id : null);
    activePanel = this._getPanelById(this.activeId);
    activePanel.active = true;
  }
  //TODO Change for use css only
  ngAfterViewInit() {
    var maxSize = 0;
    if (!this.elementRef.nativeElement.parentNode.style.height && this.panelHeight === '100%') {
      let panels = this.elementRef.nativeElement.querySelectorAll("atlui-tab-panel");
      panels.forEach(panel => {
        var panelStyle = window.getComputedStyle(panel, null);
        var panelHeight = parseInt(panelStyle.getPropertyValue("height"));
        if (panelHeight > maxSize) {
          maxSize = panelHeight;
        }
      });
      let tabContent = this.elementRef.nativeElement.querySelector(".tab-content");
      tabContent.style.minHeight = (maxSize + 2) + "px";
    }
  }

  _getPanelById(id) {
    let tabpanelsWithId = this.tabpanels.filter( panel=> panel.id === id);
    return tabpanelsWithId.length ? tabpanelsWithId[0] : null;
  }

}

tabsComponent.parameters = [ElementRef];
