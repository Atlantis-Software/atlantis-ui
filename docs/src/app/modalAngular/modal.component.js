import {Component} from '@angular/core';

export default  class ModalAngularComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./modal.html')
      })
    ]
  }
  constructor(){

    this.modalHtml = `
    <modal id="exampleModal" options="object">

      <modal-header title="Test" options="object">

      </modal-header>

      <modal-body>
        <p>One fine body&hellip;</p>
      </modal-body>

      <modal-footer>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </modal-footer>

    </modal>`

    this.modalOptions = {
      size : "large",
      fade : true,
      show : true
    }

    this.modalHeaderOptions = {
      close : true
    }

    this.Display = "Example";
  }
}


ModalAngularComponent.parameters = [];
