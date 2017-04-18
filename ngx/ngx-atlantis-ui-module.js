import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import pagination from './pagination.component.js';
import datepickerComponent from './datepicker.component.js';
import datepickerrangeComponent from './datepicker-range.component.js';
import selectpickerComponent from './selectpicker.component.js';
import atlModelDirective from './atlmodel.directive.js';
import selectpickeroptionComponent from './selectpicker-option.component.js';

export var ngxAtlUiModule = function() {};

ngxAtlUiModule.annotations = [
  new NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [pagination, datepickerComponent, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent],
    exports : [pagination, datepickerComponent, datepickerrangeComponent, atlModelDirective, selectpickerComponent, selectpickeroptionComponent]
  })
];
