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

    this.gridHtml= `
    <grid class="table table-bordered" [columns]= "columns" [rows]= "rows"
      (selectedRows)="selectionTest($event)" [selected]="selection" (sort)="onSort($event)">
    </grid>`;

    this.gridRows = `
    this.originalRows = [
      {
        test: "1",
        testNumber : 2,
        testText : "1",
        testDate : new Date(),
        testBoolean: 0
      },
      {
        test: "2",
        testNumber : 6,
        testText : "5",
        testDate : new Date(0),
        testBoolean: 1
      },
      {
        test : "3",
        testNumber : 5,
        testText : '4',
        testDate : new Date(),
        testBoolean: 1
      },
      {
        test : "4",
        testNumber : 42,
        testText : "8",
        testDate : new Date('05/09/2005'),
        testBoolean: 1
      },
      {
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
        testBoolean: 0
      },
      {
        test : "7",
        testNumber : 27,
        testText : "9",
        testDate : new Date('05/09/2005'),
        testBoolean: 0
      },
      {
        test : "8",
        testNumber : 152,
        testText : '32',
        testDate : new Date(),
        testBoolean: 1
      }
    ];

    this.rows = [...this.originalRows];`;

    this.gridColumns = `
    this.columns= [
      {
        label:"test",
        alignment: "center",
        notSortable: true,
        notEditable: true
      },
      {
        label:"testNumber",
        width: "150px",
        type: "number"
      },
      {
        label:"testText"
      },
      {
        label:"testDate",
        type: 'date'
      },
      {
        label:"testBoolean",
        type: 'boolean'
      }
    ];`;

    this.columns= [
      {
        label:"test",
        alignment: "center",
        notSortable: true,
        notEditable: true
      },
      {
        label:"testNumber",
        width: "150px",
        type: "number"
      },
      {
        label:"testText"
      },
      {
        label:"testDate",
        type: 'date'
      },
      {
        label:"testBoolean",
        type: 'boolean'
      }
    ];

    this.originalRows = [
      {
        test: "1",
        testNumber : 2,
        testText : "1",
        testDate : new Date(),
        testBoolean: 0
      },
      {
        test: "2",
        testNumber : 6,
        testText : "5",
        testDate : new Date(0),
        testBoolean: 1
      },
      {
        test : "3",
        testNumber : 5,
        testText : '4',
        testDate : new Date(),
        testBoolean: 1
      },
      {
        test : "4",
        testNumber : 42,
        testText : "8",
        testDate : new Date('05/09/2005'),
        testBoolean: 1
      },
      {
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
        testBoolean: 0
      },
      {
        test : "7",
        testNumber : 27,
        testText : "9",
        testDate : new Date('05/09/2005'),
        testBoolean: 0
      },
      {
        test : "8",
        testNumber : 152,
        testText : '32',
        testDate : new Date(),
        testBoolean: 1
      }
    ];

    this.rows = [...this.originalRows];

    this.selection = [];

  }

  selectionTest(row) {
    this.selection = row;
    console.log("selection ", row)
  }

  onSort(sorting) {
    if (!sorting.length) {
      return this.rows = [...this.originalRows];
    }
    console.log('Sort Event', sorting);
    this.loading = true;
    var columnToSort = sorting[sorting.length - 1];
    var sortingFunc = function(a, b) {};
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
