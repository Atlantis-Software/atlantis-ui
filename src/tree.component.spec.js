import { getTestBed, TestBed, async, fakeAsync, tick, inject} from '@angular/core/testing';

import { dragAndDropSortableService, dragAndDropService } from './dragAndDrop.service.js';

import { Component } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AtlantisUiModule } from './atlantis-ui.module.js';
var _ = require('lodash');

function triggerEvent(elem, eventType) {
  var event = new DragEvent(eventType);
  elem.dispatchEvent(event);
}

function checkNodes(treeNodeLines, nodes, depth, parent) {
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
      checkNodes(treeNodeLines, node.children, depth + 1, node);
    }
  });
}

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
    this.nested = false;
    this.plugins = ['checkbox'];
    this.testPlugins = 0;
    this.nodes = [
      {
        label: 'Node 1'
      },
      {
        label: 'Node 2',
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
    this.expand = this.collapse = this.onClick = this.checked = this.unchecked = false;
  }
  static get annotations() {
    return [
      new Component({
        template: `
        <atlui-tree [nodes]="nodes" [plugins]="plugins" (onExpand)="expandCallback($event)" (onCollapse)="collapseCallback($event)" (onClick)="onClickCallback($event)" (onChecked)="checkedCallback($event)" (onUnchecked)="uncheckedCallback($event)"></atlui-tree>`
      })
    ];
  }

  expandCallback() {
    this.expand = true;
  }

  collapseCallback() {
    this.collapse = true;
  }

  checkedCallback() {
    this.checked = true;
  }

  uncheckedCallback() {
    this.unchecked = true;
  }

  onClickCallback() {
    this.onClick = true;
  }

}

