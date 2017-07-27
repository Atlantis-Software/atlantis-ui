import HomeComponent from './home/home.component';
import DatepickerAngularComponent from './datepickerAngular/datepicker.component';

import PaginationAngularComponent from './paginationAngular/pagination.component';

import SelectpickerAngularComponent from './selectpickerAngular/selectpicker.component';

import SlidepickerAngularComponent from './slidepickerAngular/slidepicker.component';

import navbarComponent from './navbar/navbar.component';

import DropdownAngularComponent from './dropdownAngular/dropdown.component.js';

import InputComponent from './input/input.component.js';
import ButtonComponent from './button/button.component.js';
import IconComponent from './icon/icon.component.js';

import ModalAngularComponent from './modalAngular/modal.component.js';

import TableComponent from './table/table.component.js';

import CarouselAngularComponent from './carouselAngular/carousel.component.js';

import PopoverComponent from './popover/popover.component.js';

import AccordionComponent from './accordion/accordion.component.js';

import ProgressBarComponent from './progress-bar/progress-bar.component.js';

import InputgroupComponent from './inputgroup/inputgroup.component.js';
import GridComponent from './grid/grid.component.js';
import GridAngularComponent from './gridAngular/grid.component.js';

import ButtongroupsComponent from './buttongroups/buttongroups.component.js';
import FormsComponent from './forms/forms.component.js';

export default [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'datepickerAngular', component: DatepickerAngularComponent },

  { path: 'paginationAngular', component: PaginationAngularComponent },

  { path: 'selectpickerAngular', component: SelectpickerAngularComponent },

  { path: 'slidepickerAngular', component: SlidepickerAngularComponent },

  { path: 'navbar', component: navbarComponent },

  { path: 'dropdownAngular', component: DropdownAngularComponent },

  { path: 'input', component: InputComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'icon', component: IconComponent },

  { path: 'modalAngular', component: ModalAngularComponent },

  { path: 'table', component: TableComponent },

  { path: 'carouselAngular', component: CarouselAngularComponent },

  { path: 'popover', component: PopoverComponent },

  { path: 'accordion', component: AccordionComponent },

  { path: 'progressBar', component: ProgressBarComponent },

  { path: 'inputgroup', component: InputgroupComponent },
  { path: 'grid', component: GridComponent },
  { path: 'gridAngular', component: GridAngularComponent },
  { path: 'buttongroups', component: ButtongroupsComponent },
  { path: 'forms', component: FormsComponent }

];
