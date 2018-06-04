import { Directive, TemplateRef, ContentChild } from '@angular/core';

let nextId = 0;

export class tabpanelDirective {
  static get annotations() {
    return [
      new Directive({
        selector: 'atlui-tab-panel',
        inputs : ['headerTitle', 'disabled', 'id', 'active'],
        queries: {
          headerTemplate: new ContentChild(tabPanelHeaderDirective),
        },
        host: {
          '[class]': '"tab-pane panel-body"',
          '[class.active]': "active"
        }
      })
    ];
  }

  constructor() {
    this._active = false;
    this.headerTemplate = null;
    this.id = `atlui-tab-panel-${nextId++}`;
  }

  get active() {
    return this._active;
  }

  set active(active) {
    if (this._active === active) {
      return;
    }
    this._active = active;
  }

}

tabpanelDirective.parameters = [];

export class tabPanelHeaderDirective {
  static get annotations() {
    return [
      new Directive({
        selector: 'ng-template[atlui-tab-panel-header]',
      })
    ];
  }
  constructor(TemplateRef) {
    this.templateRef = TemplateRef;
  }
}

tabPanelHeaderDirective.parameters = [TemplateRef];
