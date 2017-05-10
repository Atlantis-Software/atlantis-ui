import  HomeComponent from './home/home.component';
import  DatepickerComponent  from './datepicker/datepicker.component';
import  PaginationComponent  from './pagination/pagination.component';
import  SelectpickerComponent  from './selectpicker/selectpicker.component';
import  SlidepickerComponent  from './slidepicker/slidepicker.component';


export default [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'datepicker', component: DatepickerComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'selectpicker', component: SelectpickerComponent },
  { path: 'slidepicker', component: SlidepickerComponent }
];
