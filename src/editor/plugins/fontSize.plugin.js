import { Component, ElementRef } from '@angular/core';
import pluginClass from './plugin.class.js';

export default class fontSize extends pluginClass{
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-plugin-fontSize',
        template: `
        <atlui-dropdown [title]="text">
          <atlui-dropdown-option *ngFor="let size of sizes"
            (mousedown)="execCommand($event, size)">
            <p [ngStyle]="{'font-size.px':size}">
              {{size}}
            </p>
          </atlui-dropdown-option>
        </atlui-dropdown>`
      })
    ];
  }

  constructor(ElementRef) {
    super();
    this.cmd = "insertHTML";
    this.text = "Size";
    this.description = "Change font size";
    this.sizes = [ 10, 12, 14, 16, 18, 20];
    this.val = 3;
    this.elementRef = ElementRef;
  }

  execCommand(event, size) {
    event.preventDefault();
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var div = document.createElement('div');
    div.appendChild(range.cloneContents());
    var spans = div.querySelectorAll("span");
    if (spans.length > 0) {
      spans.forEach((span)=> {
        span.style.fontSize = '';
        if (span.length === 0) {
          var spanHtml = new DOMParser().parseFromString(span.innerHTML, 'text/html').body.firstChild;
          span.parentNode.insertBefore(spanHtml, span);
        }
      });
    }
    var text = div.innerHTML;
    this.val = `<span style="font-size:${size+"px"}">${text}</span>`;
    super.execCommand(event);
  }
}

fontSize.parameters = [ElementRef];
