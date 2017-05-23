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

import focusDirective from './focus.directive.js';

export var ngxAtlUiModule = function() {};

ngxAtlUiModule.annotations = [
  new NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [pagination, datepickerComponent, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent, slidepickercomponent, slidepickeroptioncomponent, focusDirective],
    exports : [pagination, datepickerComponent, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent, slidepickercomponent, slidepickeroptioncomponent]
  })
];
