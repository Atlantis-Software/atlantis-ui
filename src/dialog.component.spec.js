import { getTestBed, TestBed, inject } from '@angular/core/testing';
import { Component } from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';

import { dialogService } from './dialog.service.js';

var assert = require('assert');

class dialogTestComponent {
  constructor(document) {
    this.showStandard = false;
    this.showWithOptions = false;
    this.document = document;
  }

  static get annotations() {
    return [
      new Component({
        template: `
        <div id="standard">
          <button type="button" class="btn btn-primary btn-sm" (click)="showStandard = true">
            Default dialog
          </button>
          <atlui-dlg [(show)]="showStandard">
            <p>Some text in the dialog.</p>
          </atlui-dlg>
        </div>
        <div id="withOptions">
          <button type="button" class="btn btn-primary btn-sm" (click)="showWithOptions = true">
            Default dialog
          </button>
          <atlui-dlg [(show)]="showWithOptions" [isResizable]="true" [width]="600" [height]="450"
            [minWidth]="300" [minHeight]="300" [maxWidth]="1000" [maxHeight]="600" [title]="'dialog Header'">
            <p>Some text in the dialog.</p>
          </atlui-dlg>
        </div>
        <div id="maxSize">
          <button type="button" class="btn btn-primary btn-sm" (click)="showMaxSize = true">
            Default dialog
          </button>
          <atlui-dlg [container]="document.body" [(show)]="showMaxSize" [isResizable]="true" [width]="600" [height]="450"
            [minWidth]="300" [minHeight]="300" [maxWidth]="2000" [maxHeight]="3000" [title]="'dialog Header'">
            <p>Some text in the dialog.</p>
          </atlui-dlg>
        </div>
        <div id="infMinSize">
          <button type="button" class="btn btn-primary btn-sm" (click)="showinfMinSize = true">
            Default dialog
          </button>
          <atlui-dlg [container]="document.body" [(show)]="showinfMinSize" [isResizable]="true" [width]="200" [height]="200"
            [minWidth]="300" [minHeight]="300" [title]="'dialog Header'">
            <p>Some text in the dialog.</p>
          </atlui-dlg>
        </div>`
      })
    ];
  }
}
dialogTestComponent.parameters = [DOCUMENT];

