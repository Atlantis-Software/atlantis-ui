import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';



var assert = require('assert');

class modalTestComponent {
  constructor() {

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
  this.timeout(4000);

  var testComponent;

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [AtlantisUiModule.forRoot({}), FormsModule, ReactiveFormsModule],
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

    assert.strictEqual(modal[0].classList[1], "modal-left");
    assert.strictEqual(modal[1].classList[1], "modal-right");
    assert.strictEqual(modal[2].classList[1], "modal-top");
    assert.strictEqual(modal[3].classList[1], "modal-bottom");
    assert.strictEqual(modal[4].classList[1], void 0);


  }));

  it('should show on button click then close on close button click, left modal', fakeAsync(function() {
    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openLeft');
    button.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showLeft, true);

    var closeButton = document.querySelector("#closeLeft");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showLeft, false);
  }));

  it('should show on button click then close on close button click, right modal', fakeAsync(function() {

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openRight');
    button.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showRight, true);

    var closeButton = document.querySelector("#closeRight");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showRight, false);

  }));

  it('should show on button click then close on close button click, top modal', fakeAsync(function() {

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openTop');
    button.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showTop, true);

    var closeButton = document.querySelector("#closeTop");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showTop, false);
  }));

  it('should show on button click then close on close button click, bottom modal', fakeAsync(function() {

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openBottom');
    button.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showBottom, true);

    var closeButton = document.querySelector("#closeBottom");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showBottom, false);

  }));

  it('should show on button click then close on close button click, standard modal', fakeAsync(function() {

    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openStandard');
    button.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showStandard, true);

    var closeButton = document.querySelector("#closeStandard");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showStandard, false);

  }));

  it('should close on cross click, left modal', fakeAsync(function() {
    var fixture = TestBed.createComponent(modalTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var button = document.querySelector('#openLeft');
    button.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showLeft, true);

    var closeButton = document.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showLeft, false);
  }));

  it('should close on cross click, right modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showRight, true);

    var closeButton = modal.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showRight, false);

  }));

  it('should close on cross click, top modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showTop, true);

    var closeButton = modal.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showTop, false);
  }));

  it('should close on cross click, bottom modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showBottom, true);

    var closeButton = modal.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showBottom, false);

  }));

  it('should close on cross click, standard modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showStandard, true);

    var closeButton = modal.querySelector(".close");
    closeButton.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showStandard, false);

  }));

  it('should not close on out modal click, left modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showLeft, true);

    modal.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showLeft, true);

  }));

  it('should not close on out modal click, right modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showRight, true);

    modal.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showRight, true);

  }));

  it('should not close on out modal click, top modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showTop, true);

    modal.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showTop, true);

  }));

  it('should not close on out modal click, bottom modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showBottom, true);

    modal.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showBottom, true);

  }));

  it('should not close on out modal click, standard modal', fakeAsync(function() {

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

    assert.strictEqual(testComponent.showStandard, true);

    modal.click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(testComponent.showStandard, true);

  }));

});
