import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import AppComponent from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import HomeComponent from './home/home.component.js';
import DatepickerComponent from './datepicker/datepicker.component.js';
import PaginationComponent from './pagination/pagination.component.js';
import SelectpickerComponent from './selectpicker/selectpicker.component.js';
import SlidepickerComponent from './slidepicker/slidepicker.component.js';
import navbarComponent from './navbar/navbar.component.js';
import DropdownComponent from './dropdown/dropdown.component.js';
import InputComponent from './input/input.component.js';
import ButtonComponent from './button/button.component.js';
import IconComponent from './icon/icon.component.js';
import ModalComponent from './modal/modal.component.js';
import TableComponent from './table/table.component.js';
import CarouselComponent from './carousel/carousel.component.js';
import PopoverComponent from './popover/popover.component.js';
import CollapseComponent from './collapse/collapse.component.js';
import InputgroupComponent from './inputgroup/inputgroup.component.js';


import { ngxAtlUiModule } from 'atlantis-ui-ngx';
console.log(ngxAtlUiModule)

export var AppModule = function() {};

import route from './app.routes';

AppModule.annotations = [
  new NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      DatepickerComponent,
      PaginationComponent,
      SelectpickerComponent,
      SlidepickerComponent,
      navbarComponent,
      DropdownComponent,
      InputComponent,
      ButtonComponent,
      IconComponent,
      ModalComponent,
      TableComponent,
      CarouselComponent,
      PopoverComponent,
      CollapseComponent,
      InputgroupComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(route),
      ngxAtlUiModule
    ],
    bootstrap: [ AppComponent ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
  })
];
