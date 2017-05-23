import { Component, EventEmitter } from '@angular/core';

export default class pagination {
  static get annotations() {
    return [
      new Component({
        selector: 'pagination',
        inputs: ['page', 'pages'],
        outputs: ['pagechange'],
        template: `
        <ul class="pagination">
          <li (click)="previousPage($event)" [class.disabled]="page === 1">
            <a href="#">
              <i class="icon icon-previous"></i>
            </a>
          </li>
          <li [class.active]="pageSh === page" *ngFor="let pageSh of pageShow; let i = index" (click)="changePage($event, pageSh)">
            <a href="#">
              {{pageSh}}
            </a>
          </li>
          <li *ngIf="page <= pages - (numberPageShowPrevious+1) && pages > numberPageShow">
            <a *ngIf="!changingPage" href="#" (click)="inputPage($event)">
              ...
            </a>
            <input class="pagination-input form-control" *ngIf="changingPage" type="number" (blur)="choosePage($event)" (keyup.enter)="choosePage($event)" focus/>
          </li>
          <li *ngIf="page <= pages - numberPageShowPrevious && pages > numberPageShow" (click)="changePage($event, pages)">
            <a href="#">
              {{pages}}
            </a>
          </li>
          <li (click)="nextPage($event)" [class.disabled]="page === pages">
            <a href="#">
              <i class="icon icon-next"></i>
            </a>
          </li>
        </ul>`
      })
    ]
  }

  //Initialize numberPageShow, after and previous for calculate how many page we want after and previous actual page
  constructor(){
    this.numberPageShow = 5;
    this.numberPageShowAfter = Math.floor(this.numberPageShow/2);
    this.numberPageShowPrevious = Math.ceil(this.numberPageShow/2);
    this.changingPage = false;
    this.pagechange = new EventEmitter();
  }

  //initialize local variable with @Input
  ngOnChanges(){
    this.pageChoose = this.page;
    this.pageCount = this.createArray(this.pages);
    //verify if number of page total is inferior to numberpageShow and if true show all pages
    if (this.pages <= this.numberPageShow) {
      this.pageShow = this.pageCount;
    } else {
      //verify is current page is before numberPageShow previous and show x first page
      if ( this.page <= this.numberPageShowPrevious ) {
        this.pageShow = this.pageCount.slice(0, this.numberPageShow);
      //verify is current page is after numberPageShow after and show x last page
      } else if ( this.page >= this.pages - this.numberPageShowAfter) {
        this.pageShow = this.pageCount.slice(this.pages - this.numberPageShow,this.pages);
      //other it's show x-numberPageShow/2 to x+numberPageshow/2 page
      } else {
        this.pageShow = this.pageCount.slice(this.page - this.numberPageShowPrevious, this.page + this.numberPageShowAfter);
      }
    }
  }

  //create an array with 1,2,3 ... n
  createArray(number){
    var pages = new Array(number);
    for (var i = 0; i < number; i++) {
      pages[i] = i+1;
    }
    return pages;
  }

  //Send event to function pass in output with page we want
  changePage(e, index){
    e.preventDefault();
    if (!this.changingPage) {
      if (index > this.pages) {
        index = this.pages;
      } else if (index < 1) {
        index = 1;
      }
      if (index != this.page) {
        this.pagechange.emit(index);
      }
    }
  }

  //show 5 previous page when click on previous arrow
  previousPage(e){
    e.preventDefault();
    if (!this.changingPage) {
      if (this.page > 1) {
        this.changePage(e, this.page - this.numberPageShow);
      }
    }
  }

  //show 5 next page when click on next arrow
  nextPage(e){
    e.preventDefault();
    if (!this.changingPage) {
      if (this.page < this.pages ) {
        this.changePage(e, this.page + this.numberPageShow);
      }
    }
  }

  inputPage(e){
    e.preventDefault();
    this.changingPage = !this.changingPage;
  }

  //change button ... to input for choose page we want
  choosePage(e, ){
    var self = this;
    e.preventDefault();
    if(this.changingPage == true){
      this.changingPage = !this.changingPage;
    }
    var pageChoose = e.target.value;
    if (pageChoose != null) {
      if(pageChoose === 0 || pageChoose > this.pages) {
        pageChoose = 1;
      }
      pageChoose = Math.floor(pageChoose);
      setTimeout(function(){
        self.changePage(e, +pageChoose);
      }, 1);
    }
  }
}
