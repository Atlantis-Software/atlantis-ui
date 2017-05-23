import HomeComponent from './home/home.component';
import DatepickerComponent from './datepicker/datepicker.component';
import PaginationComponent from './pagination/pagination.component';
import SelectpickerComponent from './selectpicker/selectpicker.component';
import SlidepickerComponent from './slidepicker/slidepicker.component';
import navbarComponent from './navbar/navbar.component';
import DropdownComponent from './dropdown/dropdown.component.js';
import InputComponent from './input/input.component.js';
import ButtonComponent from './button/button.component.js';
import IconComponent from './icon/icon.component.js';
import ModalComponent from './modal/modal.component.js';
import TableComponent from './table/table.component.js';
import CarouselComponent from './carousel/carousel.component.js';
import PopoverComponent from './popover/popover.component.js';
import CollapseComponent from './collapse/collapse.component.js';
import InputgroupComponent from './inputgroup/inputgroup.component.js';

export default [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'datepicker', component: DatepickerComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'selectpicker', component: SelectpickerComponent },
  { path: 'slidepicker', component: SlidepickerComponent },
  { path: 'navbar', component: navbarComponent },
  { path: 'dropdown', component: DropdownComponent },
  { path: 'input', component: InputComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'icon', component: IconComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'table', component: TableComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'popover', component: PopoverComponent },
  { path: 'collapse', component: CollapseComponent },
  { path: 'inputgroup', component: InputgroupComponent }
];
