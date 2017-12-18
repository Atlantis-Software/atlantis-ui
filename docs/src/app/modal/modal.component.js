import {Component} from '@angular/core';

export default  class ModalComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./modal.html')
      })
    ];
  }
  constructor(){

    this.time = new Date();

    this.modalHtml = `
    <button type="button" class="btn btn-primary btn-sm"  (click)="openStandard() || showStandard = true">
      Default modal
    </button>
    <modal [(show)]="showStandard">
      <modal-header>
        <h3 class="modal-title">Modal Header</h3>
      </modal-header>
      <modal-body>
        <p>Some text in the modal.</p>
      </modal-body>
      <modal-footer>
        <button type="button" class="btn btn-default" data-dismiss="modal" (click)="closeStandard() || showStandard = false">Close</button>
      </modal-footer>
    </modal>`;

    this.modalHtml2 = `
    <button type="button" class="btn btn-primary btn-sm"  (click)="showStandard2 = true">
      Default modal
    </button>
    <modal [(show)]="showStandard2" [backdrop]="false">
      <modal-header>
        <h3 class="modal-title">Modal Header</h3>
      </modal-header>
      <modal-body>
        <p>Some text in the modal.</p>
      </modal-body>
      <modal-footer>
        <button type="button" class="btn btn-default" data-dismiss="modal" (click)="showStandard2 = false">Close</button>
      </modal-footer>
    </modal>`;

    this.modalOrientationHtml = `
    <modal [(show)]="showStandard2" [orientation]="left">
    <modal [(show)]="showStandard2" [orientation]="right">
    <modal [(show)]="showStandard2" [orientation]="top">
    <modal [(show)]="showStandard2" [orientation]="bottom">`;

    this.showLeft = false;
    this.showRight = false;
    this.showTop = false;
    this.showBottom = false;
    this.showStandard = false;
    this.showStandard2 = false;

    this.Display = "Example";
  }

  openLeft() {
    this.showLeft = true;
  }
  closeLeft() {
    this.showLeft = false;
  }

  openRight() {
    this.showRight = true;
  }
  closeRight() {
    this.showRight = false;
  }

  openTop() {
    this.showTop = true;
  }
  closeTop() {
    this.showTop = false;
  }

  openBottom() {
    this.showBottom = true;
  }
  closeBottom() {
    this.showBottom = false;
  }

  openStandard() {
    this.showStandard = true;
  }
  closeStandard() {
    this.showStandard = false;
  }
}


ModalComponent.parameters = [];
