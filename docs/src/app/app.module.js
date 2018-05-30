import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import AppComponent from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';

import HomeComponent from './home/home.component.js';

import DatepickerComponent from './datepicker/datepicker.component';

import AgendaComponent from './agenda/agenda.component';

import PaginationComponent from './pagination/pagination.component.js';

import SelectpickerComponent from './selectpicker/selectpicker.component.js';

import SlidepickerComponent from './slidepicker/slidepicker.component.js';

import navbarComponent from './navbar/navbar.component.js';

import DropdownComponent from './dropdown/dropdown.component.js';

import ButtonComponent from './button/button.component.js';
import IconComponent from './icon/icon.component.js';

import ModalComponent from './modal/modal.component.js';

import DialogComponent from './dialog/dialog.component.js';

import TableComponent from './table/table.component.js';

import CarouselComponent from './carousel/carousel.component.js';

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

import DraggableComponent from './draggable/draggable.component.js';

import EditorComponent from './editor/editor.component.js';

import ColorsComponent from './colors/colors.component.js';

import { AtlantisUiModule } from 'atlantis-ui';

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
      DatepickerComponent,
      PaginationComponent,
      SelectpickerComponent,
      SlidepickerComponent,
      navbarComponent,
      DropdownComponent,
      ButtonComponent,
      IconComponent,
      ModalComponent,
      TableComponent,
      CarouselComponent,
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
      TreeComponent,
      DraggableComponent,
      DialogComponent,
      AgendaComponent,
      EditorComponent,
      ColorsComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(route),
      AtlantisUiModule.forRoot(types)
    ],
    bootstrap: [ AppComponent ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, DatePipe]
  })
];
