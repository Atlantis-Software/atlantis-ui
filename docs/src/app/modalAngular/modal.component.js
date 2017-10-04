import {Component} from '@angular/core';

export default  class ModalAngularComponent {
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
    <modal fade="true" orientation="left" backdrop="true" [(show)]="showLeft">
      <modal-header>
        <h3 class="modal-title">Modal Header</h3>
      </modal-header>
      <modal-body>
        <p>Some text in the modal.</p>
      </modal-body>
      <modal-footer>
        <button type="button" class="btn btn-default" data-dismiss="modal" (click)="closeLeft()">Close</button>
      </modal-footer>
    </modal>`;

    this.showLeft = false;
    this.showRight = false;
    this.showTop = false;
    this.showBottom = false;
    this.showStandard = false;

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


ModalAngularComponent.parameters = [];
