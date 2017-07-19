import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import pagination from './pagination.component.js';

import datepickerComponent from './datepicker.component.js';
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

import carouselComponent from './carousel.component.js';
import carouselItemComponent from './carousel-item.component.js';

import {accordionComponent, accordionPanelComponent} from './accordion.component.js';

import dropdownComponent from './dropdown.component.js';
import dropdownOptionComponent from './dropdown-option.component.js';

import focusDirective from './focus.directive.js';
export var ngxAtlUiModule = function() {};


ngxAtlUiModule.annotations = [
  new NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [pagination, datepickerComponent, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent, slidepickercomponent, slidepickeroptioncomponent, focusDirective, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent, carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent],
    exports : [pagination, datepickerComponent, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent, slidepickercomponent, slidepickeroptioncomponent, focusDirective, modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent, carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent]
  })
];
