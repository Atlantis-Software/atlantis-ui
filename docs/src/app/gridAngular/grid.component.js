import {Component} from '@angular/core';

export default  class GridAngularComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./grid.html')
      })
    ];
  }
  constructor(){

    this.gridRows = `
    this.originalRows = [
      {
        test: "1",
        testNumber : 2,
        testText : "1",
        testDate : new Date(),
        testBoolean: 0,
        test1Date : new Date(),
      },
      {
        test: "2",
        testNumber : 6,
        testText : "5",
        testDate : new Date(0),
        testBoolean: 1,
        test1Date : new Date(),
      },
      {
        test : "3",
        testNumber : 5,
        testText : '4',
        testDate : new Date(),
        testBoolean: 1,
        test1Date : new Date(),
      },
      {
        style: { 'background-color': '#ee00ff' },
        test : "4",
        testNumber : 42,
        testText : "8",
        testDate : new Date('05/09/2005'),
        testBoolean: 1,
        test1Date : new Date('05/09/2005')
      },
      {
        style: { 'background-color': 'red' },
        test : "5",
        testNumber : 27,
        testText : "4",
        testDate : new Date(),
        testBoolean: 0
      },
      {
        test : "6",
        testNumber : 3,
        testText : "7",
        testDate : new Date('07/03/2015'),
        testBoolean: 0,
        test1Date : new Date('07/03/2015')
      },
      {
        test : "7",
        testNumber : 27,
        testText : "9",
        testDate : new Date('05/09/2005'),
        testBoolean: 0,
        test1Date : new Date('05/09/2005')
      },
      {
        test : "8",
        testNumber : 152,
        testText : '32',
        testDate : new Date(),
        testBoolean: 1,
        test1Date : new Date(),
      }
    ];

    this.rows = [...this.originalRows];`;

    this.columns= [
      {
        label:"test",
        alignment: "center"
      },
      {
        label:"testNumber",
        width: '150px',
        type: "number",
        isSortable: true,
        isEditable: true
      },
      {
        label:"testText",
        isSortable: true,
        isEditable: true
      },
      {
        label:"testDate",
        type: 'date',
        isSortable: true,
        isEditable: true,
        format: "full"
      },
      {
        label:"testBoolean",
        type: 'boolean',
        isEditable: true
      },
      {
        label:"test1Date",
        type: 'date',
        isSortable: true,
        isEditable: true,
        format: "mediumDate"
      }
    ];

    this.originalRows = [
      {
        test: "1",
        testNumber : 2,
        testText : "1",
        testDate : new Date(),
        testBoolean: 0,
        test1Date : new Date(),
      },
      {
        test: "2",
        testNumber : 6,
        testText : "5",
        testDate : new Date(0),
        testBoolean: 1,
        test1Date : new Date(),
      },
      {
        style: { 'background-color': '#ee00ff' },
        test : "3",
        testNumber : 5,
        testText : '4',
        testDate : new Date(),
        testBoolean: 1,
        test1Date : new Date(),
      },
      {
        test : {
          value: "4",
          style: { 'background-color': '#ee00ff' }
        },
        testNumber : 42,
        testText : "8",
        testDate : {
          value: new Date('05/09/2005'),
          style: {'color': 'red'}
        },
        testBoolean: 1,
        test1Date : new Date('05/09/2005')
      },
      {
        style: { 'background-color': 'red' },
        test : "5",
        testNumber : 27,
        testText : "4",
        testDate : new Date(),
        testBoolean: 0
      },
      {
        test : "6",
        testNumber : 3,
        testText : "7",
        testDate : new Date('07/03/2015'),
        testBoolean: 0,
        test1Date : new Date('07/03/2015'),
        style: { 'color': 'green' }
      },
      {
        test : "7",
        testNumber : 27,
        testText : "9",
        testDate : new Date('05/09/2005'),
        testBoolean: 0,
        test1Date : new Date('05/09/2005')
      },
      {
        test : "8",
        testNumber : 152,
        testText : '32',
        testDate : new Date(),
        testBoolean: 1,
        test1Date : new Date(),
      }
    ];

    this.rows = [...this.originalRows];

    this.selection = [];
    this.cell;
  }

  selectionTest(row) {
    this.selection = row;
  }

  onModify(cell) {
    this.index = cell.index;
    this.column = cell.column;
  }

  onSort(sorting) {
    if (!sorting.length) {
      return this.rows = [...this.originalRows];
    }
    this.loading = true;
    var columnToSort = sorting[sorting.length - 1];
    var sortingFunc = function() {};
    switch (columnToSort.type) {
      case 'text':
        sortingFunc = function(a, b) {
          return a[columnToSort.label].localeCompare(b[columnToSort.label]) * (columnToSort.order === 'desc' ? -1 : 1);
        };
        break;
      case 'boolean':
      case 'number':
        sortingFunc = function(a, b) {
          var comparison = a[columnToSort.label] > b[columnToSort.label];
          return columnToSort.order === 'desc' ? !comparison : comparison;
        };
        break;
      case 'date':
        sortingFunc = function(a, b) {
          var comparison = moment(a[columnToSort.label]).isAfter(moment(b[columnToSort.label]));
          return columnToSort.order === 'desc' ? !comparison : comparison;
        };
        break;
    }
    this.rows = this.rows.sort(sortingFunc);
    this.loading = false;
  }
}


GridAngularComponent.parameters = [];
