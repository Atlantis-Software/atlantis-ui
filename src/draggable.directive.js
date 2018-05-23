import { Directive, ElementRef, Renderer2, EventEmitter } from '@angular/core';

export class draggableDirective {
  static get annotations() {
    return [
      new Directive({
        selector: '[atlui-dragItem]',
        inputs: ['atlui-dragItem', 'containment: dragContainment', 'oldPosX: dragX', 'oldPosY: dragY'],
        outputs: ['started: dragStarted', 'stopped: dragStopped', 'dragXChange', 'dargYChange'],
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
    this.oldPosX = 0;
    this.oldPosY = 0;
    this.tempPos = {x: 0, y: 0};
    this.oldIndex = '';
    this.oldPositionStyle = '';
    this.started = new EventEmitter();
    this.stopped = new EventEmitter();
    this.dragXChange = new EventEmitter();
    this.dragYChange = new EventEmitter();
  }

  set ngDraggable(setting) {
    if (setting !== void 0 && setting !== null && setting !== '') {
      this.isDraggable = !!setting;
      this.oldPosX = 0;
      this.oldPosY = 0;

      this.element = this.elementRef.nativeElement;
    }
  }

  ngAfterViewInit() {
    if (this.isDraggable) {
      this.element = this.elementRef.nativeElement;
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
      var left = this.tempPos.x + this.oldPosX;
      var top = this.tempPos.y + this.oldPosY;
      if (this.oldPositionStyle === "fixed") {
        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
      }
      this.renderer.setStyle(this.element, 'top', top + "px");
      this.renderer.setStyle(this.element, 'left', left + "px");
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

    this.oldPosX = parseInt(window.getComputedStyle(this.element).getPropertyValue("left")) || 0;
    this.oldPosY = parseInt(window.getComputedStyle(this.element).getPropertyValue("top")) || 0;


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
      this.oldPosX += this.tempPos.x;
      this.oldPosY += this.tempPos.y;
      this.tempPos.x = this.tempPos.y = 0;
      this.renderer.removeClass(this.element, 'dragging');
      this.dragXChange.emit(this.oldPosX);
      this.dragYChange.emit(this.oldPosY);
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
    if (this.isMoving) {
      this.dragEnd();
    }
  }

  onMouseMove(event) {
    if (this.isMoving && this.isDraggable) {
      this.renderer.addClass(this.element, 'dragging');
      event.preventDefault();
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
        selector: '[atlui-dragItem-handle]'
      })
    ];
  }

  constructor(ElementRef, draggableDirective) {
    draggableDirective.setDraggableHandle(ElementRef.nativeElement);
  }
}

draggableHandleDirective.parameters = [ElementRef, draggableDirective];
