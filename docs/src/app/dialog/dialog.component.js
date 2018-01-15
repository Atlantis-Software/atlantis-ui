import {Component} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

export default  class DialogComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./dialog.html')
      })
    ];
  }
  constructor(document){
    this.showStandard = false;
    this.showStandard2 = false;
    this.showStandard3 = false;
    this.showStandard4 = false;
    this.document = document;

    this.dialogHTML = `
    <atlui-dlg [(show)]="boolean">
      <p>Some text in the dialog.</p>
    </atlui-dlg>`;

    this.dialogSize = `
    <atlui-dlg [(show)]="boolean" [width]="1000" [height]="600">
      <p>Some text in the dialog.</p>
    </atlui-dlg>`;

    this.dialogTitle = `
    <atlui-dlg [(show)]="boolean" [title]="'Some Title'">
      <p>Some text in the dialog.</p>
    </atlui-dlg>`;

    this.dialogResizable = `
    <atlui-dlg [(show)]="boolean" [isResizable]="true" [width]="1000" [height]="600" [minWidth]="300" [minHeight]="300" [maxWidth]="1000" [maxHeight]="600">
      <p>Some text in the dialog.</p>
    </atlui-dlg>`;

    this.dialogContainer = `
    <atlui-dlg [(show)]="boolean" [container]="document.body">
      <p>Text</p>
    </atlui-dlg>`;
  }

  closeStandard() {
    this.showStandard = false;
  }
}


DialogComponent.parameters = [DOCUMENT];
