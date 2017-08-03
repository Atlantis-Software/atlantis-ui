import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ngxAtlUiModule } from './ngx-atlantis-ui-module.js';

var assert = require('assert');

class paginationTestComponent {
  constructor() {
    this.page = 15;
    this.pages = 100;
  }
	static get annotations() {
		return [
			new Component({
        template: `
        <pagination [page]="page" [pages]="pages" (pagechange)='testPagination($event)'></pagination>`
	  	})
		];
	}
  testPagination(page){
    this.page = page
  }
}

describe('pagination', function() {
  var testComponent;

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ngxAtlUiModule.forRoot({})],
      declarations: [paginationTestComponent ]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(function() {
    var fixture = TestBed.createComponent(paginationTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var page = document.querySelectorAll('li');

    assert.strictEqual(page.length, 9);

    assert.strictEqual(testComponent.page, 15);
    assert.strictEqual(testComponent.pages, 100);
  }));

  it('should render new value when click on left arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(paginationTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var page = document.querySelectorAll('li');
    page[0].click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(page.length, 9);

    assert.strictEqual(testComponent.page, 10);
    assert.strictEqual(testComponent.pages, 100);
  }));

  it('should render new value when click on right arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(paginationTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var page = document.querySelectorAll('li');

    page[8].click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(page.length, 9);

    assert.strictEqual(testComponent.page, 20);
    assert.strictEqual(testComponent.pages, 100);
  }));

  it('should render new value when click on right arrow', fakeAsync(function() {
    var fixture = TestBed.createComponent(paginationTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var page = document.querySelectorAll('li');

    page[5].click();
    tick();
    fixture.detectChanges();

    assert.strictEqual(page.length, 9);

    assert.strictEqual(testComponent.page, 17);
    assert.strictEqual(testComponent.pages, 100);
  }));

  it('should render correct page when we click last page ', fakeAsync(function() {
    var fixture = TestBed.createComponent(paginationTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    var page = document.querySelectorAll('li');

    page[7].click();
    tick();
    fixture.detectChanges();

    var page = document.querySelectorAll('li');

    assert.strictEqual(page.length, 7);

    assert.strictEqual(testComponent.page, 100);
    assert.strictEqual(testComponent.pages, 100);
  }));
});
