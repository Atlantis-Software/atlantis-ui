import { Directive, ElementRef, Renderer2, EventEmitter } from '@angular/core';

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class draggableDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[draggable]',
        inputs: ['draggable'],
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
      this.oldPos = new Position(0, 0);

      this.element = this.elementRef.nativeElement;
      let element = this.handle ? this.handle : this.element;
      if (this.isDraggable) {
        this.renderer.addClass(element, 'draggable');
      } else {
        this.renderer.removeClass(element, 'draggable');
      }
      if (this.element.querySelector(".modal-dialog")) {
        this.isModal = true;
        this.element = this.elementRef.nativeElement.querySelector(".modal-dialog");
      } else if ( this.element.classList.contains('modal-dialog')) {
        this.isModal = true;
      }
    }
  }

  ngAfterViewInit() {
    if (this.isDraggable) {
      this.element = this.elementRef.nativeElement;
      let element = this.handle ? this.handle : this.element;
      this.renderer.addClass(element, 'draggable');
      if (this.element.querySelector(".modal-dialog")) {
        this.isModal = true;
        this.element = this.elementRef.nativeElement.querySelector(".modal-dialog");
      } else if ( this.element.classList.contains('modal-dialog')) {
        this.isModal = true;
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
    if (!this.isModal) {
      this.oldZIndex = window.getComputedStyle(this.element).getPropertyValue("z-index");
    }
    this.element.style.cursor = "move";
    this.oldPositionStyle = window.getComputedStyle(this.element).getPropertyValue("position");

    let position = 'relative';

    if (this.oldPositionStyle && (this.oldPositionStyle === 'absolute' || this.oldPositionStyle === 'fixed' || this.oldPositionStyle === 'relative')) {
      position = this.oldPositionStyle;
    }

    this.renderer.setStyle(this.element, 'position', position);

    if (!this.isModal) {
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
    } else if (!this.isModal){
      this.element.style.removeProperty('z-index');
    }
    this.element.style.cursor = "auto";

    if (this.isMoving) {
      this.stopped.emit(this.element);
      this.isMoving = false;
      this.oldPos.x += this.tempPos.x;
      this.oldPos.y += this.tempPos.y;
      this.tempPos.x = this.tempPos.y = 0;
    }
  }

  onMouseDown(event) {
    if (event.button == 2 || (this.handle !== undefined && !this.handle.contains(event.target) )) {
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

  setDraggableHandle(handle) {
    this.handle = handle;
  }
}

draggableDirective.parameters = [ElementRef, Renderer2];

export class draggableHandleDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[draggable-handle]'
      })
    ];
  }

  constructor(ElementRef, draggableDirective) {
    this._element = ElementRef.nativeElement;
    draggableDirective.setDraggableHandle(this._element);
  }
}

draggableHandleDirective.parameters = [ElementRef, draggableDirective];
