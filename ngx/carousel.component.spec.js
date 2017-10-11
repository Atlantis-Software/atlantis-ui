import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { carouselComponent } from './carousel.component.js';
import { carouselItemComponent } from './carousel.component.js';

var assert = require('assert');

class carouselTestComponent {
  constructor() {
    this.show1 = true;
    this.show2 = true;
    this.show3 = true;
  }
  static get annotations() {
    return [
      new Component({
        template: `
        <carousel indicator="true" activeDefault="1">
        <carousel-item *ngIf="show1">
          <img class="img-responsive center-block" src="../../img/carousel01.jpg" alt="">
          <div class="carousel-caption">slide1</div>
        </carousel-item>
        <carousel-item *ngIf="show2">
          <img class="img-responsive center-block" src="../../img/carousel02.jpg" alt="">
          <div class="carousel-caption">slide2</div>
        </carousel-item>
        <carousel-item *ngIf="show3">
          <img class="img-responsive center-block" src="../../img/carousel03.jpg" alt="">
          <div class="carousel-caption"></div>
        </carousel-item>
        </carousel>`
      })
    ];
  }
}

describe('carousel', function() {
  var testComponent;

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [carouselTestComponent, carouselComponent, carouselItemComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default item and available options', fakeAsync(function() {
    var fixture = TestBed.createComponent(carouselTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var labels = document.querySelectorAll('.carousel-caption');
    var items = document.querySelectorAll('carousel-item');
    var indicators = document.querySelectorAll('li');

    assert.strictEqual(labels.length, 3);
    assert.strictEqual(labels[0].textContent, 'slide1');
    assert.strictEqual(labels[1].textContent, 'slide2');
    assert.strictEqual(labels[2].textContent, '');

    assert.strictEqual(items.length, 3);
    assert.strictEqual(items[0].classList[1], void 0);
    assert.strictEqual(items[1].classList[1], 'active');
    assert.strictEqual(items[2].classList[1], void 0);

    assert.strictEqual(indicators.length, 3);
    assert.strictEqual(indicators[0].classList[0], void 0);
    assert.strictEqual(indicators[1].classList[0], 'active');
    assert.strictEqual(indicators[2].classList[0], void 0);
  }));

  it('should render selected item', fakeAsync(function() {
    var fixture = TestBed.createComponent(carouselTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var indicators = document.querySelectorAll('li');
    indicators[0].click();
    tick();
    fixture.detectChanges();
    var items = document.querySelectorAll('carousel-item');
    assert.strictEqual(items.length, 3);
    assert.strictEqual(items[0].classList[1], 'active');
    assert.strictEqual(items[1].classList[1], void 0);
    assert.strictEqual(items[2].classList[1], void 0);

    assert.strictEqual(indicators.length, 3);
    assert.strictEqual(indicators[0].classList[0], 'active');
    assert.strictEqual(indicators[1].classList[0], void 0);
    assert.strictEqual(indicators[2].classList[0], void 0);
  }));

  it('should render selected item right arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(carouselTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var rightArrow = document.querySelector('a.right');
    rightArrow.click();
    tick();
    fixture.detectChanges();

    var indicators = document.querySelectorAll('li');
    var items = document.querySelectorAll('carousel-item');

    assert.strictEqual(items.length, 3);
    assert.strictEqual(items[0].classList[1], void 0);
    assert.strictEqual(items[1].classList[1], void 0);
    assert.strictEqual(items[2].classList[1], 'active');

    assert.strictEqual(indicators.length, 3);
    assert.strictEqual(indicators[0].classList[0], void 0);
    assert.strictEqual(indicators[1].classList[0], void 0);
    assert.strictEqual(indicators[2].classList[0], 'active');
  }));

  it('should render selected item left arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(carouselTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var leftArrow = document.querySelector('a.left');
    leftArrow.click();
    tick();
    fixture.detectChanges();

    var indicators = document.querySelectorAll('li');
    var items = document.querySelectorAll('carousel-item');

    assert.strictEqual(items.length, 3);
    assert.strictEqual(items[0].classList[1], 'active');
    assert.strictEqual(items[1].classList[1], void 0);
    assert.strictEqual(items[2].classList[1], void 0);

    assert.strictEqual(indicators.length, 3);
    assert.strictEqual(indicators[0].classList[0], 'active');
    assert.strictEqual(indicators[1].classList[0], void 0);
    assert.strictEqual(indicators[2].classList[0], void 0);
  }));

  it('should render correct item, toggle first item', fakeAsync(function() {
    var fixture = TestBed.createComponent(carouselTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    testComponent.show1 = false;
    tick();
    fixture.detectChanges();

    var labels = document.querySelectorAll('.carousel-caption');
    var indicators = document.querySelectorAll('li');
    var items = document.querySelectorAll('carousel-item');

    assert.strictEqual(items.length, 2);
    assert.strictEqual(items[0].classList[1], 'active');
    assert.strictEqual(items[1].classList[1], void 0);

    assert.strictEqual(indicators.length, 2);
    assert.strictEqual(indicators[0].classList[0], 'active');
    assert.strictEqual(indicators[1].classList[0], void 0);

    assert.strictEqual(labels.length, 2);
    assert.strictEqual(labels[0].textContent, 'slide2');
    assert.strictEqual(labels[1].textContent, '');

  }));

  it('should render correct item, toggle active item', fakeAsync(function() {
    var fixture = TestBed.createComponent(carouselTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    testComponent.show2 = false;
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();

    var labels = document.querySelectorAll('.carousel-caption');
    var indicators = document.querySelectorAll('li');
    var items = document.querySelectorAll('carousel-item');

    assert.strictEqual(items.length, 2);
    assert.strictEqual(items[0].classList[1], 'active');
    assert.strictEqual(items[1].classList[1], void 0);

    assert.strictEqual(indicators.length, 2);
    assert.strictEqual(indicators[0].classList[0], 'active');
    assert.strictEqual(indicators[1].classList[0], void 0);

    assert.strictEqual(labels.length, 2);
    assert.strictEqual(labels[0].textContent, 'slide1');
    assert.strictEqual(labels[1].textContent, '');
  }));

  it('should render correct item, toggle all then active one', fakeAsync(function() {
    var fixture = TestBed.createComponent(carouselTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    testComponent.show1 = false;
    testComponent.show2 = false;
    testComponent.show3 = false;
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();

    testComponent.show1 = true;
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();

    var labels = document.querySelectorAll('.carousel-caption');
    var indicators = document.querySelectorAll('li');
    var items = document.querySelectorAll('carousel-item');

    assert.strictEqual(items.length, 1);
    assert.strictEqual(items[0].classList[1], 'active');

    assert.strictEqual(indicators.length, 1);
    assert.strictEqual(indicators[0].classList[0], 'active');

    assert.strictEqual(labels.length, 1);
    assert.strictEqual(labels[0].textContent, 'slide1');
  }));
});
