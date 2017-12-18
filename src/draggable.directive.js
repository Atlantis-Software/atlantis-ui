import { Directive, ElementRef, Renderer2, EventEmitter } from '@angular/core';

export class draggableDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[draggable]',
        inputs: ['draggable', 'containment'],
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

  constructor(ElementRef, Renderer2) {
    this.elementRef = ElementRef;
    this.renderer = Renderer2;
    this.isDraggable = true;
    this.isMoving = false;
    this.origPos = null;
    this.oldPos = {x: 0, y: 0};
    this.tempPos = {x: 0, y: 0};
    this.oldIndex = '';
    this.oldPositionStyle = '';
    this.started = new EventEmitter();
    this.stopped = new EventEmitter();
  }

  set draggable(setting) {
    if (setting !== void 0 && setting !== null && setting !== '') {
      this.isDraggable = !!setting;
      this.oldPos = {x: 0, y: 0};

      this.element = this.elementRef.nativeElement;
      let element = this.handle ? this.handle : this.element;
      if (this.isDraggable) {
        this.renderer.addClass(element, 'draggable');
      } else {
        this.renderer.removeClass(element, 'draggable');
      }
    }
  }

  ngAfterViewInit() {
    if (this.isDraggable) {
      this.element = this.elementRef.nativeElement;
      let element = this.handle ? this.handle : this.element;
      this.renderer.addClass(element, 'draggable');
    }
  }

  moveTo(x, y) {
    if (this.origPos) {
      if (this.containment) {
        let rect = this.elementRef.nativeElement.getBoundingClientRect();
        let containmentRect = this.containment.getBoundingClientRect();

        if (x < containmentRect.x) {
          x = containmentRect.x;
        } else if (x + rect.width > containmentRect.x + containmentRect.width) {
          x = containmentRect.x + containmentRect.width - rect.width;
        }

        if (y < containmentRect.y) {
          y = containmentRect.y;
        } else if (y + rect.height > containmentRect.y + containmentRect.height) {
          y = containmentRect.y + containmentRect.height - rect.height;
        }
      }

      this.tempPos.x = x - this.origPos.x;
      this.tempPos.y = y - this.origPos.y;
      let value = `translate(${this.tempPos.x + this.oldPos.x}px, ${this.tempPos.y + this.oldPos.y}px)`;
      this.renderer.setStyle(this.element, 'transform', value);
    }
  }

  dragStart() {
    this.oldZIndex = window.getComputedStyle(this.element).getPropertyValue("z-index");
    this.element.style.cursor = "move";
    this.oldPositionStyle = window.getComputedStyle(this.element).getPropertyValue("position");

    let position = 'relative';

    if (this.oldPositionStyle && (this.oldPositionStyle === 'absolute' || this.oldPositionStyle === 'fixed' || this.oldPositionStyle === 'relative')) {
      position = this.oldPositionStyle;
    }

    this.renderer.setStyle(this.element, 'position', position);

    this.renderer.setStyle(this.element, 'z-index', '99999');

    if (!this.isMoving) {
      this.started.emit(this.element);
      this.isMoving = true;
    }
  }

  dragEnd() {
    if (this.oldZIndex) {
      this.renderer.setStyle(this.element, 'z-index', this.oldZIndex);
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
    window.getSelection().removeAllRanges();
    let rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.origPos = {x: rect.x, y: rect.y};
    this.diffClickPos = {x: event.clientX - rect.x, y: event.clientY - rect.y};
    this.dragStart();
  }

  onMouseUp() {
    this.dragEnd();
  }

  onMouseMove(event) {
    if (this.isMoving && this.isDraggable) {
      this.moveTo(event.clientX - this.diffClickPos.x, event.clientY - this.diffClickPos.y);
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
    draggableDirective.setDraggableHandle(ElementRef.nativeElement);
  }
}

draggableHandleDirective.parameters = [ElementRef, draggableDirective];
