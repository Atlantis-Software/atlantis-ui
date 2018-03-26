import {Component} from '@angular/core';

export default  class PaginationComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./pagination.html')
      })
    ];
  }
  constructor(){
    this.page = 4;
    this.pages = 10;
    this.result=[];
    this.testPagination(this.page);
  }

  testPagination(page){
    this.page = page;
    for (var i=0; i<5; i++) {
      this.result[i] = i+page*5-4;
    }
  }
}


PaginationComponent.parameters = [];
