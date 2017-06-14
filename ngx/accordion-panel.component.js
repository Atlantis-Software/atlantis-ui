import { Component, ContentChildren, ElementRef} from '@angular/core';
// import accordionComponent from './accordion.component.js';
// console.log(accordionComponent)


export class accordionComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'accordion',
        template: `
        <div class="panel-group" [id]="idAccordion">
          <ng-content></ng-content>
        </div>`,
        queries: {
          Panels: new ContentChildren(accordionPanelComponent)
        },
        inputs: ["options"]
      })
    ];
  }
  constructor(elementRef) {
    this.elementRef = elementRef;
    this.idAccordion = "accordion" + Math.floor(Math.random() * (10000000000 - 0));
    this.idPanel = "panel" + Math.floor(Math.random() * (10000000000 - 0));
  }

  ngAfterViewInit(){
    var self = this;
    var panels = this.Panels.toArray();
    var panelsHTML = this.elementRef.nativeElement.getElementsByClassName("panel");

    for (var i = 0; i < panelsHTML.length; i++) {

      switch(this.options.style) {
        case "default" :
          panelsHTML[i].classList.add("panel-default");
          break;
        case "primary" :
          panelsHTML[i].classList.add("panel-primary");
          break;
        case "success" :
          panelsHTML[i].classList.add("panel-success");
          break;
        case "info" :
          panelsHTML[i].classList.add("panel-info");
          break;
        case "warning" :
          panelsHTML[i].classList.add("panel-warning");
          break;
        case "danger" :
          panelsHTML[i].classList.add("panel-danger");
          break;
        default :
          panelsHTML[i].classList.add("panel-default");
      }

      var link = panelsHTML[i].getElementsByTagName("a")[0];
      link.setAttribute("data-parent", "#"+this.idAccordion)

    }


    if (this.options.openDefault !== "" && typeof this.options.openDefault === "number" && this.options.openDefault >= 0) {
      if( this.options.openDefault === panels.length){
        this.options.openDefault = panels.length-1;
      } else if ( this.options.openDefault > panels.length){
        this.options.openDefault = 0;
      }
      var panel = this.elementRef.nativeElement.getElementsByClassName("panel-collapse")[this.options.openDefault];
      panel.classList.add("in");
    }

  }

}

accordionComponent.parameters = [ElementRef];

export class accordionPanelComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'accordion-panel',
        template: `
        <div class="panel-heading">
        <h4 class="panel-title">
        <a role="button" data-toggle="collapse" href="{{'#'+idPanel+i}}">
        {{title}}
        </a>
        </h4>
        </div>
        <div id="{{idPanel+i}}" class="panel-collapse collapse">
        <div class="panel-body">
        <ng-content></ng-content>
        </div>
        </div>`,
        inputs: ["title"],
        host: {"class": "panel"},
        styles: [':host {display: block}']
      })
    ];
  }

  constructor (elementRef, accordion) {
    this.accordion = accordion;
    console.log(this.accordion)
    this.elementRef = elementRef;
    this.idPanel = "panel" + Math.floor(Math.random() * (10000000000 - 0));
  }
  ngAfterViewInit(){
    this.value = this.elementRef.nativeElement;
  }
}

accordionPanelComponent.parameters = [ElementRef, accordionComponent];
