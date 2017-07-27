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
    this.cdr = ChangeDetectorRef
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
    this.panelsHTML = this.elementRef.nativeElement.getElementsByClassName("panel");
    this.style = this.elementRef.nativeElement.classList;
    for (var i = 0; i < this.panelsHTML.length; i++) {
      self.panelsHTML[i].classList.add("panel-default")
      this.style.forEach( function(style){
        self.panelsHTML[i].classList.add(style);
      })
    }


    if (this.options.openDefault !== "" && typeof this.options.openDefault === "number" && this.options.openDefault >= 0) {
      if (this.options.openDefault === this.panelsHTML.length) {
        this.options.openDefault = this.panelsHTML.length - 1;
      } else if (this.options.openDefault > this.panelsHTML.length) {
        this.options.openDefault = 0;
      }
      this.panels[this.options.openDefault].isOpen = true;
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
  }

  set isOpen(value) {
    this._isOpen = value;
    this.cdr.detectChanges()
    if (value) {
      this.accordion.closeOthers(this);
    }
  }

  get isOpen() {
    return this._isOpen;
  }
}

accordionPanelComponent.parameters = [ElementRef, accordionComponent, ChangeDetectorRef];
