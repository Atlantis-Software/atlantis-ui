import { Component, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';

export default class dropdownComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-dropdown',
        template: `
          <button *ngIf="!parentIsLi" class="btn btn-default" type="button" (click)="!autoOpen && toggleClick($event)" (mouseenter)="autoOpen && toggleClick($event)" (mouseleave)="autoOpen && closeMenu()">
            <i *ngIf="icon" class="icon" [ngClass]="'icon-'+icon"></i>
            {{title}}
            <span class="caret"></span>
          </button>
          <a *ngIf="parentIsLi" (click)="!autoOpen && toggleClick($event)" (mouseenter)="autoOpen && toggleClick($event)" (mouseleave)="autoOpen && closeMenu()">
            <i *ngIf="icon" class="icon" [ngClass]="'icon-'+icon"></i>
            {{title}}
            <span class="caret"></span>
          </a>
          <div class="dropdown-menu" (mouseenter)="autoOpen && toggleClick($event)" (mouseleave)="autoOpen && closeMenu()">
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
      menu.removeEventListener('mouseover', this.toggleClick.bind(this));
      menu.removeEventListener('onmouseout', this.closeMenu.bind(this));
      dropdownMenu.removeEventListener('mouseover', this.toggleClick.bind(this));
      dropdownMenu.removeEventListener('onmouseout', this.closeMenu.bind(this));
    } else {
      menu.removeEventListener('click', this.toggleClick.bind(this));
    }
    var liste_drowdown_menu = this.elementRef.nativeElement.getElementsByClassName("dropdown-menu");
    Array.from(liste_drowdown_menu).forEach((dropdown) => {
      dropdown.removeEventListener('click', this.closeMenu.bind(this));
    });
  }

  //Change options of dropdown with the inputs parameters
  ngAfterViewInit() {
    this.dropdown = this.elementRef.nativeElement;
    var dropdownMenu = this.elementRef.nativeElement.getElementsByClassName("dropdown-menu")[0];
    if (this.dropdown.parentElement.nodeName === "LI") {
      this.parentIsLi = true;
    }

    var liste_drowdown_menu = this.elementRef.nativeElement.getElementsByClassName("dropdown-menu");
    Array.from(liste_drowdown_menu).forEach((dropdown) => {
      dropdown.addEventListener('click', this.closeMenu.bind(this));
    });

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
    // we close all dropdown menu
    var listDropdowns = document.querySelectorAll('atlui-dropdown');
    if (listDropdowns.length > 0) {
      listDropdowns.forEach((element) => {
        element.classList.remove("open");
      });
    }
    this.open = !self.open;
    this.dropdown.classList.toggle("open");
    e.preventDefault();
  }

  closeMenu() {
    if (this.disabled) {
      return;
    }
    this.open = false;
    this.dropdown.classList.remove("open");
  }
}

dropdownComponent.parameters = [ElementRef, ChangeDetectorRef, Renderer2];
