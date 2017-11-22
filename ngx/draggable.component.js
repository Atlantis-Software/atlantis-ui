import { Directive, ElementRef, Renderer2, EventEmitter } from '@angular/core';

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default class draggableDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '.draggable',
        inputs: ['draggable', 'handle'],
        outputs: ['started', 'stopped'],
        host: {
          '(mousedown)': 'onMouseDown($event)',
          '(document:mouseup)': 'onMouseUp()',
          '(document:mouseleave)': 'onMouseUp()',
          '(document:mousemove)': 'onMouseMove($event)'
        }
      })
    ];
  }

  constructor(ElementRef, Renderer2){
    this.elementRef = ElementRef;
    this.renderer = Renderer2;
    this.isDraggable = true;
    this.isMoving = false;
    this.origPos = null;
    this.oldPos = new Position(0,0);
    this.tempPos = new Position(0,0);
    this.oldIndex = '';
    this.oldPositionStyle = '';
    this.started = new EventEmitter();
    this.stopped = new EventEmitter();
    this.isModal = false;
  }

  set draggable(setting) {
    if (setting !== void 0 && setting !== null && setting !== '') {
      this.isDraggable = !!setting;

      this.element = this.handle ? this.handle : this.elementRef.nativeElement;

      if (this.isDraggable) {
        this.renderer.addClass(this.element, 'draggable');
      } else {
        this.renderer.removeClass(this.element, 'draggable', false);
      }
    }
  }

  ngOnInit() {
    if (this.isDraggable) {
      this.element = this.handle ? this.handle : this.elementRef.nativeElement;
      this.renderer.addClass(this.element, 'draggable');
      if (this.elementRef.nativeElement.querySelector(".modal")) {
        this.isModal = true;
        this.element = this.elementRef.nativeElement.querySelector('.modal');
      }
    }
  }

  getPosition(x, y) {
    return new Position(x, y);
  }

  moveTo(x, y) {
    if (this.origPos) {
      this.tempPos.x = x - this.origPos.x;
      this.tempPos.y = y - this.origPos.y;
      let value = `translate(${this.tempPos.x + this.oldPos.x}px, ${this.tempPos.y + this.oldPos.y}px)`;
      this.renderer.setStyle(this.element, 'transform', value);
    }
  }

  dragStart() {
    if (this.isModal) {
      console.log("IsModal");
    } else {
      this.oldZIndex = window.getComputedStyle(this.element, null).getPropertyValue("z-index");
    }
    this.oldPositionStyle = window.getComputedStyle(this.element, null).getPropertyValue("position");

    let position = 'relative';

    if (this.oldPositionStyle && (this.oldPositionStyle === 'absolute' || this.oldPositionStyle === 'fixed' || this.oldPositionStyle === 'relative')) {
      position = this.oldPositionStyle;
    }

    this.renderer.setStyle(this.element, 'position', position);

    if (this.isModal) {
      console.log("IsModal");
    } else {
      this.renderer.setStyle(this.element, 'z-index', '99999');
    }

    if (!this.isMoving) {
      this.started.emit(this.element);
      this.isMoving = true;
    }
  }

  dragEnd() {
    if (this.oldZIndex) {
      this.renderer.setStyle(this.element, 'z-index', this.oldZIndex);
    } else {
      this.element.style.removeProperty('z-index');
    }

    if (this.isMoving) {
      this.stopped.emit(this.element);
      this.isMoving = false;
      this.oldPos.x += this.tempPos.x;
      this.oldPos.y += this.tempPos.y;
      this.tempPos.x = this.tempPos.y = 0;
    }
  }

  onMouseDown(event) {
    if (event.button == 2 || (this.handle !== undefined && event.target !== this.handle)) {
      return;
    }
    this.origPos = this.getPosition(event.clientX, event.clientY);
    this.dragStart();
  }

  onMouseUp() {
    this.dragEnd();
  }

  onMouseMove(event) {
    if (this.isMoving && this.isDraggable) {
      this.moveTo(event.clientX, event.clientY);
    }
  }
}

draggableDirective.parameters = [ElementRef, Renderer2];
