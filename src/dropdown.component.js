import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';

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
        inputs: ["title", "orientation", "alignement", 'icon'],
        host: {
          "(document:click)": "toggle($event)"
        }
      })
    ];
  }
  constructor(elementRef, ChangeDetectorRef) {
    this.open = false;
    this.elementRef = elementRef;
    this.parentIsLi = false;
    this.disabled = false;
    this.cdr = ChangeDetectorRef;
    this.title = "";
  }

  //Change options of dropdown with the inputs parameters
  ngAfterViewInit() {
    this.dropdown = this.elementRef.nativeElement;
    var dropdownMenu = this.elementRef.nativeElement.getElementsByClassName("dropdown-menu")[0];

    if (this.dropdown.parentElement.nodeName === "LI") {
      this.parentIsLi = true;
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
    this.cdr.detectChanges();
  }

  toggle(e) {
    if (this.disabled) {
      return;
    }
    var dropdown = this.elementRef.nativeElement.querySelector("button, a");
    if (e.target == dropdown || dropdown.contains(e.target)) {
      this.open = !this.open;
      this.dropdown.classList.toggle("open");
      e.preventDefault();
    } else {
      this.open = false;
      this.dropdown.classList.remove("open");
    }

  }

}

dropdownComponent.parameters = [ElementRef, ChangeDetectorRef];
