import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import pagination from './pagination.component.js';

import datepickerComponent from './datepicker.component.js';
import datepickerComponent4 from './datepicker4.component.js';
import datepickerrangeComponent from './datepicker-range.component.js';

import selectpickerComponent from './selectpicker.component.js';
import atlModelDirective from './atlmodel.directive.js';
import selectpickeroptionComponent from './selectpicker-option.component.js';

import slidepickercomponent from './slidepicker.component.js';
import slidepickeroptioncomponent from './slidepicker-option.component.js';

import modalComponent from './modal.component.js';
import modalHeaderComponent from './modal-header.component.js';
import modalBodyComponent from './modal-body.component.js';
import modalFooterComponent from './modal-footer.component.js';

import gridComponent from './grid.component.js';
import gridHeaderComponent from './grid-header.component.js';
import gridBodyComponent from './grid-body.component.js';
import gridFooterComponent from './grid-footer.component.js';
import gridCellComponent from './grid-cell.component.js';
import gridCellHeaderComponent from './grid-cell-header.component.js';
import { gridConfig } from './grid.config.js';

import carouselComponent from './carousel.component.js';
import carouselItemComponent from './carousel-item.component.js';

import {accordionComponent, accordionPanelComponent} from './accordion.component.js';

import dropdownComponent from './dropdown.component.js';
import dropdownOptionComponent from './dropdown-option.component.js';

import circleProgessBarComponent from './circle-progress-bar.component.js';

import focusDirective from './focus.directive.js';
import affixDirective from './affix.directive.js';

import DynamicPipe from './dynamic.pipe.js';

// export var ngxAtlUiModule = function() {};

export class ngxAtlUiModule{
  static forRoot(config){
    return {
      ngModule: ngxAtlUiModule,
      providers : [
        {provide: gridConfig, useValue : config}
      ]
    }
  }
}

ngxAtlUiModule.annotations = [
  new NgModule({
    imports: [CommonModule, FormsModule],
<<<<<<< HEAD
    declarations: [pagination, datepickerComponent, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent, slidepickercomponent, slidepickeroptioncomponent, focusDirective, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent, carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent, circleProgessBarComponent, affixDirective, gridComponent, gridHeaderComponent, gridBodyComponent, gridFooterComponent, gridCellComponent, gridCellHeaderComponent],
    exports : [pagination, datepickerComponent, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent, slidepickercomponent, slidepickeroptioncomponent, focusDirective, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent, carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent, circleProgessBarComponent, affixDirective, gridComponent, gridHeaderComponent, gridBodyComponent, gridFooterComponent, gridCellComponent, gridCellHeaderComponent],
    providers : [
      { provide : JQ_TOKEN, useValue : jQuery }
    ]
=======
    declarations: [pagination, datepickerComponent, datepickerComponent4, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent, slidepickercomponent, slidepickeroptioncomponent, focusDirective, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent, carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent],
    exports : [pagination, datepickerComponent, datepickerComponent4, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent, slidepickercomponent, slidepickeroptioncomponent, focusDirective, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent, carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent]
>>>>>>> 5709f12d68173bd82e5f4a8f3afb6dc95779ca5f
  })
];
