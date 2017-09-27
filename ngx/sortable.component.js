import { Directive, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { dragAndDropAbstractComponent, dragAndDropAbstractHandleComponent } from './dragAndDrop.abstract.component.js';

import { dragAndDropSortableService, dragAndDropService } from './dragAndDrop.service.js';

export class sortableContainer extends dragAndDropAbstractComponent {
  static get annotations() {
    return [
      new Directive({
        selector: '[sortable-container]',
        inputs: ['sortableData', 'draggable', 'dropzones', 'notSortable: sortable-container']
      })
    ];
  }

  constructor(elementRef, cdr, sortableDataService, dragAndDropService) {
    super(elementRef, cdr, dragAndDropService);
    this.dragEnabled = false;
    this.notSortable = false;
    this._sortableDataService = sortableDataService;
    this._sortableData = [];
  }

  set dropzones(value) {
    if (value !== undefined) {
      this.dropZones = value.split('.');
    }
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

  _onDropCallback() {
    if (this._sortableDataService.isDragged && this._sortableData.length === 0) {
      let item = this._sortableDataService.sortableContainer._sortableData[this._sortableDataService.index];
      // Check does element exist in sortableData of this Container
      if (this._sortableData.indexOf(item) === -1) {
        this._sortableDataService.sortableContainer._sortableData.splice(this._sortableDataService.index, 1);
        if (this._sortableDataService.sortableContainer._sortableData.length === 0) {
          this._sortableDataService.sortableContainer.dropEnabled = true;
        }
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
        inputs: ['index: sortableIndex', 'draggable', 'droppable', 'dragData', 'dropzones', 'nested', 'notSortable: sortable'],
        outputs: ['onDragSuccessCallback', 'onDragStartCallback', 'onDragOverCallback', 'onDragEndCallback', 'onDropSuccessCallback']
      })
    ];
  }
  constructor(elementRef, cdr, sortableContainer, dragAndDropSortableService, dragAndDropService) {
    super(elementRef, cdr, dragAndDropService);
    this.notSortable = false;
    this.dragEnabled = true;
    this.dropEnabled = true;
    this.onDragSuccessCallback = new EventEmitter();
    this.onDragStartCallback = new EventEmitter();
    this.onDragOverCallback = new EventEmitter();
    this.onDragEndCallback = new EventEmitter();
    this.onDropSuccessCallback = new EventEmitter();
    this._sortableContainer = sortableContainer;
    this._sortableDataService = dragAndDropSortableService;
    this.dropZones = this._sortableContainer.dropZones;
    this._dragDropService = {};
  }

  set dropzones(value) {
    if (value !== undefined) {
      this.dropZones = value.split('.');
    }
  }

  set draggable(value) {
    this.dragEnabled = !!value;
  }

  set droppable(value) {
    this.dropEnabled = !!value;
  }

  _onDragStartCallback() {
    this._sortableDataService.isDragged = true;
    this._sortableDataService.sortableContainer = this._sortableContainer;
    this._sortableDataService.index = this.index;
    // Add dragData
    this._element.style.opacity = '0.4';
    this._dragDropService.isDragged = true;
    this._dragDropService.dragData = this.dragData;
    this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
    this.onDragStartCallback.emit(this._dragDropService.dragData);
  }

  _onDragEnterCallback() {
    if (this.index !== this._sortableDataService.newIndex) {
      var listDraggable = document.querySelectorAll('.sortableOver');
      listDraggable.forEach((itemDraggable)=>{
        itemDraggable.classList.remove('sortableOver');
      });
    }
    this._sortableDataService.newIndex = this.index;
    this._element.classList.add('sortableOver');
  }

  _onDragLeave(){
    if (this.index === this._sortableDataService.newIndex) {
      return;
    }
    this._sortableDataService.oldIndex = this.index;
    this._element.classList.remove('sortableOver');
  }

  _onDragOverCallback(event) {
    event.dataTransfer.dropEffect = "move";
    this.onDragOverCallback.emit(this._dragDropService.dragData);
  }

  _onDragEndCallback() {
    this._sortableDataService.isDragged = false;
    this._sortableDataService.sortableContainer = null;
    this._sortableDataService.index = null;
    // Add dragGata
    this._dragDropService.isDragged = false;
    this._dragDropService.dragData = null;
    this._dragDropService.onDragSuccessCallback = null;
    //
    var listDraggable = document.querySelectorAll('.sortableOver');
    listDraggable.forEach((itemDraggable)=>{
      itemDraggable.classList.remove('sortableOver');
    });
    this._element.style.opacity = '1';
    this.onDragEndCallback.emit(this._dragDropService.dragData);
  }

  _onDropCallback() {
    if (this._sortableDataService.isDragged) {
      this.onDropSuccessCallback.emit(this._dragDropService.dragData);

      let item = this._sortableDataService.sortableContainer.sortableData[this._sortableDataService.index];

      this._sortableDataService.sortableContainer.sortableData.splice(this._sortableDataService.index, 1);
      if (this._sortableDataService.sortableContainer.sortableData.length === 0) {
        this._sortableDataService.sortableContainer.dropEnabled = true;
      }
      // Add item to new list
      this._sortableContainer.sortableData.splice(this._sortableDataService.newIndex, 0, item);
      if (this._sortableContainer.dropEnabled) {
        this._sortableContainer.dropEnabled = false;
      }
      this._sortableDataService.sortableContainer = this._sortableContainer;
      this._sortableDataService.index = this._sortableDataService.newIndex;
      if (this._dragDropService.onDragSuccessCallback) {
        this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
      }
      this._sortableContainer.detectChanges();
    }
  }
}

sortableComponents.parameters = [ElementRef, ChangeDetectorRef, sortableContainer, dragAndDropSortableService, dragAndDropService];

export class sortableHandler extends dragAndDropAbstractHandleComponent {
  static get annotations() {
    return [
      new Directive({
        selector: '[sortable-handle]'
      })
    ];
  }
  constructor(elementRef, dragAndDropService, sortableComponent, cdr) {
    super(elementRef, dragAndDropService, sortableComponent, cdr);
  }
}

sortableHandler.parameters = [ElementRef, dragAndDropService, sortableComponents, ChangeDetectorRef];
