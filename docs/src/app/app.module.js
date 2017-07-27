import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import AppComponent from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, DatePipe, UpperCasePipe } from '@angular/common';


import HomeComponent from './home/home.component.js';

import DatepickerComponent from './datepicker/datepicker.component.js';
import DatepickerAngularComponent from './datepickerAngular/datepicker.component';

import PaginationComponent from './pagination/pagination.component.js';
import PaginationAngularComponent from './paginationAngular/pagination.component.js';

import SelectpickerComponent from './selectpicker/selectpicker.component.js';
import SelectpickerAngularComponent from './selectpickerAngular/selectpicker.component.js';

import SlidepickerComponent from './slidepicker/slidepicker.component.js';
import SlidepickerAngularComponent from './slidepickerAngular/slidepicker.component.js';

import navbarComponent from './navbar/navbar.component.js';

import DropdownComponent from './dropdown/dropdown.component.js';
import DropdownAngularComponent from './dropdownAngular/dropdown.component.js';

import InputComponent from './input/input.component.js';
import ButtonComponent from './button/button.component.js';
import IconComponent from './icon/icon.component.js';

import ModalComponent from './modal/modal.component.js';
import ModalAngularComponent from './modalAngular/modal.component.js';

import TableComponent from './table/table.component.js';

import CarouselComponent from './carousel/carousel.component.js';
import CarouselAngularComponent from './carouselAngular/carousel.component.js';

import PopoverComponent from './popover/popover.component.js';

import CollapseComponent from './collapse/collapse.component.js';
import AccordionComponent from './accordion/accordion.component.js';

import ProgressBarComponent from './progress-bar/progress-bar.component.js';

import InputgroupComponent from './inputgroup/inputgroup.component.js';
import GridComponent from './grid/grid.component.js';
import GridAngularComponent from './gridAngular/grid.component.js';

import ButtongroupsComponent from './buttongroups/buttongroups.component.js';
import FormsComponent from './forms/forms.component.js';

import { ngxAtlUiModule } from 'atlantis-ui-ngx';


export var AppModule = function() {};

import route from './app.routes';

var types = [
  {
    type: "date",
    alignment: "right",
    pipes: [DatePipe, UpperCasePipe],
    optionsPipe : ['shortDate:longDate', ["test", "test2"]]
  },
  {
    type : 'number'
  }
]


AppModule.annotations = [
  new NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      DatepickerComponent,
      DatepickerAngularComponent,
      PaginationComponent,
      PaginationAngularComponent,
      SelectpickerComponent,
      SelectpickerAngularComponent,
      SlidepickerComponent,
      SlidepickerAngularComponent,
      navbarComponent,
      DropdownComponent,
      DropdownAngularComponent,
      InputComponent,
      ButtonComponent,
      IconComponent,
      ModalComponent,
      ModalAngularComponent,
      TableComponent,
      CarouselComponent,
      CarouselAngularComponent,
      PopoverComponent,
      CollapseComponent,
      AccordionComponent,
      InputgroupComponent,
      GridComponent,
      ButtongroupsComponent,
      FormsComponent,
      ProgressBarComponent,
      GridAngularComponent
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
