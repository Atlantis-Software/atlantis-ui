import { getTestBed, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import tabComponent from './tab.component.js';
import { tabpanelDirective, tabPanelHeaderDirective } from './tab-panel.component.js';

var assert = require('assert');

class tabTestComponent {
  constructor() {}
  static get annotations() {
    return [
      new Component({
        template: `
        <atlui-tabs id="tab1" (onChange)="onChangeTab($event)">
          <atlui-tab-panel title="simple">
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p><button class="btn btn-default">My button</button>
          </atlui-tab-panel>
          <atlui-tab-panel>
            <ng-template atlui-tab-panel-header>
              <span style="color:red">Fancy</span> title
            </ng-template>
            <p>Lorem ipsum</p>
          </atlui-tab-panel>
          <atlui-tab-panel title="Title simple">
            <ng-template atlui-tab-panel-header>
              <span style="color:red">Fancy</span> title
            </ng-template>
            <p>Lorem ipsum</p>
          </atlui-tab-panel>
          <atlui-tab-panel [disabled]="true" title="Disabled">
            <p>Lorem ipsum</p>
          </atlui-tab-panel>
        </atlui-tabs>
        <atlui-tabs id="tabOversize" [height]="'100px'">
          <atlui-tab-panel title="Disabled">
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </atlui-tab-panel>
        </atlui-tabs>`
      })
    ];
  }
  onChangeTab(selectedpanel) {
    if (selectedpanel && selectedpanel.title) {
      this.title = selectedpanel.title;
    }
  }
}

describe('tabs', function() {
  var fixture;
  var testComponent;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [tabTestComponent, tabComponent, tabpanelDirective, tabPanelHeaderDirective]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(tabTestComponent);
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(function() {
    tick();
    fixture.detectChanges();
    var tab1 = document.querySelector("#tab1");
    var navItem = tab1.querySelectorAll('li');
    var panels = tab1.querySelectorAll('atlui-tab-panel');

    assert.strictEqual(navItem.length, 4);
    assert.strictEqual(navItem[0].classList.contains("active"), true);
    assert.strictEqual(navItem[1].classList.contains("active"), false);
    assert.strictEqual(navItem[2].classList.contains("active"), false);
    assert.strictEqual(navItem[3].classList.contains("active"), false);

    assert.strictEqual(navItem[0].querySelector("a").innerText, "simple");
    assert.strictEqual(navItem[1].querySelector("a").innerText, "Fancy title");
    assert.strictEqual(navItem[2].querySelector("a").innerText, "Fancy title");
    assert.strictEqual(navItem[3].querySelector("a").innerText, "Disabled");

    assert.strictEqual(panels.length, 4);
    assert.strictEqual(panels[0].classList.contains("active"), true);
    assert.strictEqual(panels[1].classList.contains("active"), false);
    assert.strictEqual(panels[2].classList.contains("active"), false);
    assert.strictEqual(panels[3].classList.contains("active"), false);
  }));

  it('should render selected tab', fakeAsync(function() {
    testComponent = fixture.componentInstance;
    tick();
    fixture.detectChanges();
    var tab1 = document.querySelector("#tab1");
    var navItem = tab1.querySelectorAll('a');
    var panels = tab1.querySelectorAll('atlui-tab-panel');
    // select tab index 2 because by default tab with index 0 is selected
    navItem[2].click();
    tick();
    fixture.detectChanges();
    assert.strictEqual(panels.length, 4);
    assert.strictEqual(panels[0].classList.contains("active"), false);
    assert.strictEqual(panels[1].classList.contains("active"), false);
    assert.strictEqual(panels[2].classList.contains("active"), true);
    assert.strictEqual(panels[3].classList.contains("active"), false);
    assert.strictEqual(testComponent.title, "Title simple");
  }));

  it('should render correct size', fakeAsync(function() {
    tick();
    fixture.detectChanges();
    var tab2 = document.querySelector("#tabOversize");
    var tabContent = tab2.querySelector(".tab-content");
    assert.strictEqual(tabContent.style.height, "100px");
  }));
});
