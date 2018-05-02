import {Component} from '@angular/core';

export default  class AgendaComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./agenda.html')
      })
    ];
  }
  constructor(){

    this.events = [
      {
        beginDate: moment("2017-12-31"),
        endDate: moment("2018-01-04"),
        name: "Begin before month and end during month 2017-12-31/2018-01-04"
      },
      {
        beginDate: moment("2018-01-30"),
        endDate: moment("2018-02-12"),
        name: "Begin during month and end after month 2018-01-30/2018-02-12",
        color: "#0061ff"
      },
      {
        beginDate: moment("2018-01-22"),
        endDate: moment("2018-01-25"),
        name: "Not show 2018-01-22/2018-01-25",
        color: "#ff001d"
      },
      {
        beginDate: moment("2018-01-26"),
        endDate: moment("2018-01-29"),
        name: "Begin first line and change line in second week 2018-01-26/2018-01-29",
        color: "#1dff00"
      },
      {
        beginDate: moment("2018-01-23"),
        endDate: moment("2018-01-30"),
        name: "Begin second line and change line in second week 2018-01-23/2018-01-30",
        color: "#0061ff"
      },
      {
        beginDate: moment("2018-01-22"),
        endDate: moment("2018-01-22"),
        name: "Not show",
        color: "#ff001d"
      },
      {
        beginDate: moment("2018-01-25"),
        endDate: moment("2018-01-25"),
        name: "Not show",
        color: "#1dff00"
      },
      {
        beginDate: moment("2018-01-25"),
        endDate: moment("2018-01-25"),
        name: "Event on 1 day 2018-01-25",
        color: "#ffc596"
      },
      {
        beginDate: moment("2018-01-25"),
        endDate: moment("2018-01-25"),
        name: "Event on 1 day 2018-01-25",
        color: "#ffc596"
      },
      {
        beginDate: moment("2018-01-19"),
        endDate: moment("2018-01-23"),
        name: "Test superposition number 2 2018-01-19/2018-01-23",
        color: "#ffc596"
      },
      {
        beginDate: moment("2018-01-18"),
        endDate: moment("2018-01-20"),
        name: "Test superposition number 1 2018-01-18/2018-01-20",
        color: "#1dff00"
      },
      {
        beginDate: moment("2018-01-20"),
        endDate: moment("2018-01-22"),
        name: "Test superposition number 3 2018-01-20/2018-01-22",
        color: "#f6bf26"
      },
      {
        beginDate: moment("2017-12-20"),
        endDate: moment("2017-12-25"),
        name: "Before actual Month",
        color: "#f6bf26"
      },
      {
        beginDate: moment("2018-02-20"),
        endDate: moment("2018-02-22"),
        name: "After actual month",
        color: "#f6bf26"
      },
      {
        beginDate: moment("2018-01-29"),
        endDate: moment("2018-01-29"),
        name: "After actual month",
        color: "#f6bf26"
      }
    ];
    this.date = moment('2018-01-01');
  }
}


AgendaComponent.parameters = [];
