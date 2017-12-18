import {Component} from '@angular/core';

export default  class AccordionComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./accordion.html')
      })
    ];
  }
  constructor(){

    this.accordionHtml = `
    <accordion style="default">
      <accordion-panel [title]="'test1'" [open]="true">
        qsdfghjklm
      </accordion-panel>
      <accordion-panel [title]="'test2'">
        azertyuiop
        <button type="button" class="btn btn-block">Basic</button>
      </accordion-panel>
    </accordion>`;

    this.accordionNgFor= `
    <accordion [style]="danger">
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
    ]`;

    this.changehours();

    this.panels = [
      {
        title: "test1",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      },
      {
        title: "test2",
        content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
      },
      {
        title: "test3",
        content: "when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
    ];
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
