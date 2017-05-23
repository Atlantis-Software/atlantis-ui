import {Component} from '@angular/core';

export default  class navbarComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./navbar.html')
      })
    ]
  }
  constructor(){

    this.navbarHtml = `
    <div class="navbar navbar-default">

      <div class="container-fluid">

        <div class="navbar-header">

          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#atlui-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand">Test</a>
        </div>

        <div class="collapse navbar-collapse" id="atlui-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown">
                Menu A
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li><a>Sub-menu A</a></li>
                <li><a>Sub-menu B</a></li>
                <li><a>Sub-menu C</a></li>
                <li role="separator" class="divider"></li>
                <li><a>Sub-menu separated A</a></li>
                <li role="separator" class="divider"></li>
                <li><a>Sub-menu separated B</a></li>
              </ul>
            </li>
            <li><a>Menu B</a></li>
            <li class="dropdown disabled">
              <a class="dropdown-toggle disabled" data-toggle="dropdown">
                Menu C
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li><a href="">Sub-menu A</a></li>
              </ul>
            </li>
            <li><a>Menu D</a></li>
            <li class="disabled"><a>Menu E</a></li>
          </ul>

        </div>

      </div>

    </div>`

    this.Display = "Example"
  }
}
