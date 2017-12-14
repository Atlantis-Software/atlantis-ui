import {Component} from '@angular/core';

export default  class TableComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./table.html')
      })
    ];
  }
  constructor(){
    this.tableHtml = `
    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>Number</th>
                <th>Language</th>
                <th>Fruit</th>
                <th>Other</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Javascript</td>
                <td>Ananas</td>
                <td>azert</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Python</td>
                <td>Banana</td>
                <td>qsdfg</td>
            </tr>
            <tr>
                <td>3</td>
                <td>C++</td>
                <td>Orange</td>
                <td>wxcvb</td>
            </tr>
        </tbody>
    </table>`;
    this.Display = "Example";
  }
}


TableComponent.parameters = [];
