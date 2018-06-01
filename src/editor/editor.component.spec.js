import { getTestBed, TestBed, tick, fakeAsync, async } from '@angular/core/testing';
import { Component, ViewChildren } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AtlantisUiModule } from '../atlantis-ui.module.js';

import { editorComponent } from './editor.component.js';
var assert = require('assert');

var mousedown = new Event('mousedown', { 'bubbles': true });
var firefox = false;

if (navigator.userAgent.indexOf("Firefox") != -1) {
  firefox = true;
}

var initEditor = function(editor, text, begin, end) {
  editor.innerText = text;
  var range = document.createRange();
  range.setStart(editor.childNodes[0], begin);
  range.setEnd(editor.childNodes[0], end);
  var selection = document.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};

class editorTestComponent {
  constructor() {
    this.toolbar = [
      ["undo", "redo"],
      ["selectAll"],
      ["bold", "italic", "underline", "strikethrough", "removeFormat"],
      ["insertOrderedList", "insertUnorderedList", "outdent", "indent", "blockquote","justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
      ['insertImage', 'createLink', "unlink"],
      ['fontSize'],
      ['format'],
      ['fontName'],
      ['foreColor', 'hiliteColor']
    ];
  }
  static get annotations() {
    return [
      new Component({
        template: `
          <atlui-editor [toolbar]="toolbar"></atlui-editor>`,
        queries: {
          editor: new ViewChildren(editorComponent),
        }
      })
    ];
  }
}

editorTestComponent.parameters = [];

describe('editor', function() {
  this.timeout(10000);
  var fixture, container, editor;

  beforeEach(async(function() {
    TestBed.configureTestingModule({
      imports: [AtlantisUiModule.forRoot(), FormsModule],
      declarations: [editorTestComponent]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(editorTestComponent);
    fixture.detectChanges();
    container = fixture.componentInstance;
    editor = document.querySelector(".editor");
    assert.strictEqual(editor.contentEditable, "true");
    assert.strictEqual(editor.innerText, "");
    assert.strictEqual(editor.innerHTML, "  ");
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should have all plugins load', fakeAsync(function() {
    var pluginBlocks = document.querySelectorAll(".plugin-block");
    assert.strictEqual(pluginBlocks.length, 9);
    pluginBlocks.forEach((pluginBlock, i)=> {
      for (var j; j< pluginBlock.children.length; j++) {
        var pluginName = pluginBlock.children[j].nodeName.toLowerCase().substring(13);
        assert.strictEqual(container.toolbar[i][j], pluginName);
      }
    });
  }));

  it('should activate then desactivate plugin : bold', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();
    var pluginName = "bold";
    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var text = editor.querySelector("span");
    assert.strictEqual(text.style.fontWeight, "bold");

    button.dispatchEvent(mousedown);
    assert.strictEqual(button.classList.contains('active'), false);
    text = editor.querySelector("span");
    assert.strictEqual(text, null);

  }));

  it('should activate then desactivate plugin : italic', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "italic";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var text = editor.querySelector("span");
    assert.strictEqual(text.style.fontStyle, "italic");

    button.dispatchEvent(mousedown);
    assert.strictEqual(button.classList.contains('active'), false);
    text = editor.querySelector("span");
    assert.strictEqual(text, null);

  }));

