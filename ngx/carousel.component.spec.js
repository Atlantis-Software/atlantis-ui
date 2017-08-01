import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import atlantisUI from './ngx-atlantis-ui-module.js';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { carouselComponent } from './carousel.component.js';
import { carouselItemComponent } from './carousel-item.component.js';

var assert = require('assert');

class carouselTestComponent {
  constructor() {
  }
	static get annotations() {
		return [
			new Component({
        template: ``
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
});
