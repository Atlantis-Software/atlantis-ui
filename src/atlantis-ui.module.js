import { NgModule } from '@angular/core';
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

import dialogComponent from './dialog.component.js';

import { dialogService, dialogServiceFactory } from './dialog.service.js';

import gridComponent from './grid.component.js';
import gridHeaderComponent from './grid-header.component.js';
import gridBodyComponent from './grid-body.component.js';
import gridFooterComponent from './grid-footer.component.js';
import gridCellComponent from './grid-cell.component.js';
import gridCellHeaderComponent from './grid-cell-header.component.js';
import { gridConfig } from './grid.config.js';

import treeComponent from './tree.component.js';
import treeNodeComponent from './tree-node.component.js';

import { carouselComponent, carouselItemComponent } from './carousel.component.js';

import { accordionComponent, accordionPanelComponent } from './accordion.component.js';

import dropdownComponent from './dropdown.component.js';
import dropdownOptionComponent from './dropdown-option.component.js';
import dropdownDividerComponent from './dropdown-divider.component.js';
import dropdownHeaderComponent from './dropdown-header.component.js';

import circleProgessBarComponent from './circle-progress-bar.component.js';
import { popoverComponent, popoverDirective } from './popover.component.js';
import { tooltipComponent, tooltipDirective } from './tooltip.component.js';

import focusDirective from './focus.directive.js';

import { sortableContainer, sortableComponents, sortableHandler } from './sortable.component.js';

import { dragAndDropService, dragAndDropSortableService, dragDropServiceFactory, dragDropSortableServiceFactory } from './dragAndDrop.service.js';

import { draggableDirective, draggableHandleDirective} from './draggable.directive.js';

import { resizableDirective } from './resizable.directive.js';

import { codeDirective } from './code.directive.js';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class AtlantisUiModule {
  static forRoot(config) {
    return {
      ngModule: AtlantisUiModule,
      providers: [
        { provide: gridConfig, useValue: config },
        { provide: dragAndDropService, useFactory: dragDropServiceFactory },
        { provide: dragAndDropSortableService, useFactory: dragDropSortableServiceFactory },
        { provide: dialogService, useFactory: dialogServiceFactory}
      ]
    };
  }

  static forChild(config) {
    return {
      ngModule: AtlantisUiModule,
      providers: [
        { provide: gridConfig, useValue: config },
        { provide: dragAndDropService, useFactory: dragDropServiceFactory },
        { provide: dragAndDropSortableService, useFactory: dragDropSortableServiceFactory },
        { provide: dialogService, useFactory: dialogServiceFactory}
      ]
    };
  }
}


AtlantisUiModule.annotations = [
  new NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [pagination, datepickerComponent, datepickerrangeComponent, selectpickerComponent,
      selectpickeroptionComponent, slidepickerComponent, slidepickeroptionComponent, focusDirective,
      modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent,
      carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent,
      dropdownDividerComponent, dropdownHeaderComponent, circleProgessBarComponent, gridComponent,
      gridHeaderComponent, gridBodyComponent, gridFooterComponent, gridCellComponent, gridCellHeaderComponent,
      popoverComponent, popoverDirective, tooltipComponent, tooltipDirective, backdropComponent, sortableContainer,
      sortableComponents, treeComponent, treeNodeComponent, sortableHandler, draggableDirective, draggableHandleDirective,
      dialogComponent, resizableDirective, codeDirective],
    exports: [pagination, datepickerComponent, datepickerrangeComponent, selectpickerComponent,
      selectpickeroptionComponent, slidepickerComponent, slidepickeroptionComponent, focusDirective,
      modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent,
      carouselItemComponent, accordionComponent, accordionPanelComponent, dropdownComponent, dropdownOptionComponent,
      dropdownDividerComponent, dropdownHeaderComponent, circleProgessBarComponent, gridComponent,
      gridHeaderComponent, gridBodyComponent, gridFooterComponent, gridCellComponent, gridCellHeaderComponent,
      popoverComponent, popoverDirective, tooltipComponent, tooltipDirective, backdropComponent, sortableContainer,
      sortableComponents, sortableHandler, treeComponent, treeNodeComponent, draggableDirective, draggableHandleDirective,
      dialogComponent, resizableDirective, codeDirective],
    entryComponents: [tooltipComponent, popoverComponent, backdropComponent]
  })
];
