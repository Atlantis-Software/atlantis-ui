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
        label:"testdsqdsqdsqdsqdqs",
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

    var test = new Date()+" | date: 'shortDate'"

    this.rows = [
      {
        testdsqdsqdsqdsqdqs: 1,
        test2 : 2,
        test3 : 3,
        test4 : new Date()
      },
      {
        testdsqdsqdsqdsqdqs: 5,
        test2 : 6,
        test3 : 7,
        test4 : new Date(0)
      }
    ]

    this.Display = "Example";
  }
}


GridAngularComponent.parameters = [];
