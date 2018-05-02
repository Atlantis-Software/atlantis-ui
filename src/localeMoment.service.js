import { language } from './locale.js';

export class localeMomentService {
  constructor() {
    moment.locale(language);
    this.format = moment.localeData().longDateFormat('L');
    this.daysOfWeek = moment.weekdaysMin();
    this.monthNames = moment.months();
    this.weekdayNames = moment.weekdaysShort();
    this.firstDay = moment.localeData().firstDayOfWeek();
  }
}

export function localeMomentServiceFactory() {
  return new localeMomentService();
}
