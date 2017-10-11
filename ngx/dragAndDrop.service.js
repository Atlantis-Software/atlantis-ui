import { EventEmitter } from '@angular/core';

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
    this._element;
  }
}
