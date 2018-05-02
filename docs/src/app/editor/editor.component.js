import {Component} from '@angular/core';

export default class EditorComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./editor.html')
      })
    ];
  }
  constructor(){
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
}


EditorComponent.parameters = [];
