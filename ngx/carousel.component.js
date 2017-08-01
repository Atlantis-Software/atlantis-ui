import { Component, ContentChildren, ElementRef, ChangeDetectorRef} from '@angular/core';
// import { trigger, state, style, animate, transition } from '@angular/animations'


export class carouselComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'carousel',
        template: `
        <ol [hidden]="items.length <= 0 || !options.indicator" class="carousel-indicators">
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
        inputs: ["options"],
        host: {
          "class":"carousel",
          "[hidden]":"items.length === 0",
          "(mouseenter)":"hover=true",
          "(mouseleave)":"hover=false"
        }
      })
    ];
  }
  constructor(elementRef, ChangeDetectorRef) {
    this.elementRef = elementRef;
    this.activeItem;
    this.hover = false;
    this.click = false;
    this.cdr = ChangeDetectorRef
  }

  ngAfterViewInit(){
    var self = this;
    var items = this.items.toArray();
    var itemsChanges = this.items.changes.subscribe((items)=>{
      if (items.length > 0 ) {
        var oneActive = false;
        items.forEach((item)=>{
          if (item.isActive) {
            oneActive = true;
          }
        })
        if (!oneActive) {
          setTimeout(()=>{
            this.changeItem(items.first);
          }, 0);
        }
      }
    })

    if (this.options && this.options.activeDefault > 0) {
      if (this.options.activeDefault > this.items.length - 1) {
        this.options.activeDefault = 0;
      }
      setTimeout(()=>{
        this.changeItem(items[this.options.activeDefault], "none")
      }, 0);
    } else {
      setTimeout(()=>{
        this.changeItem(this.items.first, "none");
      }, 0);
    }

    if (this.options && this.options.interval) {
      if (this.options.interval < 0) {
        this.options.interval = 2000
      }
      this.slide = setInterval(() => {
        if(this.items.length > 1 && !this.hover || this.options.pause === "none") {
          var nextActive = this.activeItem + 1;
          if (nextActive >= this.items.length) {
            nextActive = 0;
          }
          this.nextItem()
        }
      }, this.options.interval)
    }
    this.click = false;
  }

  ngOnDestroy() {
    clearInterval(this.slide);
  }

  getDirection(newActive, oldActive) {
    if (newActive > oldActive) {
      return "left"
    } else {
      return "right"
    }
  }

  changeItem(itemActive, direction, type) {
    if (!this.items.length>0) {
      return;
    }

    if (itemActive.isActive) {
      return;
    }

    if (this.click) {
      return;
    }
    var items = this.items.toArray()
    var indexNewActive = items.indexOf(itemActive);
    var direction = direction || this.getDirection(indexNewActive, this.activeItem);
    if (direction === "left") {
      type = type || "next"
    } else if (direction === "right") {
      type = type || "prev"
    }
    if(itemActive.delete) {
      this.items.forEach((item)=> {
        if (!item.delete) {
          itemActive = item;
        }
      })
    }
    if (this.options && this.options.slide && this.activeItem !== undefined) {
      // itemActive[type] = true;
      // itemActive[direction] = true;
      // items[this.activeItem][direction] = true;
      //
      itemActive.state = direction;
      items[this.activeItem].state = direction;
      setTimeout(()=>{
        itemActive.isActive = true;
        this.items.forEach((item) => {
          if (item !== itemActive) {
            item.isActive = false;
          }
        });
        itemActive.state = "active";
        items[this.activeItem].state = "";
        // items[this.activeItem].left = false;
        // items[this.activeItem].right = false;
        this.activeItem = indexNewActive;
      }, 600);
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

  nextItem(){
    var items = this.items.toArray();
    var index;
    this.items.forEach((item, indexItem) => {
      if (item.isActive) {
        index = indexItem +1;
        if (index >= this.items.length) {
          index = 0;
        }
      }
    })
    this.changeItem(items[index], "left", "next")
  }

  previousItem(){
    var items = this.items.toArray();
    var index;
    this.items.forEach((item, indexItem) => {
      if (item.isActive) {
        index = indexItem - 1;
        if (index < 0) {
          index = this.items.length - 1 ;
        }
      }
    })
    this.changeItem(items[index], "right", "prev")
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
        // animations: [
        //   trigger('itemState', [
        //     state('active', style({transform: 'translateX(0)'})),
        //     state('right', style({transform: 'translateX(100%)'})),
        //     state('left', style({transform: 'translateX(-100%)'})),
        //     transition('active <=> left, active <=> right', animate('600ms')),
        //     transition('* => active', animate('600ms')),
        //     transition('* => right', animate('600ms')),
        //     transition('* => left', animate('600ms')),
        //   ])
        // ]
	  	})
		];
	}

  constructor (elementRef, carousel) {
    this.elementRef = elementRef;
    this.carousel = carousel;
    this.isActive = false;
    this.delete = false;
    // this.next = false;
    // this.prev = false;
    // this.left = false;
    // this.right = false;
    this.state;
  }

}

carouselItemComponent.parameters = [ElementRef, carouselComponent];
