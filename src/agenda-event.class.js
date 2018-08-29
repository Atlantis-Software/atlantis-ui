// Class use for event for know if it's begin or end after a specific date or if it's the begin of event or begin of week
export class agendaEvents {
  constructor(event, duration, moreEvents) {
    this.event = event;
    this.duration = duration;
    this.moreEvents = moreEvents || false;
  }

  isBeginEventOrBeginWeek(col, date) {
    if (!col || !date) {
      return;
    }
    if (col === 0 || this.event.beginDate.startOf("day").isSame(date.startOf("day"))) {
      return 1;
    } else {
      return 0;
    }
  }

  beginBefore(date) {
    if (!date) {
      return false;
    }
    if (this.event.beginDate.startOf("day").isBefore(date.startOf("day"))) {
      return true;
    }
  }

  endAfter(date) {
    if (!date) {
      return false;
    }
    if (this.event.endDate.startOf("day").isAfter(date.startOf("day"))) {
      return true;
    }
  }
}
