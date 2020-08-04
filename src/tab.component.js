import { Component, ContentChildren, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
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

  constructor(ElementRef, changeDetectorRef) {
    this.activeId = 0;
    this.height = "150px";
    this.elementRef = ElementRef;
    this.cdr = changeDetectorRef;
    // input value
    // output valueChange for the two way data binding works
    this.selectedChange = new EventEmitter();
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
      this.selected = tabpanelId;
      this.cdr.detectChanges();
      this.selectedChange.emit(selectedpanel.id);
    }
  }

  ngAfterViewChecked()
  {
    this.cdr.detectChanges();
  }
  // execute when a property of the input is modified ( height or selected )
  ngOnChanges(changes) {
    if (changes.selected && changes.selected.currentValue) {
      let id = changes.selected.currentValue;
      this.select(id);
    }
  }

  // Define the default panel active
  ngAfterContentChecked() {
    let activePanel = this._getPanelById(this.activeId);
    this.activeId = activePanel ? activePanel.id : ( this.tabpanels.length ? this.tabpanels.first.id : null);
    activePanel = this._getPanelById(this.activeId);
    activePanel.active = true;
  }

  _getPanelById(id) {
    let tabpanelsWithId = this.tabpanels.find( panel=> panel.id === id);
    return tabpanelsWithId;
  }

}

tabsComponent.parameters = [ElementRef, ChangeDetectorRef];