  it('should activate then desactivate plugin : underline', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "underline";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var text = editor.querySelector("span");
    assert.strictEqual(text.style.textDecorationLine, "underline");

    button.dispatchEvent(mousedown);
    assert.strictEqual(button.classList.contains('active'), false);
    text = editor.querySelector("span");
    assert.strictEqual(text, null);

  }));

  it('should activate then desactivate plugin : strikethrough', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "strikethrough";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var text = editor.querySelector("span");
    assert.strictEqual(text.style.textDecorationLine, "line-through");

    button.dispatchEvent(mousedown);
    assert.strictEqual(button.classList.contains('active'), false);
    text = editor.querySelector("span");
    assert.strictEqual(text, null);

  }));

  it('should undo and redo', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "bold";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var beforePlugin = editor.innerHTML;

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);

    var afterPlugin = editor.innerHTML;

    plugin = document.querySelector("atlui-plugin-undo");
    button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), false);
    assert.strictEqual(beforePlugin, editor.innerHTML);
    plugin = document.querySelector("atlui-plugin-redo");
    button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), false);
    assert.strictEqual(afterPlugin, editor.innerHTML);

  }));

  it('should activate then desactivate plugin : ordered list', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "insertorderedlist";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var orderedList = editor.querySelector("ol");
    var list = orderedList.querySelectorAll("li");
    assert.ok(orderedList);
    assert.strictEqual(list.length, 1);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), false);
    orderedList = editor.querySelector("ol");
    assert.strictEqual(orderedList, null);
  }));

  it('should activate then desactivate plugin : unordered list', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "insertunorderedlist";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var unorderedList = editor.querySelector("ul");
    var list = unorderedList.querySelectorAll("li");
    assert.ok(unorderedList);
    assert.strictEqual(list.length, 1);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), false);
    unorderedList = editor.querySelector("ul");
    assert.strictEqual(unorderedList, null);

  }));

  it('should activate then desactivate plugin : justify center', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "justify-center";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var justifyCenter = editor.querySelector("div");
    assert.strictEqual(justifyCenter.style.textAlign, 'center');
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), false);
    justifyCenter = editor.querySelector("div");
    assert.strictEqual(justifyCenter.style.textAlign, 'left');

  }));

  it('should activate then desactivate plugin : justify right', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "justify-right";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var justifyRight = editor.querySelector("div");
    assert.strictEqual(justifyRight.style.textAlign, 'right');

    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), false);
    justifyRight = editor.querySelector("div");
    assert.strictEqual(justifyRight.style.textAlign, 'left');

  }));

  it('should activate then desactivate plugin : justify full', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "justify-full";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var justifyFull = editor.querySelector("div");
    assert.strictEqual(justifyFull.style.textAlign, 'justify');

    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), false);
    justifyFull = editor.querySelector("div");
    assert.strictEqual(justifyFull.style.textAlign, 'left');

  }));

  it('should activate plugin : justify left', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "justify-left";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-justify-center");
    var button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    button.click();
    tick();
    fixture.detectChanges();

    plugin = document.querySelector("atlui-plugin-"+pluginName);
    button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    assert.strictEqual(button.classList.contains('active'), true);
    var justifyLeft = editor.querySelector("div");
    assert.strictEqual(justifyLeft.style.textAlign, 'left');

  }));

  it('should activate then desactivate plugin : blockquote', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "blockquote";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);
    var blockquote = editor.querySelector("blockquote");
    assert.ok(blockquote);

    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), false);
    if (firefox) {
      blockquote = editor.querySelectorAll("blockquote");
      assert.strictEqual(blockquote.length, 1);
    } else {
      blockquote = editor.querySelector("blockquote");
      assert.strictEqual(blockquote, null);
    }

  }));

  it('should indent and outdent', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "indent/outdent";

    initEditor(editor, "Test indent/outdent plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-indent");
    var button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var indent;
    if (firefox) {
      indent = editor.querySelector("div");
      assert.ok(indent);
      assert.strictEqual(indent.style.marginLeft, "40px");
    } else {
      indent = editor.querySelector("blockquote");
      assert.ok(indent);
      assert.strictEqual(indent.style.margin, "0px 0px 0px 40px");
    }

    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    if (firefox) {
      indent = editor.querySelectorAll("div");
      assert.strictEqual(indent.length, 1);
      assert.strictEqual(indent[0].style.marginLeft, "80px");
    } else {
      indent = editor.querySelectorAll("blockquote");
      assert.strictEqual(indent.length, 2);
    }

    plugin = document.querySelector("atlui-plugin-outdent");
    button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    if (firefox) {
      indent = editor.querySelector("div");
      assert.ok(indent);
      assert.strictEqual(indent.style.marginLeft, "40px");
    } else {
      indent = editor.querySelector("blockquote");
      assert.ok(indent);
      assert.strictEqual(indent.style.margin, "0px 0px 0px 40px");
    }

    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    if (firefox) {
      indent = editor.querySelector("div");
    } else {
      indent = editor.querySelector("blockquote");
    }
    assert.strictEqual(indent, null);
  }));

  it('should insert a link and remove anchor', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "createlink";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");

    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    var input = plugin.querySelector("input");
    var buttonValidate = plugin.querySelector("atlui-modal-footer button");
    input.value = "http://www.atlantis-software.net/";
    input.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    buttonValidate.click();
    tick();
    fixture.detectChanges();

    var link = editor.querySelector("a");
    assert.ok(link);
    assert.strictEqual(link.href,"http://www.atlantis-software.net/");
    plugin = document.querySelector("atlui-plugin-unlink");
    button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    link = editor.querySelector("a");
    assert.strictEqual(link, null);

  }));

  it('should format block', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "format";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    var title = plugin.querySelector("h1");
    title.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var titleDom = editor.querySelector("h1");
    assert.ok(titleDom);

  }));

  it('should change font', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "fontname";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    var comicSansMs = plugin.querySelectorAll("atlui-dropdown-option")[0];
    comicSansMs.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var text = editor.querySelector("span");
    if (firefox) {
      assert.strictEqual(text.style.fontFamily, 'Arial');
    } else {
      assert.strictEqual(text.style.fontFamily, 'Arial');
    }

  }));

  it('should change color font', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "forecolor";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var color = plugin.querySelectorAll(".color-palette .color")[3];
    color.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var text = editor.querySelector("span");
    assert.strictEqual(text.style.color, 'rgb(153, 255, 102)');

  }));

  it('should change hilite color', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "hilitecolor";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var color = plugin.querySelectorAll(".color-palette .color")[3];
    color.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var span = editor.querySelector("span");
    assert.strictEqual(span.style.backgroundColor, 'rgb(153, 255, 102)');

  }));

  it('should selectall', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "selectall";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var range = document.createRange();
    range.setStart(editor.childNodes[0], 0);
    range.setEnd(editor.childNodes[0], editor.innerText.length);
    var selection = document.getSelection();
    assert.strictEqual(selection.getRangeAt(0).toString(), range.toString());

  }));

  it('should change font size', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "fontsize";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();

    var size10 = plugin.querySelectorAll("atlui-dropdown-option")[0];
    size10.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var span = editor.querySelector("span");
    assert.strictEqual(span.style.fontSize, '10px');

  }));

  it('should remove format', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();
    var pluginName = "removeformat";
    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-bold");
    var button = plugin.querySelector("button");
    assert.strictEqual(button.classList.contains('active'), false);
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    assert.strictEqual(button.classList.contains('active'), true);

    plugin = document.querySelector("atlui-plugin-"+pluginName);
    button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var text = editor.querySelector("span");
    assert.strictEqual(text, null);
  }));


  //leave this test last for avoid problem with Firefox
  it('should insert image', fakeAsync(function() {
    editor.click();
    tick();
    fixture.detectChanges();

    var pluginName = "image";

    initEditor(editor, "Test "+ pluginName +" plugin", 5, 5 + pluginName.length);

    var plugin = document.querySelector("atlui-plugin-"+pluginName);
    var button = plugin.querySelector("button");
    button.dispatchEvent(mousedown);
    tick();
    fixture.detectChanges();
    var file = new File(["foo"], "foo.png", {
      type: "image/png"
    });
    var insertImagePlugin = container.editor.first._toolbar[4][0];
    insertImagePlugin.instance.file = file;

    button = plugin.querySelector("atlui-modal-footer button");
    button.click();
    tick(0);
    fixture.detectChanges();
    insertImagePlugin.instance.reader.addEventListener('loadend', function(){
      var img = editor.querySelector("img");
      assert.ok(img);
      var reader = new FileReader();
      var val64;
      reader.onload = () => {
        val64 = reader.result;
      };
      reader.readAsDataURL(file);
      reader.addEventListener('loadend', function(){
        assert.strictEqual(img.src, val64);
      });
    });
  }));

});
