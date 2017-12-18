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
      import: [ngxAtlUiModule.forRoot(object)],
      ...
    })`;
    this.gridParameters = `
    var types = [
      {
        type: "date",
        alignment: "right",
        pipes: [DatePipe],
        optionsPipe: ['shortDate'],
        transformation: function(val) {
          if (moment(val).isValid()) {
            return moment(val).toString();
          } else {
            return "invalid value";
          }
        }
      },
      {
        type: 'number',
        transformation: function(val) {
          if (!isNaN(val)) {
            return val;
          } else {
            return "invalid value";
          }
        }
      },
      {
        type: 'boolean',
        transformation: function(val) {
          if (typeof val === void 0 || val === null) {
            return val;
          }
          if (!val || val == '0' || val == 'false') {
            return 0;
          }
          return 1;
        }
      },
    ];`;
  }

}


HomeComponent.parameters = [];
