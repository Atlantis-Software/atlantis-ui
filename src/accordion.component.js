import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';


export class accordionComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-accordion',
        template: `
          <ng-content></ng-content>`,
        inputs: ["panelStyle", "openDefault"],
        host: {
          'class': 'panel-group'
        }
      })
    ];
  }
  constructor(elementRef, ChangeDetectorRef) {
    this.elementRef = elementRef;
    //Array will contains all panels link to the acccordion
    this.panels = [];
    this.cdr = ChangeDetectorRef;
  }

  //Add a panel to the panel's array
  addPanel(panel) {
    this.panels.push(panel);
  }

  //Remove a panel to the panel's array
  removePanel(panel) {
    var index = this.panels.indexOf(panel);
    if (index !== -1) {
      this.panels.splice(index, 1);
    }
  }

  //Close all panel exept the panel we want to open
  closeOthers(panelOpen) {
    this.panels.forEach(function(panel) {
      if (panel !== panelOpen) {
        panel.isOpen = false;
      }
    });
    this.cdr.detectChanges();

  }

  ngAfterViewInit() {
    var panelsHTML = this.elementRef.nativeElement.getElementsByClassName("panel");
    if (panelsHTML.length < 0) {
      return;
    }
    //apply for all panel the same style
    for (var i = 0; i < panelsHTML.length; i++) {
      if (this.panelStyle) {
        panelsHTML[i].classList.add("panel-" + this.panelStyle);
      } else {
        panelsHTML[i].classList.add("panel-default");
      }
    }

    //Open the panel we want per default
    setTimeout(()=>{
      this.panels.forEach((panel)=> {
        if (panel.isOpen) {
          this.closeOthers(panel);
        }
      });
      this.cdr.detectChanges();
    },0);

  }

}

accordionComponent.parameters = [ElementRef, ChangeDetectorRef];


export class accordionPanelComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-accordion-panel',
        template: `
        <div class="panel" [ngClass]="{'panel-open': isOpen}">
          <div class="panel-heading" (click)="toggleOpen($event)">
            <h4 class="panel-title">
              <a role="button">{{title}}</a>
            </h4>
          </div>
          <div class="panel-collapse collapse" [class.in]="isOpen">
            <div class="panel-body">
              <ng-content></ng-content>
            </div>
          </div>
        </div>`,
        inputs: ["title", "isOpen: open"]
      })
    ];
  }

  constructor(elementRef, accordion, ChangeDetectorRef) {
    this.accordion = accordion;
    //add this panel to the panel's array of parent accordion
    this.accordion.addPanel(this);
    this._isOpen = false;
    this.cdr = ChangeDetectorRef;
  }

  //when the panel is destroy remove the panel in the parent
  ngOnDestroy() {
    this.accordion.removePanel(this);
  }

  // toggle the panel we click and call the parent fonction to close other
  toggleOpen(e) {
    e.preventDefault();
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.accordion.closeOthers(this);
    }
  }
}

accordionPanelComponent.parameters = [ElementRef, accordionComponent, ChangeDetectorRef];
