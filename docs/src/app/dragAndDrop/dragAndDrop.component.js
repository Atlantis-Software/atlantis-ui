import {Component} from '@angular/core';

export default  class dragAndDropComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./dragAndDrop.html')
      })
    ];
  }
  constructor(){
    this.listSingle = ['A', 'B', 'C', 'D', 'E'];
    this.listHandle = ['1', '2', '3', '4', '5'];
    this.listMultiple1 = ['123', '456', '789'];
    this.listMultiple2 = ['ABC', 'DEF', 'GHI'];
    this.listSingle2 = ['A', 'B', 'C', 'D', 'E'];
    this.listEmpty = [];
    this.listThreeOriginal = [];
    this.listDropzone = ['Java', 'C', 'Python'];
    this.listDropzone1 = ['Apple', 'Orange'];
    this.listDropzone2 = [];

    this.listJs = `
    this.listSingle = ['A', 'B', 'C', 'D', 'E'];`;

    this.listSingleHtml = `
    <div class="panel-body" sortable-container [sortableData]="listSingle">
      <ul class="list-group">
        <li *ngFor="let item of listSingle; let i = index" class="list-group-item" sortable [sortableIndex]="i">
          {{item}}
        </li>
      </ul>
    </div>`;

    this.listHandleHtml = `
    <div class="panel-body" sortable-container [sortableData]="listHandle">
      <ul class="list-group">
        <li *ngFor="let item of listHandle; let i = index" class="list-group-item" sortable [sortableIndex]="i">
          {{item}}
          <span sortable-handle>=</span>
        </li>
      </ul>
    </div>`;

    this.listDropzoneHtml = `
    <div class="panel-body" sortable-container [sortableData]="listDropzone" [dropzones]="'dropzone2.dropzone1'">
      <ul class="list-group"  >
        <li *ngFor="let item of listDropzone; let i = index" class="list-group-item" sortable [sortableIndex]="i">
          {{item}}
        </li>
      </ul>
    </div>`;
  }
}


dragAndDropComponent.parameters = [];
