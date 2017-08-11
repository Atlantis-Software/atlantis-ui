import {Component} from '@angular/core';

export default  class GridAngularComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./grid.html')
      })
    ]
  }
  constructor(){

    this.columns= [
      {
        label:"test",
        alignment: "center"
      }
      ,{
        label:"test2",
        width : "150px"
      }
      ,{
        label:"test3",
        class: "btn"
      }
      ,{
        label:"test4",
        type: 'date'
      }
    ]

    this.rows = [
      {
        test: "1",
        test2 : "2",
        test3 : "3",
        test4 : new Date()
      },
      {
        test: "2",
        test2 : "6",
        test3 : "7",
        test4 : new Date(0)
      },
      {
        test : "3",
        test2 : '2',
        test3 : '3',
        test4 : new Date()
      },
      {
        test : "4",
        test2 : "2",
        test3 : "3",
        test4 : new Date()
      },
      {
        test : "5",
        test2 : "2",
        test3 : "3",
        test4 : new Date()
      },
      {
        test : "6",
        test2 : "2",
        test3 : "3",
        test4 : new Date()
      },
      {
        test : "7",
        test2 : "2",
        test3 : "3",
        test4 : new Date()
      },
      {
        test : "8",
        test2 : "2",
        test3 : '3',
        test4 : new Date()
      }
    ]

    this.selection = [];

  }

  selectiontest(row) {
    this.selection = row;
    console.log("selection ", row)
  }

  onSort(sorting) {
    console.log('Sort Event', sorting);
    this.loading = true;
    setTimeout(() => {
      const rows = [...this.rows];
      console.log(rows);
      const sort = sorting.sort;
      rows.sort((a, b) => {
        return a[sort.label].localeCompare(b[sort.label]) * (sort.dir === 'desc' ? -1 : 1);
      });

      this.rows = rows;
      this.sorting = sorting
      this.loading = false;
    }, 1000);
  }
}


GridAngularComponent.parameters = [];
