import { Component, ContentChildren, ElementRef, ChangeDetectorRef} from '@angular/core';
import dropdownOptionComponent from './dropdown-option.component';

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
          <ul class="dropdown-menu">
            <li *ngFor="let Action of Actions; let i = index" [class.disabled]="Action.options && Action.options.disabled" [class.divider]="Action.options && Action.options.type && Action.options.type === 'divider'" [class.dropdown-header]="Action.options && Action.options.type && Action.options.type === 'header'" (click)="closeDropdown()">
              <a *ngIf="!Action.options || !Action.options.type || Action.options.type !== 'divider' && Action.options.type !== 'header'">{{Action.value}}</a>
            </li>
          </ul>`,
        queries: {
          Actions: new ContentChildren(dropdownOptionComponent)
        },
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

    var actions = this.Actions.toArray();

    for (var i = 0; i < actions.length; i++) {
      if (actions[i].options && actions[i].options.type === "header") {
        var action = this.elementRef.nativeElement.getElementsByTagName("li")[i];
        action.innerText = actions[i].value;
      } else if (!actions[i].options || !actions[i].options.type || actions[i].options.type !== 'divider' && actions[i].options.type !== 'header') {
        var action = this.elementRef.nativeElement.getElementsByTagName("li")[i]
        action = action.getElementsByTagName("a")[0];
        action.innerText = actions[i].value;
      }
    }
    this.cdr.detectChanges();
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
