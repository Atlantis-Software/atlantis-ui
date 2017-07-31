import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import pagination from './pagination.component.js';

import datepickerComponent from './datepicker.component.js';
import datepickerrangeComponent from './datepicker-range.component.js';

import selectpickerComponent from './selectpicker.component.js';
import selectpickeroptionComponent from './selectpicker-option.component.js';

import { slidepickerComponent, slidepickeroptionComponent } from './slidepicker.component.js';

import modalComponent from './modal.component.js';
import modalHeaderComponent from './modal-header.component.js';
import modalBodyComponent from './modal-body.component.js';
import modalFooterComponent from './modal-footer.component.js';
import backdropComponent from './backdrop.component.js';

import gridComponent from './grid.component.js';
import gridHeaderComponent from './grid-header.component.js';
import gridBodyComponent from './grid-body.component.js';
import gridFooterComponent from './grid-footer.component.js';
import gridCellComponent from './grid-cell.component.js';
import gridCellHeaderComponent from './grid-cell-header.component.js';
import { gridConfig } from './grid.config.js';

import { carouselComponent, carouselItemComponent} from './carousel.component.js';

import {accordionComponent, accordionPanelComponent} from './accordion.component.js';

import dropdownComponent from './dropdown.component.js';
import dropdownOptionComponent from './dropdown-option.component.js';

import circleProgessBarComponent from './circle-progress-bar.component.js';
import { popoverComponent, popoverDirective} from './popover.component.js';
import { tooltipComponent, tooltipDirective } from './tooltip.component.js';

import focusDirective from './focus.directive.js';
import affixDirective from './affix.directive.js';

import DynamicPipe from './dynamic.pipe.js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    imports: [CommonModule, FormsModule, BrowserAnimationsModule],
    declarations: [pagination, datepickerComponent, datepickerrangeComponent, selectpickerComponent, selectpickeroptionComponent, slidepickerComponent, slidepickeroptionComponent, focusDirective, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent, carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent, circleProgessBarComponent, affixDirective, gridComponent, gridHeaderComponent, gridBodyComponent, gridFooterComponent, gridCellComponent, gridCellHeaderComponent, popoverComponent, popoverDirective, tooltipComponent, tooltipDirective, backdropComponent],
    exports : [pagination, datepickerComponent, datepickerrangeComponent, selectpickerComponent, selectpickeroptionComponent, slidepickerComponent, slidepickeroptionComponent, focusDirective, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent, carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent, circleProgessBarComponent, affixDirective, gridComponent, gridHeaderComponent, gridBodyComponent, gridFooterComponent, gridCellComponent, gridCellHeaderComponent, popoverComponent, popoverDirective, tooltipComponent, tooltipDirective, backdropComponent],
    entryComponents: [tooltipComponent, popoverComponent, backdropComponent]
  })
];
