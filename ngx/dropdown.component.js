import { Component, ContentChildren, ElementRef, ChangeDetectorRef} from '@angular/core';

export default class dropdownComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'dropdown',
        template: `
          <button *ngIf="!parentIsLi" class="btn btn-default" type="button" (click)="openDropdown()">
            {{title}}
            <span class="caret"></span>
          </button>
          <a *ngIf="parentIsLi" href="#" (click)="toggle($event)">
            {{title}}
            <span class="caret"></span>
          </a>
          <div class="dropdown-menu">
            <ng-content>
            </ng-content>
          </div>`,
        inputs: ["title","options"],
        host: {
          "(focusout)": "closeDropdown()"
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
  }

  ngAfterViewInit(){
    this.dropdown = this.elementRef.nativeElement;
    var dropdownMenu = this.elementRef.nativeElement.getElementsByClassName("dropdown-menu")[0];

    if (this.dropdown.parentElement.nodeName === "LI") {
      this.parentIsLi = true;
    }

    if (this.dropdown.parentElement.classList.contains("disabled")) {
      this.disabled = true;
    }


    if (this.options && this.options.orientation === "up") {
      this.dropdown.classList.add("dropup");
    }else {
      this.dropdown.classList.add("dropdown");
    }

    if (this.options && this.options.alignement === "right") {
      dropdownMenu.classList.add("dropdown-menu-right");
    }

  }

  openDropdown(){
    if (!this.disabled){
      this.open = true;
      this.dropdown.classList.add("open");
    }
  }

  toggle(e){
    e.preventDefault();
    if (!this.disabled){
      this.open = !this.open;
      this.dropdown.classList.toggle("open");
    }

  }

  closeDropdown(){
    this.open = false;
    this.dropdown.classList.remove("open");
  }

}

dropdownComponent.parameters = [ElementRef, ChangeDetectorRef];
