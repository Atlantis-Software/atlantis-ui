import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import AppComponent from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, DatePipe, UpperCasePipe } from '@angular/common';

import HomeComponent from './home/home.component.js';

import DatepickerAngularComponent from './datepickerAngular/datepicker.component';

import PaginationAngularComponent from './paginationAngular/pagination.component.js';

import SelectpickerAngularComponent from './selectpickerAngular/selectpicker.component.js';

import SlidepickerAngularComponent from './slidepickerAngular/slidepicker.component.js';

import navbarComponent from './navbar/navbar.component.js';

import DropdownAngularComponent from './dropdownAngular/dropdown.component.js';

import ButtonComponent from './button/button.component.js';
import IconComponent from './icon/icon.component.js';

import ModalAngularComponent from './modalAngular/modal.component.js';

import TableComponent from './table/table.component.js';

import CarouselAngularComponent from './carouselAngular/carousel.component.js';

import PopoverComponent from './popover/popover.component.js';
import TooltipComponent from './tooltip/tooltip.component.js';

import TreeComponent from './tree/tree.component.js';

import AccordionComponent from './accordion/accordion.component.js';

import ProgressBarComponent from './progress-bar/progress-bar.component.js';

import InputgroupComponent from './inputgroup/inputgroup.component.js';
import GridComponent from './grid/grid.component.js';
import GridAngularComponent from './gridAngular/grid.component.js';

import ButtongroupsComponent from './buttongroups/buttongroups.component.js';
import FormsComponent from './forms/forms.component.js';

import dragAndDropComponent from './dragAndDrop/dragAndDrop.component.js';

import { ngxAtlUiModule } from 'atlantis-ui-ngx';


export var AppModule = function() {};

import route from './app.routes';

var types = [
  {
    type: "date",
    alignment: "right",
    vertical_alignment: "middle",
    pipes: [DatePipe],
    optionsPipe: ['shortDate'],
    transformation: function(val) {
      if (moment(val).isValid()) {
        return moment(val).toString();
      } else {
        return "ERR: invalid value";
      }
    }
  },
  {
    type: 'number',
    transformation: function(val) {
      if (!isNaN(val)) {
        return val;
      } else {
        return "ERR: invalid value";
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
];


AppModule.annotations = [
  new NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      DatepickerAngularComponent,
      PaginationAngularComponent,
      SelectpickerAngularComponent,
      SlidepickerAngularComponent,
      navbarComponent,
      DropdownAngularComponent,
      ButtonComponent,
      IconComponent,
      ModalAngularComponent,
      TableComponent,
      CarouselAngularComponent,
      PopoverComponent,
      TooltipComponent,
      AccordionComponent,
      InputgroupComponent,
      GridComponent,
      ButtongroupsComponent,
      FormsComponent,
      ProgressBarComponent,
      GridAngularComponent,
      dragAndDropComponent,
      TreeComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(route),
      ngxAtlUiModule.forRoot(types)
    ],
    bootstrap: [ AppComponent ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, DatePipe, UpperCasePipe]
  })
];
