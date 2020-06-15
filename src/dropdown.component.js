import { Component, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';

export default class dropdownComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-dropdown',
        template: `
          <button *ngIf="!parentIsLi" class="btn btn-default" type="button">
            <i *ngIf="icon" class="icon" [ngClass]="'icon-'+icon"></i>
            {{title}}
            <span class="caret"></span>
          </button>
          <a *ngIf="parentIsLi" href="#">
            <i *ngIf="icon" class="icon" [ngClass]="'icon-'+icon"></i>
            {{title}}
            <span class="caret"></span>
          </a>
          <div class="dropdown-menu">
            <ng-content>
            </ng-content>
          </div>`,
        inputs: ["title", "orientation", "alignement", 'icon', 'maxHeight', 'autoOpen']
      })
    ];
  }
  constructor(elementRef, ChangeDetectorRef, renderer) {
    this.open = false;
    this.elementRef = elementRef;
    this.parentIsLi = false;
    this.disabled = false;
    this.cdr = ChangeDetectorRef;
    this.title = "";
    this.renderer = renderer;
  }

  ngOnDestroy() {
    var menu = this.elementRef.nativeElement.querySelector("button, a");
    if (this.autoOpen) {
      var dropdownMenu = this.elementRef.nativeElement.getElementsByClassName("dropdown-menu")[0];
      menu.removeEventListener('mouseover', this.toggleMouseOver.bind(this));
      menu.removeEventListener('onmouseout', this.toggleMouseOut.bind(this));
      dropdownMenu.removeEventListener('mouseover', this.toggleMouseOver.bind(this));
      dropdownMenu.removeEventListener('onmouseout', this.toggleMouseOut.bind(this));
    } else {
      menu.removeEventListener('click', this.toggleClick.bind(this));
    }
  }

  //Change options of dropdown with the inputs parameters
  ngAfterViewInit() {
    this.dropdown = this.elementRef.nativeElement;
    var dropdownMenu = this.elementRef.nativeElement.getElementsByClassName("dropdown-menu")[0];
    if (this.dropdown.parentElement.nodeName === "LI") {
      this.parentIsLi = true;
    }
    var menu = this.elementRef.nativeElement.querySelector("button, a");
    // cas option autoOpen defini à true: ouverture du menu au survol
    if (this.autoOpen) {
      menu.addEventListener('mouseenter', this.toggleMouseOver.bind(this));
      menu.addEventListener('mouseleave', this.toggleMouseOut.bind(this));
      dropdownMenu.addEventListener('mouseenter', this.toggleMouseOver.bind(this));
      dropdownMenu.addEventListener('mouseleave', this.toggleMouseOut.bind(this));
    } else {
      menu.addEventListener('click', this.toggleClick.bind(this));
    }

    if (this.dropdown.parentElement.classList.contains("disabled")) {
      this.disabled = true;
    }

    if (this.orientation === "up") {
      this.dropdown.classList.add("dropup");
    } else {
      this.dropdown.classList.add("dropdown");
    }

    if (this.alignement === "right") {
      dropdownMenu.classList.add("dropdown-menu-right");
    }
    if (this.maxHeight) {
      this.renderer.setStyle( dropdownMenu, 'max-height', this.maxHeight);
    }
    this.cdr.detectChanges();
  }

  toggleClick(e) {
    if (this.disabled) {
      return;
    }
    this.open = !self.open;
    this.dropdown.classList.toggle("open");
    e.preventDefault();

  }
  toggleMouseOver(e) {
    if (this.disabled) {
      return;
    }
    this.open = !self.open;
    this.dropdown.classList.toggle("open");
    e.preventDefault();
  }

  toggleMouseOut() {
    if (this.disabled) {
      return;
    }
    this.open = false;
    this.dropdown.classList.remove("open");
  }
}

dropdownComponent.parameters = [ElementRef, ChangeDetectorRef, Renderer2];
