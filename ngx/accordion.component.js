import { Component, ContentChildren, ElementRef} from '@angular/core';
// import accordionComponent from './accordion.component.js';
// console.log(accordionComponent)


export class accordionComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'accordion',
        template: `
          <ng-content></ng-content>`,
        inputs: ["options"],
        host : {
          'class' : 'panel-group'
        }
      })
    ];
  }
  constructor(elementRef) {
    this.elementRef = elementRef;
    this.panels = [];
  }

  addPanel(panel) {
    this.panels.push(panel)
  }

  removePanel(panel) {
    var index = this.panels.indexOf(panel);
    if (index !== -1) {
      this.panels.splice(index, 1);
    }
  }

  closeOthers(panelOpen) {
    this.panels.forEach(function(panel){
      if (panel !== panelOpen) {
        panel.isOpen = false;
      }
    })
  }

  ngAfterViewInit() {
    var self = this;
    var panelsHTML = this.elementRef.nativeElement.getElementsByClassName("panel");

    for (var i = 0; i < panelsHTML.length; i++) {
      switch (this.options.style) {
        case "default":
          panelsHTML[i].classList.add("panel-default");
          break;
        case "primary":
          panelsHTML[i].classList.add("panel-primary");
          break;
        case "success":
          panelsHTML[i].classList.add("panel-success");
          break;
        case "info":
          panelsHTML[i].classList.add("panel-info");
          break;
        case "warning":
          panelsHTML[i].classList.add("panel-warning");
          break;
        case "danger":
          panelsHTML[i].classList.add("panel-danger");
          break;
        default:
          panelsHTML[i].classList.add("panel-default");
      }
    }


    if (this.options.openDefault !== "" && typeof this.options.openDefault === "number" && this.options.openDefault >= 0) {
      if (this.options.openDefault === panelsHTML.length) {
        this.options.openDefault = panelsHTML.length - 1;
      } else if (this.options.openDefault > panelsHTML.length) {
        this.options.openDefault = 0;
      }
      this.panels[this.options.openDefault].isOpen = true;
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
        <div class="panel" [ngClass]="{'panel-open': isOpen}">
          <div class="panel-heading" (click)="toggleOpen($event)">
            <h4 class="panel-title">
              <a role="button" href>
              {{title}}
              </a>
            </h4>
          </div>
          <div class="panel-collapse collapse" [class.in]="isOpen">
            <div class="panel-body">
              <ng-content></ng-content>
            </div>
          </div>
        </div>`,
        inputs: ["title"]
      })
    ];
  }

  constructor(elementRef, accordion) {
    this.accordion = accordion;
    this.accordion.addPanel(this);
    this._isOpen = false;
  }

  ngOnDestroy() {
    this.accordion.removePanel(this);
  }

  toggleOpen(e) {
    e.preventDefault();
    this.isOpen = !this.isOpen;
  }

  set isOpen(value) {
    this._isOpen = value;
    if(value){
      this.accordion.closeOthers(this);
    }
  }

  get isOpen() {
    return this._isOpen;
  }
}

accordionPanelComponent.parameters = [ElementRef, accordionComponent];
