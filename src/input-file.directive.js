import { Directive, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { language } from './locale.js';
import { i18n } from './i18n.js';

<<<<<<< HEAD
export class inputFileComponent {
=======
export class inputFileDirective {
>>>>>>> d5f94784b645c2aa5d926f3cb4bf21a720486170

  static get annotations() {
    return [
      new Directive({
        selector: 'input[type=file].form-control'
      })
    ];
  }
  constructor(ChangeDetectorRef, ElementRef) {
    this.browse = "browse";
    this.title = " ";
    this.files = new EventEmitter();
    this.language = language;
    this.i18n = i18n;
    this.cdr = ChangeDetectorRef;
    this.elementRef = ElementRef;
    this.label = document.createElement('LABEL');
    this.label.className = "input-file";
    this.label.setAttribute("title", this.title);
    this.label.setAttribute("browse", this.i18n[language].browse);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.parentNode.insertBefore(this.label, this.elementRef.nativeElement);
    this.label.setAttribute("title", this.title);
    this.label.appendChild(this.elementRef.nativeElement);
    this.elementRef.nativeElement.addEventListener('change', this.changeTitle.bind(this), false);
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener('change', this.changeTitle.bind(this), false);
    this.label.parentNode.removeChild(this.label);
  }

  changeTitle($event) {
    this.label.setAttribute("title", $event.target.files[0].name);
  }

}

<<<<<<< HEAD
inputFileComponent.parameters = [ChangeDetectorRef, ElementRef];
=======
inputFileDirective.parameters = [ChangeDetectorRef, ElementRef];
>>>>>>> d5f94784b645c2aa5d926f3cb4bf21a720486170
