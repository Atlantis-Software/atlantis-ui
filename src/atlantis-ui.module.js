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

import { accordionComponent, accordionPanelComponent, accordionPanelHeaderDirective } from './accordion.component.js';

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

import { agendaComponent } from './agenda.component.js';
import { agendaMonthComponent } from './agenda-month.component.js';
import { agendaDayNameComponent } from './agenda-day-name.component.js';
import { agendaCalendarComponent } from './agenda-calendar.component.js';
import { agendaWeekComponent } from './agenda-week.component.js';
import { agendaDayComponent } from './agenda-day.component.js';
import { agendaDayCornerComponent } from './agenda-day-corner.component.js';
import { agendaMoreEventsComponent } from './agenda-more-events.component.js';
import { agendaDayEventsComponent } from './agenda-day-events.component.js';
import { agendaEventComponent } from './agenda-event.component.js';

import { localeMomentService, localeMomentServiceFactory } from './localeMoment.service.js';

import { inputFileDirective } from './input-file.directive.js';

import { editorComponent } from './editor/editor.component.js';
import { pluginsService } from './editor/plugins.class.js';

import blockquote from './editor/plugins/blockquote.plugin.js';
import bold from './editor/plugins/bold.plugin.js';
import createLink from './editor/plugins/createLink.plugin.js';
import format from './editor/plugins/format.plugin.js';
import foreColor from './editor/plugins/foreColor.plugin.js';
import hiliteColor from './editor/plugins/hiliteColor.plugin.js';
import indent from './editor/plugins/indent.plugin.js';

import insertImage from './editor/plugins/insertImage.plugin.js';
import insertOrderedList from './editor/plugins/insertOrderedList.plugin.js';
import insertUnorderedList from './editor/plugins/insertUnorderedList.plugin.js';

import italic from './editor/plugins/italic.plugin.js';

import justifyCenter from './editor/plugins/justifyCenter.plugin.js';
import justifyFull from './editor/plugins/justifyFull.plugin.js';
import justifyLeft from './editor/plugins/justifyLeft.plugin.js';
import justifyRight from './editor/plugins/justifyRight.plugin.js';

import outdent from './editor/plugins/outdent.plugin.js';
import redo from './editor/plugins/redo.plugin.js';
import removeFormat from './editor/plugins/removeFormat.plugin.js';
import selectAll from './editor/plugins/selectAll.plugin.js';
import strikethrough from './editor/plugins/strikethrough.plugin.js';
import underline from './editor/plugins/underline.plugin.js';
import undo from './editor/plugins/undo.plugin.js';
import unlink from './editor/plugins/unlink.plugin.js';
import fontSize from './editor/plugins/fontSize.plugin.js';
import fontName from './editor/plugins/fontName.plugin.js';

import tabComponent from './tab.component.js';
import { tabpanelDirective, tabPanelHeaderDirective } from './tab-panel.component.js';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class AtlantisUiModule {
  static forRoot(config) {
    return {
      ngModule: AtlantisUiModule,
      providers: [
        { provide: gridConfig, useValue: config },
        { provide: dragAndDropService, useFactory: dragDropServiceFactory },
        { provide: dragAndDropSortableService, useFactory: dragDropSortableServiceFactory },
        { provide: dialogService, useFactory: dialogServiceFactory},
        { provide: localeMomentService, useFactory: localeMomentServiceFactory},
        pluginsService
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
        { provide: dialogService, useFactory: dialogServiceFactory},
        { provide: localeMomentService, useFactory: localeMomentServiceFactory}
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
      carouselItemComponent, accordionComponent, accordionPanelComponent, accordionPanelHeaderDirective, dropdownComponent, dropdownOptionComponent,
      dropdownDividerComponent, dropdownHeaderComponent, circleProgessBarComponent, gridComponent,
      gridHeaderComponent, gridBodyComponent, gridFooterComponent, gridCellComponent, gridCellHeaderComponent,
      popoverComponent, popoverDirective, tooltipComponent, tooltipDirective, backdropComponent, sortableContainer,
      sortableComponents, treeComponent, treeNodeComponent, sortableHandler, draggableDirective, draggableHandleDirective,
      dialogComponent, resizableDirective, codeDirective,
      agendaComponent, agendaMonthComponent, agendaDayNameComponent, agendaCalendarComponent, agendaWeekComponent,
      agendaDayComponent, agendaDayCornerComponent, agendaMoreEventsComponent, agendaDayEventsComponent, agendaEventComponent,
      inputFileDirective, editorComponent, blockquote, bold, createLink, format, foreColor, indent, insertImage, insertOrderedList, insertUnorderedList,
      italic, justifyLeft, justifyRight, justifyCenter, justifyFull, outdent, redo, removeFormat, selectAll,
      strikethrough, underline, undo, unlink, hiliteColor, fontSize, fontName, tabComponent, tabpanelDirective, tabPanelHeaderDirective],
    exports: [pagination, datepickerComponent, datepickerrangeComponent, selectpickerComponent,
      selectpickeroptionComponent, slidepickerComponent, slidepickeroptionComponent, focusDirective,
      modalComponent, modalHeaderComponent, modalBodyComponent, modalFooterComponent, carouselComponent,
      carouselItemComponent, accordionComponent, accordionPanelComponent, accordionPanelHeaderDirective, dropdownComponent, dropdownOptionComponent,
      dropdownDividerComponent, dropdownHeaderComponent, circleProgessBarComponent, gridComponent,
      gridHeaderComponent, gridBodyComponent, gridFooterComponent, gridCellComponent, gridCellHeaderComponent,
      popoverComponent, popoverDirective, tooltipComponent, tooltipDirective, backdropComponent, sortableContainer,
      sortableComponents, sortableHandler, treeComponent, treeNodeComponent, draggableDirective, draggableHandleDirective,
      dialogComponent, resizableDirective, codeDirective,
      agendaComponent, agendaMonthComponent, agendaDayNameComponent, agendaCalendarComponent, agendaWeekComponent,
      agendaDayComponent, agendaDayCornerComponent, agendaMoreEventsComponent, agendaDayEventsComponent, agendaEventComponent,
      inputFileDirective, editorComponent, blockquote, bold, createLink, format, foreColor, indent, insertImage, insertOrderedList, insertUnorderedList,
      italic, justifyLeft, justifyRight, justifyCenter, justifyFull, outdent, redo, removeFormat, selectAll,
      strikethrough, underline, undo, unlink, hiliteColor, fontSize, fontName, tabComponent, tabpanelDirective, tabPanelHeaderDirective],
    entryComponents: [tooltipComponent, popoverComponent, backdropComponent, blockquote, bold, createLink, format, foreColor,
      indent, insertImage, insertOrderedList, insertUnorderedList, italic, justifyLeft, justifyRight, justifyCenter,
      justifyFull, outdent, redo, removeFormat, selectAll, strikethrough, underline, undo, unlink, hiliteColor, fontSize, fontName]
  })
];
