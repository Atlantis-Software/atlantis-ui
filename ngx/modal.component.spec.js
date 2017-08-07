import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ngxAtlUiModule } from './ngx-atlantis-ui-module.js';

import datepickerComponent from './datepicker.component.js';
import modalComponent from './modal.component.js';
import modalHeaderComponent from './modal-header.component.js';
import modalBodyComponent from './modal-body.component.js';
import modalFooterComponent from './modal-footer.component.js';
import selectpickerComponent from './selectpicker.component.js';
import selectpickeroptionComponent from './selectpicker-option.component.js';
import backdropComponent from './backdrop.component.js'



var assert = require('assert');

class modalTestComponent {
  constructor() {

    this.modalOptionsRight = {
      fade : false,
      orientation:"right",
      backdrop: false
    }

    this.modalOptionsTop = {
      fade : false,
      orientation:"top"
    }

    this.modalOptionsBottom = {
      fade : true,
      orientation:"bottom",
      backdrop: true
    }

    this.modalOptionsLeft = {
      fade : true,
      orientation:"left",
      backdrop: true
    }

    this.showLeft = false;
    this.showRight = false;
    this.showTop = false;
    this.showBottom = false;
    this.showStandard = false;

  }
	static get annotations() {
		return [
			new Component({
        template: require('./modal.component.spec.html')
	  	})
		];
	}

  openLeft() {
    this.showLeft = true;
  }
  closeLeft() {
    this.showLeft = false;
  }

  openRight() {
    this.showRight = true;
  }
  closeRight() {
    this.showRight = false;
  }

  openTop() {
    this.showTop = true;
  }
  closeTop() {
    this.showTop = false;
  }

  openBottom() {
    this.showBottom = true;
  }
  closeBottom() {
    this.showBottom = false;
  }

  openStandard() {
    this.showStandard = true;
  }
  closeStandard() {
    this.showStandard = false;
  }
}

describe('modal', function() {
  var testComponent;

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [ngxAtlUiModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [modalTestComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
    var backdrop = document.querySelector('backdrop');
    if (backdrop) {
      backdrop.parentNode.removeChild(backdrop);
    }
  });

  it('should render correct modal', fakeAsync(function() {
    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var modal = document.querySelectorAll('.modal');

    assert.strictEqual(modal[0].classList[2], "modal-left");
    assert.strictEqual(modal[1].classList[1], "modal-right");
    assert.strictEqual(modal[2].classList[1], "modal-top");
    assert.strictEqual(modal[3].classList[2], "modal-bottom");
    assert.strictEqual(modal[4].classList[2], void 0);


  }));

  it('should show on button click then close on close button click, left modal', fakeAsync(function(){
    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openLeft');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-left');

    assert.strictEqual(modal.classList[3], "in");
    assert.strictEqual(testComponent.showLeft, true);

    var closeButton = document.querySelector("#closeLeft");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-left');

    assert.strictEqual(modal.classList[3], void 0);
    assert.strictEqual(testComponent.showLeft, false);
  }));

  it('should show on button click then close on close button click, right modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openRight');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-right');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showRight, true);

    var closeButton = document.querySelector("#closeRight");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-right');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showRight, false);

  }));

  it('should show on button click then close on close button click, top modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openTop');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-top');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showTop, true);

    var closeButton = document.querySelector("#closeTop");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-top');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showTop, false);
  }));

  it('should show on button click then close on close button click, bottom modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openBottom');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-bottom');

    assert.strictEqual(modal.classList[3], "in");
    assert.strictEqual(testComponent.showBottom, true);

    var closeButton = document.querySelector("#closeBottom");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-bottom');

    assert.strictEqual(modal.classList[3], void 0);
    assert.strictEqual(testComponent.showBottom, false);

  }));

  it('should show on button click then close on close button click, standard modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openStandard');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('#testStandard');
    modal = modal.querySelector('.modal');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showStandard, true);

    var closeButton = document.querySelector("#closeStandard");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('#testStandard');
    modal = modal.querySelector('.modal');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showStandard, false);

  }));

  it('should close on cross click, left modal', fakeAsync(function(){
    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openLeft');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-left');

    assert.strictEqual(modal.classList[3], "in");
    assert.strictEqual(testComponent.showLeft, true);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-left');

    assert.strictEqual(modal.classList[3], void 0);
    assert.strictEqual(testComponent.showLeft, false);
  }));

  it('should close on cross click, right modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openRight');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-right');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showRight, true);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-right');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showRight, false);

  }));

  it('should close on cross click, top modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openTop');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-top');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showTop, true);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-top');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showTop, false);
  }));

  it('should close on cross click, bottom modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openBottom');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-bottom');

    assert.strictEqual(modal.classList[3], "in");
    assert.strictEqual(testComponent.showBottom, true);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-bottom');

    assert.strictEqual(modal.classList[3], void 0);
    assert.strictEqual(testComponent.showBottom, false);

  }));

  it('should close on cross click, standard modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openStandard');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('#testStandard');
    modal = modal.querySelector('.modal');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showStandard, true);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('#testStandard');
    modal = modal.querySelector('.modal');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showStandard, false);

  }));



  it('should close on out modal click, left modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openLeft');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-left');

    assert.strictEqual(modal.classList[3], "in");
    assert.strictEqual(testComponent.showLeft, true);

    modal.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-left');

    assert.strictEqual(modal.classList[3], void 0);
    assert.strictEqual(testComponent.showLeft, false);

  }));

  it('should close on out modal click, right modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openRight');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-right');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showRight, true);

    modal.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-right');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showRight, false);

  }));

  it('should close on out modal click, top modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openTop');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-top');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showTop, true);

    modal.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-top');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showTop, false);

  }));

  it('should close on out modal click, bottom modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openBottom');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-bottom');

    assert.strictEqual(modal.classList[3], "in");
    assert.strictEqual(testComponent.showBottom, true);

    modal.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('.modal-bottom');

    assert.strictEqual(modal.classList[3], void 0);
    assert.strictEqual(testComponent.showBottom, false);

  }));

  it('should close on out modal click, standard modal', fakeAsync(function(){

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openStandard');
    button.click();
    tick();
    fixture.detectChanges();

    var modal = document.querySelector('#testStandard');
    modal = modal.querySelector('.modal');

    assert.strictEqual(modal.classList[2], "in");
    assert.strictEqual(testComponent.showStandard, true);

    modal.click();
    tick();
    fixture.detectChanges();

    modal = document.querySelector('#testStandard');
    modal = modal.querySelector('.modal');

    assert.strictEqual(modal.classList[2], void 0);
    assert.strictEqual(testComponent.showStandard, false);

  }));

});
