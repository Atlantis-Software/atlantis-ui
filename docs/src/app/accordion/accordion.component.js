import {Component} from '@angular/core';

export default  class AccordionComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./accordion.html')
      })
    ]
  }
  constructor(){

    this.accordionHtml = `
    <accordion [options]="optionsAccordion">
      <accordion-panel [title]="'test1'">
        qsdfghjklm
      </accordion-panel>
      <accordion-panel [title]="'test2'">
        azertyuiop
        <button type="button" class="btn btn-block">Basic</button>
      </accordion-panel>
    </accordion>`

    this.optionsAccordion= {
      openDefault: 2,
      style: "success"
    }

    this.Display = "Example";
  }
}


AccordionComponent.parameters = [];
