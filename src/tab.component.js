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
        outputs: ["selectedChange", "onChange"]
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
    this.onChange = new EventEmitter();
  }

  // function when we select a tab.
  select(tabpanelId) {
    let selectedpanel = this._getPanelById(tabpanelId);
    if (selectedpanel && !selectedpanel.disabled && this.activeId !== selectedpanel.id) {
      this.tabpanels.forEach((panel)=>{
        panel.active = false;
      });
      this.activeId = tabpanelId;
      selectedpanel.active = true;
      this.selected = selectedpanel;
      this.onChange.emit(selectedpanel);
    }
  }
  // execute when a property of the input is modified ( height or selected )
  ngOnChanges(changes) {
    if (changes.selected && changes.selected.currentValue) {
      let tabSelected = this._getPanelSelected(changes.selected.currentValue);
      if (tabSelected && tabSelected.id) {
        this.select(tabSelected.id);
      }
    }
  }

  // Define the default panel active
  ngAfterContentChecked() {
    let activePanel = this._getPanelById(this.activeId);
    this.activeId = activePanel ? activePanel.id : ( this.tabpanels.length ? this.tabpanels.first.id : null);
    activePanel = this._getPanelById(this.activeId);
    activePanel.active = true;
  }

  _getPanelSelected(index) {
    if (this.tabpanels && this.tabpanels._results && this.tabpanels._results[index]) {
      return this.tabpanels._results[index];
    }
  }


  _getPanelById(id) {
    let tabpanelsWithId = this.tabpanels.filter( panel=> panel.id === id);
    return tabpanelsWithId.length ? tabpanelsWithId[0] : null;
  }

}

tabsComponent.parameters = [ElementRef];
