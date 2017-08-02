import { Component, ElementRef, ChangeDetectorRef} from '@angular/core';


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
  constructor(elementRef, ChangeDetectorRef) {
    this.elementRef = elementRef;
    this.panels = [];
    this.cdr = ChangeDetectorRef;
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
      if (this.options.style) {
        panelsHTML[i].classList.add("panel-" + this.options.style);
      } else {
        panelsHTML[i].classList.add("panel-default");
      }
    }

    if (this.options.openDefault >= 0) {
      if (this.options.openDefault === panelsHTML.length) {
        this.options.openDefault = panelsHTML.length - 1;
      } else if (this.options.openDefault > panelsHTML.length) {
        this.options.openDefault = 0;
      }
      setTimeout(function() {
        self.panels[self.options.openDefault].isOpen = true;
      }, 0);
    }

    this.cdr.detectChanges();

  }

}

accordionComponent.parameters = [ElementRef, ChangeDetectorRef];


export class accordionPanelComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'accordion-panel',
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
        inputs: ["title"]
      })
    ];
  }

  constructor(elementRef, accordion, ChangeDetectorRef) {
    this.accordion = accordion;
    this.accordion.addPanel(this);
    this._isOpen = false;
    this.cdr = ChangeDetectorRef
  }

  ngOnDestroy() {
    this.accordion.removePanel(this);
  }

  toggleOpen(e) {
    e.preventDefault();
    this.isOpen = !this.isOpen;
    if(this.isOpen) {
      this.accordion.closeOthers(this);
    }
  }
}

accordionPanelComponent.parameters = [ElementRef, accordionComponent, ChangeDetectorRef];
