import { Component, ContentChildren, ElementRef, ChangeDetectorRef } from '@angular/core';
// import { trigger, state, style, animate, transition } from '@angular/animations'


export class carouselComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'carousel',
        template: `
        <ol [hidden]="items.length <= 0 || !indicator" class="carousel-indicators">
          <li *ngFor="let item of items;" (click)="changeItem(item)" [class.active]="item.isActive"></li>
        </ol>

        <div class="carousel-inner">
          <ng-content></ng-content>
        </div>

        <a [hidden]="items.length <= 1" class="left carousel-control" role="button" (click)="previousItem()">
          <i class="icon icon-previous" aria-hidden="true"></i>
          <span class="sr-only">Previous</span>
        </a>
        <a [hidden]="items.length <= 1" class="right carousel-control" role="button" (click)="nextItem()">
          <i class="icon icon-next" aria-hidden="true"></i>
          <span class="sr-only">Next</span>
        </a>`,
        queries: {
          items: new ContentChildren(carouselItemComponent)
        },
        inputs: ["indicator", "activeDefault", "interval", "pause"],
        host: {
          "class": "carousel",
          "[hidden]": "items.length === 0",
          "(mouseenter)": "hover=true",
          "(mouseleave)": "hover=false"
        }
      })
    ];
  }
  constructor(elementRef, ChangeDetectorRef) {
    this.elementRef = elementRef;
    this.activeItem;
    this.hover = false;
    this.cdr = ChangeDetectorRef;
  }

  ngAfterViewInit() {
    var items = this.items.toArray();
		//Subscribe to the changes of items queries for know if the queries items are empty or not and active one if we suppress the actual active
    this.items.changes.subscribe((items) => {
      if (items.length > 0) {
        var oneActive = false;
        items.forEach((item) => {
          if (item.isActive) {
            oneActive = true;
          }
        });
        if (!oneActive) {
          setTimeout(() => {
            this.changeItem(items.first);
          }, 0);
        }
      }
    });

		//Show the correct slide per default
    if (this.activeDefault > 0) {
      if (this.activeDefault > this.items.length - 1) {
        this.activeDefault = 0;
      }
      setTimeout(() => {
        this.changeItem(items[this.activeDefault], "none");
      }, 0);
    } else {
      setTimeout(() => {
        this.changeItem(this.items.first, "none");
      }, 0);
    }

		//Define the function for interval between slide
    if (this.interval) {
      if (this.interval < 0) {
        this.interval = 2000;
      }
      this.slide = setInterval(() => {
        if (this.items.length > 1 && (!this.hover || this.pause === "none")) {
          var nextActive = this.activeItem + 1;
          if (nextActive >= this.items.length) {
            nextActive = 0;
          }
          this.nextItem();
        }
      }, this.interval);
    }
  }

	//Suppress interval if we destroy the carousel component
  ngOnDestroy() {
    clearInterval(this.slide);
  }

	//Define the direction of the slide
  getDirection(newActive, oldActive) {
    if (newActive > oldActive) {
      return "left";
    } else {
      return "right";
    }
  }

	//function when we change slide
  changeItem(itemActive, direction) {
    if (!this.items.length > 0) {
      return;
    }

    if (itemActive.isActive) {
      return;
    }

    var items = this.items.toArray();
    var indexNewActive = items.indexOf(itemActive);
    direction = direction || this.getDirection(indexNewActive, this.activeItem);
		//Verify if the actual slide is delete or not and change itemActive
    if (itemActive.delete) {
      this.items.forEach((item) => {
        if (!item.delete) {
          itemActive = item;
        }
      });
    }
		//Function launch if we define a interval
    if (this.slide && this.activeItem !== undefined) {
      itemActive.state = direction;
      items[this.activeItem].state = direction;
      itemActive.isActive = true;
      this.items.forEach((item) => {
        if (item !== itemActive) {
          item.isActive = false;
        }
      });
      itemActive.state = "active";
      items[this.activeItem].state = "";
      this.activeItem = indexNewActive;
		//function call when we click on indicator or arrow
    } else {
      this.activeItem = indexNewActive;
      itemActive.isActive = true;
      this.items.forEach((item) => {
        if (item !== itemActive) {
          item.isActive = false;
        }
      });
    }
    this.cdr.detectChanges();
  }

	//Change slide for next slide
  nextItem() {
    var items = this.items.toArray();
    var index;
    this.items.forEach((item, indexItem) => {
      if (item.isActive) {
        index = indexItem + 1;
        if (index >= this.items.length) {
          index = 0;
        }
      }
    });
    this.changeItem(items[index], "left", "next");
  }

	//Change slide for previous slide
  previousItem() {
    var items = this.items.toArray();
    var index;
    this.items.forEach((item, indexItem) => {
      if (item.isActive) {
        index = indexItem - 1;
        if (index < 0) {
          index = this.items.length - 1;
        }
      }
    });
    this.changeItem(items[index], "right", "prev");
  }


}

carouselComponent.parameters = [ElementRef, ChangeDetectorRef];

export class carouselItemComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'carousel-item',
        template: `
          <ng-content >
          </ng-content>`,
        host: {
          "class": "item",
          "[class.active]": "isActive"
        }
      })
    ];
  }

  constructor(elementRef, carousel) {
    this.elementRef = elementRef;
    this.carousel = carousel;
    this.isActive = false;
    this.delete = false;
    this.state;
  }

}

carouselItemComponent.parameters = [ElementRef, carouselComponent];
