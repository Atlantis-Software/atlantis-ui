import { Directive, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { dragAndDropAbstractComponent } from './dragAndDrop.abstract.component.js';

import { dragAndDropSortableService, dragAndDropService } from './dragAndDrop.service.js';

export class sortableContainer extends dragAndDropAbstractComponent {
  static get annotations() {
    return [
      new Directive({
        selector: '[sortable-container]',
        inputs: ['sortableData', 'draggable']
      })
    ];
  }
  constructor(elementRef, cdr, sortableDataService, dragAndDropService) {
    super(elementRef, cdr, dragAndDropService);
    this.dragEnabled = false;
    this._sortableDataService = sortableDataService;
  }

  set draggable(value) {
    this.dragEnabled = !!value;
  }

  set sortableData(sortableData) {
    this._sortableData = sortableData;
    this.dropEnabled = !!this._sortableData;
  }

  get sortableData() {
    return this._sortableData;
  }

  _onDragEnterCallback() {
    if (this._sortableDataService.isDragged) {
      let item = this._sortableDataService.sortableContainer._sortableData[this._sortableDataService.index];

      if (this._sortableData.indexOf(item) === -1) {
        this._sortableDataService.sortableContainer._sortableData.splice(this._sortableDataService.index, 1);
        if (this._sortableDataService.sortableContainer._sortableData.length === 0) {
          this._sortableDataService.sortableContainer.dropEnabled = true;
        }
        // Add item to new list
        this._sortableData.unshift(item);
        this._sortableDataService.sortableContainer = this;
        this._sortableDataService.index = 0;
      }
      this.detectChanges();
    }
  }

}

sortableContainer.parameters = [ElementRef, ChangeDetectorRef, dragAndDropSortableService, dragAndDropService];

export class sortableComponents extends dragAndDropAbstractComponent {
  static get annotations() {
    return [
      new Directive({
        selector: '[sortable]',
        inputs: ['index: sortableIndex', 'draggable', 'droppable', 'dragData'],
        outputs: ['onDragSuccessCallback', 'onDragStartCallback', 'onDragOverCallback', 'onDragEndCallback', 'onDropSuccessCallback']
      })
    ];
  }
  constructor(elementRef, cdr, sortableContainer, dragAndDropSortableService, dragAndDropService) {
    super(elementRef, cdr, dragAndDropService);
    this.dragEnabled = true;
    this.dropEnabled = true;
    this.onDragSuccessCallback = new EventEmitter();
    this.onDragStartCallback = new EventEmitter();
    this.onDragOverCallback = new EventEmitter();
    this.onDragEndCallback = new EventEmitter();
    this.onDropSuccessCallback = new EventEmitter();
    this._sortableContainer = sortableContainer;
    this._sortableDataService = dragAndDropSortableService;
    this._dragDropService = {};
  }

  _onDragStartCallback() {
    this._sortableDataService.isDragged = true;
    this._sortableDataService.sortableContainer = this._sortableContainer;
    this._sortableDataService.index = this.index;
    this._sortableDataService.markSortable(this._elem);
    // Add dragData
    this._dragDropService.isDragged = true;
    this._dragDropService.dragData = this.dragData;
    this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
    //
    this.onDragStartCallback.emit(this._dragDropService.dragData);
  }

  _onDragEnterCallback() {
    if (this._sortableDataService.isDragged) {
      this._sortableDataService.markSortable(this._elem);
      if ((this.index !== this._sortableDataService.index) ||
        (this._sortableDataService.sortableContainer.sortableData !== this._sortableContainer.sortableData)) {
        // Get item
        let item = this._sortableDataService.sortableContainer.sortableData[this._sortableDataService.index];
        // Remove item from previouse list
        this._sortableDataService.sortableContainer.sortableData.splice(this._sortableDataService.index, 1);
        if (this._sortableDataService.sortableContainer.sortableData.length === 0) {
          this._sortableDataService.sortableContainer.dropEnabled = true;
        }
        // Add item to new list
        this._sortableContainer.sortableData.splice(this.index, 0, item);
        if (this._sortableContainer.dropEnabled) {
          this._sortableContainer.dropEnabled = false;
        }
        this._sortableDataService.sortableContainer = this._sortableContainer;
        this._sortableDataService.index = this.index;
      }
    }
  }

  _onDragOverCallback() {
    if (this._sortableDataService.isDragged && this._elem !== this._sortableDataService.elem) {
      this._sortableDataService.sortableContainer = this._sortableContainer;
      this._sortableDataService.index = this.index;
      this._sortableDataService.markSortable(this._elem);
      this.onDragOverCallback.emit(this._dragDropService.dragData);
    }
  }

  _onDragEndCallback() {
    this._sortableDataService.isDragged = false;
    this._sortableDataService.sortableContainer = null;
    this._sortableDataService.index = null;
    this._sortableDataService.markSortable(null);
    // Add dragGata
    this._dragDropService.isDragged = false;
    this._dragDropService.dragData = null;
    this._dragDropService.onDragSuccessCallback = null;
    //
    this.onDragEndCallback.emit(this._dragDropService.dragData);
  }

  _onDropCallback() {
    if (this._sortableDataService.isDragged) {
      this.onDropSuccessCallback.emit(this._dragDropService.dragData);
      if (this._dragDropService.onDragSuccessCallback) {
        this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
      }
      this._sortableContainer.detectChanges();
    }
  }
}

sortableComponents.parameters = [ElementRef, ChangeDetectorRef, sortableContainer, dragAndDropSortableService, dragAndDropService];
