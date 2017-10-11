import {Component} from '@angular/core';

export default  class navbarComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./navbar.html')
      })
    ];
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
          <form class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Action">
            </div>
            <button type="submit" class="btn btn-default">Search</button>
          </form>
          <ul class="nav navbar-nav navbar-right">
            <button type="button" class="btn btn-default navbar-btn">Action A</button>
            <p class="navbar-text">Test text</p>
          </ul>
        </div>

      </div>

    </div>`;

    this.navbarBasic = `
    <div class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand">Test</a>
        </div>
        <div class="navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="#/navbar">Menu A</a></li>
            <li><a href="#/navbar">Menu B</a></li>
            <li class="disabled"><a href="#/navbar">Menu C</a></li>
            <li><a href="#/navbar">Menu D</a></li>
            <li class="active"><a href="#/navbar">Menu E</a></li>
          </ul>
        </div>
      </div>
    </div>`;

    this.navbarForms = `
    <div class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="#/navbar" class="navbar-brand">Company</a>
        </div>
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Action">
          </div>
          <button type="submit" class="btn btn-default">Search</button>
        </form>
      </div>
    </div>`;

    this.navbarButton = `
    <div class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="#/navbar" class="navbar-brand">Company</a>
        </div>
        <button type="button" class="btn btn-default navbar-btn">Register</button>
      </div>
    </div>`;

    this.navbarInverse = `
    <div class="navbar navbar-inverse">
      ...
    </div>`;

    this.navbarDropdown = `
    <ul class="nav navbar-nav">
      <li>
        <dropdown title="Menu A">
          <dropdown-option><a href="#/navbar">Sub-menu A</a></dropdown-option>
          <dropdown-option><a href="#/navbar">Sub-menu B</a></dropdown-option>
          <dropdown-divider></dropdown-divider>
          <dropdown-option><a href="#/navbar">Sub-menu separated A</a></dropdown-option>
          <dropdown-header>Menu</dropdown-header>
          <dropdown-option><a href="#/navbar">Sub-menu separated B</a></dropdown-option>
        </dropdown>
      </li>
    </ul>`;

    this.navbarText = `
    <p class="navbar-text">Test text</p>`;

    this.Display = "Example";
  }
}