describe('dialog', function() {
  var fixture, ds, container;

  beforeEach((function() {
    TestBed.configureTestingModule({
      imports: [AtlantisUiModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [dialogTestComponent],
      providers: [dialogService]
    });
    TestBed.compileComponents();
  }));

  beforeEach(inject([dialogService], (dialogService)=> {
    ds = dialogService;
    fixture = TestBed.createComponent(dialogTestComponent);
    fixture.detectChanges();
    container = fixture.componentInstance;
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render correct dialog', () => {
    var dlg = document.querySelectorAll('.modal-dialog');
    var dlgContent = dlg[0].querySelector('.modal-content');
    var dlgContent2 = dlg[1].querySelector('.modal-content');
    var dlgContent3 = dlg[2].querySelector('.modal-content');
    var dlgContent4 = dlg[3].querySelector('.modal-content');

    assert.strictEqual(dlg[0].style.display, 'none');
    assert.strictEqual(dlg[0].style.zIndex, '');
    assert.strictEqual(ds.dialogs.length, 0);

    assert.strictEqual(dlgContent.style.width, '300px');
    assert.strictEqual(dlgContent.style.minWidth, '100px');
    if (parseInt(dlgContent.style.maxWidth) >= window.innerWidth) {
      assert.strictEqual(dlgContent.style.maxWidth, window.innerWidth+"px");
    } else {
      assert.strictEqual(dlgContent.style.maxWidth, "");
    }

    assert.strictEqual(dlgContent.style.height, '500px');
    assert.strictEqual(dlgContent.style.minHeight, '100px');
    if (parseInt(dlgContent.style.maxHeight) >= window.innerHeight) {
      assert.strictEqual(dlgContent.style.maxHeight, window.innerHeight+"px");
    } else {
      assert.strictEqual(dlgContent.style.maxHeight, "");
    }

    assert.strictEqual(dlgContent2.style.width, '600px');
    assert.strictEqual(dlgContent2.style.minWidth, '300px');
    if (parseInt(dlgContent2.style.maxWidth) >= window.innerWidth) {
      assert.strictEqual(dlgContent2.style.maxWidth, window.innerWidth+"px");
    } else {
      assert.strictEqual(dlgContent2.style.maxWidth, "1000px");
    }

    assert.strictEqual(dlgContent2.style.height, '450px');
    assert.strictEqual(dlgContent2.style.minHeight, '300px');
    if (parseInt(dlgContent2.style.maxHeight) >= window.innerHeight) {
      assert.strictEqual(dlgContent2.style.maxHeight, window.innerHeight+"px");
    } else {
      assert.strictEqual(dlgContent2.style.maxHeight, "600px");
    }

    assert.strictEqual(dlgContent3.style.width, '600px');
    assert.strictEqual(dlgContent3.style.minWidth, '300px');
    if (parseInt(dlgContent3.style.maxWidth) >= window.innerWidth) {
      assert.strictEqual(dlgContent3.style.maxWidth, window.innerWidth+"px");
    } else {
      assert.strictEqual(dlgContent3.style.maxWidth, "1000px");
    }

    assert.strictEqual(dlgContent3.style.height, '450px');
    assert.strictEqual(dlgContent3.style.minHeight, '300px');
    if (parseInt(dlgContent3.style.maxHeight) >= window.innerHeight) {
      assert.strictEqual(dlgContent3.style.maxHeight, window.innerHeight+"px");
    } else if (parseInt(dlgContent3.style.maxHeight) >= document.body.offsetHeight) {
      assert.strictEqual(dlgContent3.style.maxHeight, document.body.offsetHeight+"px");
    } else {
      assert.strictEqual(dlgContent3.style.maxHeight, "600px");
    }

    assert.strictEqual(dlgContent4.style.width, '300px');
    assert.strictEqual(dlgContent4.style.minWidth, '300px');
    if (parseInt(dlgContent4.style.maxWidth) >= window.innerWidth) {
      assert.strictEqual(dlgContent4.style.maxWidth, window.innerWidth+"px");
    } else {
      assert.strictEqual(dlgContent4.style.maxWidth, "1000px");
    }

    assert.strictEqual(dlgContent4.style.height, '300px');
    assert.strictEqual(dlgContent4.style.minHeight, '300px');
    if (parseInt(dlgContent4.style.maxHeight) >= window.innerHeight) {
      assert.strictEqual(dlgContent4.style.maxHeight, window.innerHeight+"px");
    } else if (parseInt(dlgContent4.style.maxHeight) >= document.body.offsetHeight) {
      assert.strictEqual(dlgContent4.style.maxHeight, document.body.offsetHeight+"px");
    } else {
      assert.strictEqual(dlgContent4.style.maxHeight, "600px");
    }

  });

  it('should show on button click then close on close button click', () => {
    var button = document.querySelector('#standard button');
    button.click();
    fixture.detectChanges();
    assert.strictEqual(ds.dialogs.length, 1);
    assert.strictEqual(container.showStandard, true);

    var dlg = document.querySelectorAll('.modal-dialog');
    var closeButton = dlg[0].querySelector(".close");

    assert.strictEqual(dlg[0].style.display, 'block');
    assert.strictEqual(dlg[0].style.zIndex, '980');

    closeButton.click();
    fixture.detectChanges();

    assert.strictEqual(ds.dialogs.length, 0);
    assert.strictEqual(container.showStandard, false);
    button = document.querySelector('#withOptions button');
    button.click();
    fixture.detectChanges();
    assert.strictEqual(ds.dialogs.length, 1);
    assert.strictEqual(container.showWithOptions, true);

    assert.strictEqual(dlg[1].style.display, 'block');
    assert.strictEqual(dlg[1].style.zIndex, '980');

    closeButton = dlg[1].querySelector(".close");
    closeButton.click();
    fixture.detectChanges();

    assert.strictEqual(ds.dialogs.length, 0);
    assert.strictEqual(container.showWithOptions, false);
  });

  it('should open multiple dialog', () => {
    var button = document.querySelector('#standard button');
    button.click();
    fixture.detectChanges();
    assert.strictEqual(ds.dialogs.length, 1);
    assert.strictEqual(container.showStandard, true);

    var dlg = document.querySelectorAll('.modal-dialog');

    button = document.querySelector('#withOptions button');
    button.click();
    fixture.detectChanges();
    assert.strictEqual(ds.dialogs.length, 2);
    assert.strictEqual(container.showWithOptions, true);

    var closeButton = dlg[0].querySelector(".close");
    closeButton.click();
    fixture.detectChanges();

    assert.strictEqual(ds.dialogs.length, 1);
    assert.strictEqual(container.showStandard, false);

    closeButton = dlg[1].querySelector(".close");
    closeButton.click();
    fixture.detectChanges();

    assert.strictEqual(ds.dialogs.length, 0);
    assert.strictEqual(container.showWithOptions, false);
  });

  it('should focus on click', () => {
    var button = document.querySelector('#standard button');
    button.click();
    fixture.detectChanges();
    assert.strictEqual(ds.dialogs.length, 1);
    assert.strictEqual(container.showStandard, true);

    var dlg = document.querySelectorAll('.modal-dialog');

    button = document.querySelector('#withOptions button');
    button.click();
    fixture.detectChanges();
    assert.strictEqual(ds.dialogs.length, 2);
    assert.strictEqual(container.showWithOptions, true);

    assert.strictEqual(dlg[0].style.zIndex, "980");
    assert.strictEqual(dlg[1].style.zIndex, "981");

    var mousedown = new Event('mousedown', { 'bubbles': true });

    dlg[0].querySelector('.modal-content').dispatchEvent(mousedown);
    fixture.detectChanges();

    assert.strictEqual(dlg[0].style.zIndex, "981");
    assert.strictEqual(dlg[1].style.zIndex, "980");

    var closeButton = dlg[0].querySelector(".close");
    closeButton.click();
    fixture.detectChanges();

    assert.strictEqual(ds.dialogs.length, 1);
    assert.strictEqual(container.showStandard, false);

    closeButton = dlg[1].querySelector(".close");
    closeButton.click();
    fixture.detectChanges();

    assert.strictEqual(ds.dialogs.length, 0);
    assert.strictEqual(container.showWithOptions, false);
  });

  it('should move when drag on modal-header', () => {
    var button = document.querySelector('#standard button');
    button.click();
    fixture.detectChanges();
    assert.strictEqual(ds.dialogs.length, 1);
    assert.strictEqual(container.showStandard, true);

    var draggable = document.querySelector(".modal-header");

    var mousedown = new Event('mousedown', { 'bubbles': true });
    mousedown.clientX = 10;
    mousedown.clientY = 5;

    draggable.dispatchEvent(mousedown);
    fixture.detectChanges();

    var dlg = document.querySelector(".modal-dialog");

    var draggableStyle1 = window.getComputedStyle(dlg);

    assert.strictEqual(draggableStyle1.getPropertyValue('z-index'), '99999');
    var top = draggableStyle1.getPropertyValue('top');
    var left = draggableStyle1.getPropertyValue('left');

    var mouseMove = new Event('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 50,
      clientY: 20
    });

    draggable.dispatchEvent(mouseMove);
    fixture.detectChanges();

    var mouseUp = new Event('mouseup', { 'bubbles': true });
    draggable.dispatchEvent(mouseUp);
    fixture.detectChanges();
    var draggableTop1 = draggableStyle1.getPropertyValue("top");
    var draggableLeft1 = draggableStyle1.getPropertyValue("left");

    assert.strictEqual(draggableTop1, top);
    assert.strictEqual(draggableLeft1, left);
    assert.strictEqual(draggableStyle1.getPropertyValue('z-index'), '980');



  });

});