describe('tree', function() {

  describe('default value and selection', function() {
    beforeEach(async(function() {
      TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule, AtlantisUiModule.forRoot({})],
        declarations: [treeTestComponent]
      });
      TestBed.compileComponents();
    }));

    afterEach(function() {
      getTestBed().resetTestingModule();
    });

    it('should render default value and available options', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges(); // initialize controls
      tick();  // wait registration controls

      var testComponent = fixture.componentInstance;
      var treeNodeLines = document.querySelectorAll('.tree-node-line');

      checkNodes(treeNodeLines, testComponent.nodes, 1);

      treeNodeLines.forEach((treeNodeLine) => {
        assert.strictEqual(treeNodeLine.querySelector('input[type="checkbox"]').checked, false);
      });
    }));

    it('should render new selected value when clicking on deepest element', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges(); // initialize controls
      tick(); // wait registration controls

      var node = getNode('Node 2442');
      assert(node, 'Node not found');
      var checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();
      var treeNodeLines = document.querySelectorAll('.tree-node-line');
      treeNodeLines.forEach((treeNodeLine) => {

        if (treeNodeLine.querySelector('.tree-node-label').innerText === 'Node 2442') {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        if (['Node 2', 'Node 24', 'Node 244'].indexOf(treeNodeLine.querySelector('.tree-node-label').innerText) !== -1) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').indeterminate, 'Node should be indeterminate');
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });
    }));

    it('should render new selected value when clicking on first element', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges(); // initialize controls
      tick(); // wait registration controls

      var node = getNode('Node 2');
      assert(node, 'Node not found');
      var checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      var treeNodeLines = document.querySelectorAll('.tree-node-line');
      treeNodeLines.forEach((treeNodeLine) => {
        if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 2')) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });
    }));

    it('should render new selected value when clicking on middle depth element', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges(); // initialize controls
      tick(); // wait registration controls

      var node = getNode('Node 24');
      assert(node, 'Node not found');
      var checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      var treeNodeLines = document.querySelectorAll('.tree-node-line');
      treeNodeLines.forEach((treeNodeLine) => {
        if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').indeterminate, 'Node should be indeterminate');
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });
    }));

    it('should render new selected value when clicking on parent element then on deepest children', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges(); // initialize controls
      tick(); // wait registration controls

      var node = getNode('Node 24');
      assert(node, 'Node not found');
      var checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      var treeNodeLines = document.querySelectorAll('.tree-node-line');
      treeNodeLines.forEach((treeNodeLine) => {
        if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').indeterminate, 'Node should be indeterminate');
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });

      node = getNode('Node 2442');
      assert(node, 'Node not found');
      checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      treeNodeLines = document.querySelectorAll('.tree-node-line');
      treeNodeLines.forEach((treeNodeLine) => {
        if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24') &&
          (['Node 2', 'Node 24', 'Node 244', 'Node 2442'].indexOf(treeNodeLine.querySelector('.tree-node-label').innerText) === -1)) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        if (['Node 2', 'Node 24', 'Node 244'].indexOf(treeNodeLine.querySelector('.tree-node-label').innerText) !== -1) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').indeterminate, 'Node should be indeterminate');
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });
    }));

    it('should render new selected value when clicking on parent then child', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges();  // initialize controls
      tick(); // wait registration controls

      var node = getNode('Node 24');
      assert(node, 'Node not found');
      var checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      node = getNode('Node 244');
      assert(node, 'Node not found');
      checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      var treeNodeLines = document.querySelectorAll('.tree-node-line');
      treeNodeLines.forEach((treeNodeLine) => {
        if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24') &&
          !treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 244') &&
          treeNodeLine.querySelector('.tree-node-label').innerText !== 'Node 24') {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        if (['Node 2', 'Node 24'].indexOf(treeNodeLine.querySelector('.tree-node-label').innerText) !== -1) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').indeterminate, 'Node should be indeterminate');
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });
    }));

    it('should render new selected value when clicking on child then parent', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges();  // initialize controls
      tick(); // wait registration controls

      var node = getNode('Node 244');
      assert(node, 'Node not found');
      var checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      node = getNode('Node 24');
      assert(node, 'Node not found');
      checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      var treeNodeLines = document.querySelectorAll('.tree-node-line');
      treeNodeLines.forEach((treeNodeLine) => {
        if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').indeterminate, 'Node should be indeterminate');
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });
    }));

    it('should render new selected value when clicking on parent then deepest child then parent again', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges();  // initialize controls
      tick(); // wait registration controls

      var node_24 = getNode('Node 24');
      assert(node_24, 'Node not found');
      var checkbox_24 = node_24.querySelector('input[type="checkbox"]');
      assert(checkbox_24, 'Checkbox not found');
      checkbox_24.click();
      fixture.detectChanges();
      var node_2443 = getNode('Node 2443');
      assert(node_2443, 'Node not found');
      var checkbox_2443 = node_2443.querySelector('input[type="checkbox"]');
      assert(checkbox_2443, 'Checkbox not found');
      checkbox_2443.click();
      fixture.detectChanges();
      var node_24_again = getNode('Node 24');
      assert(node_24_again, 'Node not found');
      var checkbox_24_again = node_24_again.querySelector('input[type="checkbox"]');
      assert(checkbox_24_again, 'Checkbox not found');
      checkbox_24_again.click();
      fixture.detectChanges();
      var treeNodeLines = document.querySelectorAll('.tree-node-line');

      treeNodeLines.forEach((treeNodeLine) => {
        if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').indeterminate, 'Node should be indeterminate');
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });


    }));

    it('should render new selected value when clicking on parent then deepest child then child\'s direct parent', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      fixture.detectChanges();  // initialize controls
      tick();  // wait registration controls

      var node = getNode('Node 24');
      assert(node, 'Node not found');
      var checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      node = getNode('Node 2443');
      assert(node, 'Node not found');
      checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      node = getNode('Node 244');
      assert(node, 'Node not found');
      checkbox = node.querySelector('input[type="checkbox"]');
      assert(checkbox, 'Checkbox not found');

      checkbox.click();
      fixture.detectChanges();

      var treeNodeLines = document.querySelectorAll('.tree-node-line');
      treeNodeLines.forEach((treeNodeLine) => {
        if (treeNodeLine.querySelector('.tree-node-label').innerText.includes('Node 24')) {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node should be checked');
          return;
        }
        if (treeNodeLine.querySelector('.tree-node-label').innerText === "Node 2") {
          assert(treeNodeLine.querySelector('input[type="checkbox"]').indeterminate, 'Node should be indeterminate');
        }
        assert(!treeNodeLine.querySelector('input[type="checkbox"]').checked, 'Node shouldn\'t be checked');
      });
    }));

    it('should send callback', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      var testComponent = fixture.componentInstance;
      fixture.detectChanges(); // initialize controls
      tick(); // wait registration controls

      assert.strictEqual(testComponent.expand, false);
      assert.strictEqual(testComponent.collapse, false);
      assert.strictEqual(testComponent.onClick, false);
      var node = getNode('Node 23');
      assert(node, 'Node not found');
      var expander = node.querySelector('.tree-expander');
      assert(expander, 'Expander not found');

      expander.click();
      fixture.detectChanges();
      assert.strictEqual(testComponent.expand, true);

      expander.click();
      fixture.detectChanges();
      assert.strictEqual(testComponent.collapse, true);

      var label = node.querySelector('.tree-node-label');
      assert(label, 'Expander not found');
      label.click();
      fixture.detectChanges();
      assert.strictEqual(testComponent.onClick, true);

      var checkbox = node.querySelector('input[type="checkbox"]');
      checkbox.click();
      fixture.detectChanges();
      (function searchNode(arrayNodes = testComponent.nodes) {
        var node_23 = _.find(arrayNodes, function(n) { return n.label === 'Node 23'; });
        if (node_23) {
          assert.strictEqual(node_23.selected, true);
          assert.strictEqual(node_23.indeterminate, false);
        } else {
          arrayNodes.forEach(function(node){
            if (node.children && node.children.length > 0) {
              searchNode(node.children);
            }
          });
        }
      }());

      checkbox.click();
      fixture.detectChanges();
      (function searchNode(arrayNodes = testComponent.nodes) {
        var node_23 = _.find(arrayNodes, function(n) { return n.label === 'Node 23'; });
        if (node_23) {
          assert.strictEqual(node_23.selected, false);
          assert.strictEqual(node_23.indeterminate, false);
        } else {
          arrayNodes.forEach(function(node){
            if (node.children && node.children.length > 0) {
              searchNode(node.children);
            }
          });
        }
      }());
    }));

    it('should active all event on plugins', fakeAsync(() => {
      var fixture = TestBed.createComponent(treeTestComponent);
      var testComponent = fixture.componentInstance;
      var testplugins = function() {
        testComponent.testPlugins += 1;
      };
      testComponent.plugins = [
        {
          icon: 'testAllEvent',
          onClick: testplugins,
          onDblclick: testplugins,
          onMousedown: testplugins,
          onMouseenter: testplugins,
          onMouseleave: testplugins,
          onMousemove: testplugins,
          onMouseover: testplugins,
          onMouseout: testplugins,
          onMouseup: testplugins,
          onDragenter: testplugins,
          onDragleave: testplugins,
          onDragstart: testplugins,
          onDragend: testplugins,
          onDragover: testplugins,
          onDrop: testplugins,
          onInit: function() {
            this.disable();
            this.activate();
            this.hide();
            this.show();
          },
          onDestroy: function() {},
          onChange: function() {}
        },
        {
          icon: 'testDisabledPlugins',
          click: testplugins,
          dblclick: testplugins,
          mousedown: testplugins,
          mouseenter: testplugins,
          mouseleave: testplugins,
          mousemove: testplugins,
          mouseover: testplugins,
          mouseout: testplugins,
          mouseup: testplugins,
          dragenter: testplugins,
          dragleave: testplugins,
          dragstart: testplugins,
          dragend: testplugins,
          dragover: testplugins,
          drop: testplugins,
          onInit: function() {
            this.disable();
          },
          onDestroy: function() {},
          onChange: function() {}
        },
        {
          icon: 'testNoEvent'
        }
      ];
      fixture.detectChanges();
      tick();

      var node = getNode('Node 23');
      assert(node, 'Node not found');
      var plugins = node.querySelectorAll('tree-plugin .icon');
      assert(plugins, 'Expander not found');

      plugins[1].click();
      plugins[2].click();
      assert.strictEqual(testComponent.testPlugins,0);
      plugins[0].click();
      assert.strictEqual(testComponent.testPlugins,1);

      var event = new Event('mousedown', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,1);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,2);

      event = new Event('mouseenter', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,2);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,3);

      event = new Event('mouseleave', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,3);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,4);

      event = new Event('mousemove', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,4);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,5);

      event = new Event('mouseover', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,5);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,6);

      event = new Event('mouseout', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,6);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,7);

      event = new Event('mouseup', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,7);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,8);

      event = new Event('dragenter', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,8);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,9);

      event = new Event('dragleave', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,9);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,10);

      event = new Event('dragstart', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,10);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,11);

      event = new Event('dragend', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,11);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,12);

      event = new Event('dragover', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,12);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,13);

      event = new Event('drop', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,13);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,14);

      event = new Event('dblclick', { 'bubbles': true });
      plugins[1].dispatchEvent(event);
      plugins[2].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,14);
      plugins[0].dispatchEvent(event);
      assert.strictEqual(testComponent.testPlugins,15);
    }));
  });

  describe('sortable same level', function() {
    var fixture, ds;
    beforeEach(async(function() {
      TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule, AtlantisUiModule.forRoot({})],
        declarations: [treeTestComponent],
        providers: [dragAndDropSortableService, dragAndDropService]
      });
      TestBed.compileComponents();
    }));

    beforeEach(inject([dragAndDropSortableService, dragAndDropService],
      (dragAndDropSortableService) => {
        ds = dragAndDropSortableService;
        fixture = TestBed.createComponent(treeTestComponent);
        fixture.detectChanges();
      }));

    afterEach(function() {
      getTestBed().resetTestingModule();
    });

    it('should sort into same list first depth', fakeAsync(() => {
      var testComponent = fixture.componentInstance;
      testComponent.plugins = ['checkox', 'sortable'];
      fixture.detectChanges();
      tick();
      var node = getNode('Node 2');
      assert(node, 'Node not found');
      var handle = node.querySelector('span[atlui-sortable-handle]');
      var node2 = getNode('Node 3');
      assert(node2, 'Node not found');

      var mouseDown = new Event('mousedown', { 'bubbles': true });

      handle.dispatchEvent(mouseDown);
      triggerEvent(node.parentNode, 'dragstart');

      fixture.detectChanges();

      assert.strictEqual(ds.sortableContainer.sortableData, testComponent.nodes, 'should be defined');
      assert.strictEqual(ds.index, 1, 'should be defined');

      triggerEvent(node2.parentNode, 'dragenter');
      triggerEvent(node2.parentNode, 'drop');
      triggerEvent(node.parentNode, 'dragend');
      fixture.detectChanges();

      var treeNodeLines = document.querySelectorAll('.tree-node-line');

      checkNodes(treeNodeLines, testComponent.nodes, 1);

    }));

    it('should sort into same list second depth and do nothing if sort into sup level', fakeAsync(() => {
      var testComponent = fixture.componentInstance;
      testComponent.plugins = ['checkox', 'sortable'];
      fixture.detectChanges();
      tick();
      var node21 = getNode('Node 21');
      assert(node21, 'Node not found');
      var handle = node21.querySelector('span[atlui-sortable-handle]');
      var node23 = getNode('Node 23');
      assert(node23, 'Node not found');

      var mouseDown = new Event('mousedown', { 'bubbles': true });

      handle.dispatchEvent(mouseDown);
      triggerEvent(node21.parentNode, 'dragstart');

      fixture.detectChanges();

      triggerEvent(node23.parentNode, 'dragenter');
      triggerEvent(node23.parentNode, 'drop');
      triggerEvent(node21.parentNode, 'dragend');
      fixture.detectChanges();

      var treeNodeLines = document.querySelectorAll('.tree-node-line');
      checkNodes(treeNodeLines, testComponent.nodes, 1);

      var node1 = getNode('Node 1');

      handle.dispatchEvent(mouseDown);
      triggerEvent(node21.parentNode, 'dragstart');

      fixture.detectChanges();

      triggerEvent(node1.parentNode, 'dragenter');
      triggerEvent(node1.parentNode, 'drop');
      triggerEvent(node21.parentNode, 'dragend');

      treeNodeLines = document.querySelectorAll('.tree-node-line');
      checkNodes(treeNodeLines, testComponent.nodes, 1);

    }));
  });

  describe('sortable in different level', function() {
    var fixture, ds;
    beforeEach(async(function() {
      TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule, AtlantisUiModule.forRoot({})],
        declarations: [treeTestComponent],
        providers: [dragAndDropSortableService, dragAndDropService]
      });
      TestBed.compileComponents();
    }));

    beforeEach(inject([dragAndDropSortableService, dragAndDropService],
      (dragAndDropSortableService) => {
        ds = dragAndDropSortableService;
        fixture = TestBed.createComponent(treeTestComponent);
        fixture.detectChanges();
      }));

    afterEach(function() {
      getTestBed().resetTestingModule();
    });

    it('should sort from first depth to second depth', fakeAsync(() => {
      var testComponent = fixture.componentInstance;
      testComponent.plugins = ['checkox', 'nestedSortable'];
      fixture.detectChanges();
      tick();
      var node = getNode('Node 1');
      assert(node, 'Node not found');
      var handle = node.querySelector('span[atlui-sortable-handle]');
      var node2 = getNode('Node 22');
      assert(node2, 'Node not found');

      var mouseDown = new Event('mousedown', { 'bubbles': true });

      handle.dispatchEvent(mouseDown);
      triggerEvent(node.parentNode, 'dragstart');

      fixture.detectChanges();

      assert.strictEqual(ds.sortableContainer.sortableData, testComponent.nodes, 'should be defined');
      assert.strictEqual(ds.index, 0, 'should be defined');

      triggerEvent(node2.parentNode, 'dragenter');
      triggerEvent(node2.parentNode, 'drop');
      triggerEvent(node.parentNode, 'dragend');
      fixture.detectChanges();

      assert.strictEqual(testComponent.nodes.length, 3);
      assert.strictEqual(testComponent.nodes[0].children.length, 5);
    }));

    it('should sort from second depth to first depth', fakeAsync(() => {
      var testComponent = fixture.componentInstance;
      testComponent.plugins = ['checkox', 'nestedSortable'];
      fixture.detectChanges();
      tick();
      var node = getNode('Node 22');
      assert(node, 'Node not found');
      var handle = node.querySelector('span[atlui-sortable-handle]');
      var node2 = getNode('Node 1');
      assert(node2, 'Node not found');

      var mouseDown = new Event('mousedown', { 'bubbles': true });

      handle.dispatchEvent(mouseDown);
      triggerEvent(node.parentNode, 'dragstart');

      fixture.detectChanges();
      assert.strictEqual(ds.sortableContainer.sortableData, testComponent.nodes[1].children, 'should be defined');
      assert.strictEqual(ds.index, 1, 'should be defined');

      triggerEvent(node2.parentNode, 'dragenter');
      triggerEvent(node2.parentNode, 'drop');
      triggerEvent(node.parentNode, 'dragend');
      fixture.detectChanges();

      assert.strictEqual(testComponent.nodes.length, 5);
      assert.strictEqual(testComponent.nodes[2].children.length, 3);

    }));

    it('should close the current node if we sort an opened node', fakeAsync(() => {
      var testComponent = fixture.componentInstance;
      testComponent.plugins = ['checkox', 'nestedSortable'];
      fixture.detectChanges();
      tick();
      var node = getNode('Node 2');
      assert(node, 'Node not found');
      var handle = node.querySelector('span[atlui-sortable-handle]');
      var node2 = getNode('Node 3');
      assert(node2, 'Node not found');

      var mouseDown = new Event('mousedown', { 'bubbles': true });

      assert.strictEqual(testComponent.nodes[1].expanded, true, 'should be expanded');

      handle.dispatchEvent(mouseDown);
      triggerEvent(node.parentNode, 'dragstart');

      fixture.detectChanges();

      assert.strictEqual(testComponent.nodes[1].expanded, false, 'should not be expanded');
    }));
  });
});
