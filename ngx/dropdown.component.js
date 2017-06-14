import { Component, ContentChildren, ElementRef} from '@angular/core';
import dropdownOptionComponent from './dropdown-option.component';

export default class dropdownComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'dropdown',
        template: `
          <div class="">
            <button type="button" data-toggle="dropdown">
              {{title}}
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li *ngFor="let Action of Actions; let i = index" [class.disabled]="Action.options && Action.options.disabled" [class.divider]="Action.options && Action.options.type && Action.options.type === 'divider'" [class.dropdown-header]="Action.options && Action.options.type && Action.options.type === 'header'">
                <a *ngIf="!Action.options || !Action.options.type || Action.options.type !== 'divider' && Action.options.type !== 'header'">{{Action.value}}</a>
              </li>
            </ul>
          </div>`,
        queries: {
          Actions: new ContentChildren(dropdownOptionComponent)
        },
        inputs: ["title","options"]
      })
    ];
  }
  constructor(elementRef,) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit(){
    var dropdown = this.elementRef.nativeElement.getElementsByTagName("div")[0];
    var dropdownMenu = this.elementRef.nativeElement.getElementsByClassName("dropdown-menu")[0];
    if (this.options && this.options.orientation === "up") {
      dropdown.classList.add("dropup")
    }else {
      dropdown.classList.add("dropdown")
    }

    if (this.options && this.options.alignement === "right") {
      dropdownMenu.classList.add("dropdown-menu-right")
    }

    var actions = this.Actions.toArray();

    for (var i = 0; i < actions.length; i++) {
      if (actions[i].options && actions[i].options.type === "header") {
        var action = this.elementRef.nativeElement.getElementsByTagName("li")[i];
        action.innerText = actions[i].value;
      }
    }
  }
}

dropdownComponent.parameters = [ElementRef];
