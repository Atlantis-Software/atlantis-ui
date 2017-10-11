import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


export default class HomeComponent {

  static get annotations() {
    return [
      new Component({
        template: require('./home.html'),
        directives: [ROUTER_DIRECTIVES]
      })
    ];
  }
  constructor(){

    this.importHtml=`
    import {ngxAtlUiModule} from 'path/atlantis-ui-ngx' or 'aliasWithWebpack'

    @NgModule({
      ...
      import: [ngxAtlUiModule],
      ...
    })`;

  }

}


HomeComponent.parameters = [];
