import { EventEmitter } from '@angular/core';

// import { DragDropConfig } from './dnd.config';

export class dragAndDropData {
  constructor() {
    this.dragData;
    this.mouseEvent;
  }
}

export function dragDropServiceFactory() {
  return new dragAndDropService();
}

export class dragAndDropService {
  constructor() {
    this.allowedDropZones = [];
    this.onDragSuccessCallback = new EventEmitter();
    this.dragData;
    this.isDragged;
  }
}

export function dragDropSortableServiceFactory() {
  return new dragAndDropSortableService();
}

export class dragAndDropSortableService {
  constructor() {
    this.index;
    this.sortableContainer;
    this.isDragged;
    this._elem;
  }

  get elem() {
    return this._elem;
  }

  markSortable(elem) {
    if (this._elem) {
      this._elem.classList.remove(this._config.onSortableDragClass);
    }
    if (elem) {
      this._elem = elem;
      this._elem.classList.add(this._config.onSortableDragClass);
    }
  }
}
