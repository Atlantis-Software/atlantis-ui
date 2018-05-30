import HomeComponent from './home/home.component';
import DatepickerComponent from './datepicker/datepicker.component';

import AgendaComponent from './agenda/agenda.component';

import PaginationComponent from './pagination/pagination.component';

import SelectpickerComponent from './selectpicker/selectpicker.component';

import SlidepickerComponent from './slidepicker/slidepicker.component';

import navbarComponent from './navbar/navbar.component';

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

export default [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'datepicker', component: DatepickerComponent },

  { path: 'pagination', component: PaginationComponent },

  { path: 'selectpicker', component: SelectpickerComponent },

  { path: 'slidepicker', component: SlidepickerComponent },

  { path: 'navbar', component: navbarComponent },

  { path: 'dropdown', component: DropdownComponent },

  { path: 'button', component: ButtonComponent },
  { path: 'icon', component: IconComponent },

  { path: 'modal', component: ModalComponent },
  { path: 'dialog', component: DialogComponent },

  { path: 'table', component: TableComponent },

  { path: 'carousel', component: CarouselComponent },

  { path: 'popover', component: PopoverComponent },
  { path: 'tooltip', component: TooltipComponent },

  { path: 'accordion', component: AccordionComponent },

  { path: 'progressBar', component: ProgressBarComponent },

  { path: 'inputgroup', component: InputgroupComponent },
  { path: 'grid', component: GridComponent },
  { path: 'gridAngular', component: GridAngularComponent },
  { path: 'buttongroups', component: ButtongroupsComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'dragAndDrop', component: dragAndDropComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'draggable', component: DraggableComponent},
  { path: 'agenda', component: AgendaComponent},
  { path: 'editor', component: EditorComponent},
  { path: 'colors', component: ColorsComponent}

];
