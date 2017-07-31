import {Component} from '@angular/core';

export default  class PaginationAngularComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./pagination.html')
      })
    ]
  }
  constructor(){

    this.PaginationHtml = `
    <pagination [page]="page" [pages]="pages" (pagechange)='testPagination($event)'></pagination>`;
    this.paginationSize = `
    <pagination class="pagination-sm" [page]="page" [pages]="pages" (pagechange)='testPagination($event)'></pagination>
    <pagination class="pagination-lg" [page]="page" [pages]="pages" (pagechange)='testPagination($event)'></pagination>`;

    this.page = 4;
    this.pages = 10;
    this.result = [1,2,3,4,5]
  }

  testPagination(page){
    this.page = page
    for (var i=0; i<5; i++) {
      this.result[i] = i+page*5-4
    }
  }
}


PaginationAngularComponent.parameters = [];
