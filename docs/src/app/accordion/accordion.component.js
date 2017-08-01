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
    </accordion>`;

    this.accordionNgFor= `
    <accordion [options]="{style: 'danger'}">
      <accordion-panel *ngFor="let panel of panels" [title]="panel.title">
        {{panel.content}}
      </accordion-panel>
    </accordion>`;

    this.accordionNgForPanel = `
    this.panels = [
      {
        title: "test1",
        content: "azertyuiop"
      },
      {
        title: "test2",
        content: "qsdfghjklm"
      },
      {
        title: "test3",
        content: "wxcvbn"
      }
    ]`

    this.optionsAccordion= {
      openDefault: 2,
      style: "success"
    }

    this.Display = "Example";
    this.changehours();

    this.panels = [
      {
        title: "test1",
        content: "azertyuiop"
      },
      {
        title: "test2",
        content: "qsdfghjklm"
      },
      {
        title: "test3",
        content: "wxcvbn"
      }
    ]
  }

  changehours(){
    var self = this;

    this.time = new Date();

    setInterval(function(){
      self.time = new Date();
    },1000);
  }
}


AccordionComponent.parameters = [];
