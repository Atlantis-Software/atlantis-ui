import {
  getTestBed,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ngxAtlUiModule } from './ngx-atlantis-ui-module.js';

var assert = require('assert');

var getNode = function(label) {
  var result;
  var treeNodeLabels = document.querySelectorAll('.tree-node-label');
  treeNodeLabels.forEach((treeNodeLabel) => {
    if (treeNodeLabel.innerText === label) {
      result = treeNodeLabel.parentElement;
    }
  });
  return result;
};

class treeTestComponent {
  constructor() {
    this.nodes = [
      {
        label: 'Node 1'
      },
      {
        label: 'Node 2',
        expandable: true,
        expanded: true,
        children: [
          {
            label: 'Node 21'
          },
          {
            label: 'Node 22'
          },
          {
            label: 'Node 23',
            expanded: false,
            expandable: true,
            children: [
              {
                label: 'Node 231'
              },
              {
                label: 'Node 232'
              },
              {
                label: 'Node 233'
              },
              {
                label: 'Node 234'
              }
            ]
          },
          {
            label: 'Node 24',
            expandable: true,
            expanded: true,
            children: [
              {
                label: 'Node 241'
              },
              {
                label: 'Node 242'
              },
              {
                label: 'Node 243'
              },
              {
                label: 'Node 244',
                expandable: true,
                expanded: true,
                children: [
                  {
                    label: 'Node 2441'
                  },
                  {
                    label: 'Node 2442'
                  },
                  {
                    label: 'Node 2443'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        label: 'Node 3'
      },
      {
        label: 'Node 4',
        children: [
          {
            label: 'Node 41'
          },
          {
            label: 'Node 42'
          },
          {
            label: 'Node 43'
          },
          {
            label: 'Node 44'
          }
        ],
        expandable: true
      }
    ];
  }
  static get annotations() {
    return [
      new Component({
        template: `
        <tree [nodes]="nodes"></tree>`
      })
    ];
  }
}

describe('tree', function() {

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ngxAtlUiModule.forRoot({})],
      declarations: [treeTestComponent]
    });
    TestBed.compileComponents();
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var treeNodeLines = document.querySelectorAll('.tree-node-line');

    var checkNodes = function(nodes, depth, parent) {
      nodes.forEach(function(node) {
        var found = false;
        treeNodeLines.forEach((treeNodeLine) => {
          if (treeNodeLine.querySelector('.tree-node-label').innerText === node.label) {
            assert(!found, 'Duplicate node');
            found = true;
            assert.strictEqual(window.getComputedStyle(treeNodeLine).paddingLeft, depth * 30 + "px");
            var label = node.label.substring(5);
            if (parent) {
              var parentLabel = parent.label.substring(5);
              assert.strictEqual(label.slice(0, -1), parentLabel);
            } else {
              assert.strictEqual(label.length, 1);
            }
          }

        });
        assert(found, 'Node not found');
        if (node.children) {
          checkNodes(node.children, depth + 1, node);
        }
      });
    };
    checkNodes(testComponent.nodes, 1);

    treeNodeLines.forEach((treeNodeLine) => {
      assert.strictEqual(treeNodeLine.querySelector('.tree-node-checkbox').checked, false);
    });
  }));

  it('should render new selected value when clicking on deepest element', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var node = getNode('Node 2442');
    assert(node, 'Node not found');
    var checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    tick();
    fixture.detectChanges();

    var treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText === 'Node 2442') {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      if (['Node 2', 'Node 24', 'Node 244'].indexOf(treeNodeLine.querySelector('.tree-node-label').innerText) !== -1) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').indeterminate, 'Node should be indeterminate');
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });
  }));

  it('should render new selected value when clicking on first element', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var node = getNode('Node 2');
    assert(node, 'Node not found');
    var checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 2')) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });
  }));

  it('should render new selected value when clicking on middle depth element', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var node = getNode('Node 24');
    assert(node, 'Node not found');
    var checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').indeterminate, 'Node should be indeterminate');
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });
  }));

  it('should render new selected value when clicking on parent element then on deepest children', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var node = getNode('Node 24');
    assert(node, 'Node not found');
    var checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').indeterminate, 'Node should be indeterminate');
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });

    node = getNode('Node 2442');
    assert(node, 'Node not found');
    checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24') &&
        (['Node 2', 'Node 24', 'Node 244', 'Node 2442'].indexOf(treeNodeLine.querySelector('.tree-node-label').innerText) === -1)) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      if (['Node 2', 'Node 24', 'Node 244'].indexOf(treeNodeLine.querySelector('.tree-node-label').innerText) !== -1) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').indeterminate, 'Node should be indeterminate');
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });
  }));

  it('should render new selected value when clicking on parent then child', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var node = getNode('Node 24');
    assert(node, 'Node not found');
    var checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    node = getNode('Node 244');
    assert(node, 'Node not found');
    checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24') &&
        !treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 244') &&
        treeNodeLine.querySelector('.tree-node-label').innerText !== 'Node 24') {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      if (['Node 2', 'Node 24'].indexOf(treeNodeLine.querySelector('.tree-node-label').innerText) !== -1) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').indeterminate, 'Node should be indeterminate');
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });
  }));

  it('should render new selected value when clicking on child then parent', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var node = getNode('Node 244');
    assert(node, 'Node not found');
    var checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    node = getNode('Node 24');
    assert(node, 'Node not found');
    checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').indeterminate, 'Node should be indeterminate');
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });
  }));

  it('should render new selected value when clicking on parent then deepest child then parent again', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var node = getNode('Node 24');
    assert(node, 'Node not found');
    var checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    node = getNode('Node 2443');
    assert(node, 'Node not found');
    checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    node = getNode('Node 24');
    assert(node, 'Node not found');
    checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').indeterminate, 'Node should be indeterminate');
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });
  }));

  it('should render new selected value when clicking on parent then deepest child then child\'s direct parent', fakeAsync(() => {
    var fixture = TestBed.createComponent(treeTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var node = getNode('Node 24');
    assert(node, 'Node not found');
    var checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    node = getNode('Node 2443');
    assert(node, 'Node not found');
    checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    node = getNode('Node 244');
    assert(node, 'Node not found');
    checkbox = node.querySelector('.tree-node-checkbox');
    assert(checkbox, 'Checkbox not found');

    checkbox.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var treeNodeLines = document.querySelectorAll('.tree-node-line');
    treeNodeLines.forEach((treeNodeLine) => {
      if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node should be checked');
        return;
      }
      if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
        assert(treeNodeLine.querySelector('.tree-node-checkbox').indeterminate, 'Node should be indeterminate');
      }
      assert(!treeNodeLine.querySelector('.tree-node-checkbox').checked, 'Node shouldn\'t be checked');
    });
  }));
});
