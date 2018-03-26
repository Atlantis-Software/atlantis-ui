import { Directive, ElementRef, ChangeDetectorRef, EventEmitter, ContentChildren } from '@angular/core';
import { dragAndDropAbstractComponent, dragAndDropAbstractHandleComponent } from './dragAndDrop.abstract.component.js';

import { dragAndDropSortableService, dragAndDropService } from './dragAndDrop.service.js';

export class sortableContainer extends dragAndDropAbstractComponent {
  static get annotations() {
    return [
      new Directive({
        selector: '[atlui-sortable-container]',
        inputs: ['sortableData: atlui-sortable-container', 'draggable', 'dropzones'],
        queries: {
          sortableItems: new ContentChildren(sortableComponents)
        }
      })
    ];
  }

  constructor(elementRef, cdr, sortableDataService, dragAndDropService) {
    super(elementRef, cdr, dragAndDropService, true);
    this.dragEnabled = false;
    this.notSortable = false;
    this._sortableDataService = sortableDataService;
    this._sortableData = [];
    this.lastIndex = 0;
    this.dropEnabled = true;
  }

  //define the dropzones
  set dropzones(value) {
    if (value !== undefined) {
      this.dropZones = value;
    }
  }

  set draggable(value) {
    this.dragEnabled = !!value;
  }

  //define data into the container
  set sortableData(sortableData) {
    this._sortableData = sortableData;
    this.dropEnabled = !!this._sortableData;
  }

  get sortableData() {
    return this._sortableData;
  }

  //we change the element style when we can drop a items into container
  _onDragEnterCallback() {
    if (this._sortableDataService.isDragged) {
      this._element.classList.add('sortableOver');
    }
  }

  _onDragLeave() {
    this._element.classList.remove('sortableOver');
  }

  ngAfterViewInit() {
    this.sortableItems.changes.subscribe(()=> {
      this.resetIndex();
    });
  }

  //Add to the sortableData the items when we drop into a empty list
  _onDropCallback() {
    let item = this._sortableDataService.sortableContainer._sortableData[this._sortableDataService.index];
    if (this._sortableData.indexOf(item) === -1) {
      this._sortableDataService.sortableContainer._sortableData.splice(this._sortableDataService.index, 1);
      if (this._sortableDataService.sortableContainer._sortableData.length === 0) {
        this._sortableDataService.sortableContainer.dropEnabled = true;
      }
      this._sortableData.unshift(item);
      this._sortableDataService.sortableContainer = this;
      this._sortableDataService.index = 0;
    }
    this._element.classList.remove('sortableOver');
    this._element.style.border = this.oldBorder;
    this.detectChanges();
  }

  //Reset with correct index all the sortableItems
  resetIndex() {
    this.sortableItems.forEach((sortableItem, index) => {
      sortableItem.index = index;
    });
  }
}

sortableContainer.parameters = [ElementRef, ChangeDetectorRef, dragAndDropSortableService, dragAndDropService];

export class sortableComponents extends dragAndDropAbstractComponent {
  static get annotations() {
    return [
      new Directive({
        selector: '[atlui-sortable]',
        inputs: ['index: sortableIndex', 'droppable', 'dragData', 'dropzones', 'nested', 'draggable: atlui-sortable'],
        outputs: ['onDragSuccessCallback', 'onDragStartCallback', 'onDragOverCallback', 'onDragEndCallback', 'onDropSuccessCallback', 'onDragEnterCallback', 'onDragLeaveCallback']
      })
    ];
  }
  constructor(elementRef, cdr, sortableContainer, dragAndDropSortableService, dragAndDropService) {
    super(elementRef, cdr, dragAndDropService, false);
    this.notSortable = false;
    this.dragEnabled = true;
    this.dropEnabled = true;
    this.onDragSuccessCallback = new EventEmitter();
    this.onDragStartCallback = new EventEmitter();
    this.onDragOverCallback = new EventEmitter();
    this.onDragEndCallback = new EventEmitter();
    this.onDropSuccessCallback = new EventEmitter();
    this.onDragEnterCallback = new EventEmitter();
    this.onDragLeaveCallback = new EventEmitter();
    this._sortableContainer = sortableContainer;
    this._sortableDataService = dragAndDropSortableService;
    this.dropZones = this._sortableContainer.dropZones;
    this._dragDropService = {};
    this.index = this._sortableContainer.lastIndex;
    this._sortableContainer.lastIndex += 1;
  }

  //Define the dropzones
  set dropzones(value) {
    if (value !== undefined) {
      this.dropZones = value;
    }
  }

  set draggable(value) {
    if (value !== undefined && value !== "") {
      this.dragEnabled = !!value;
    }
  }

  set droppable(value) {
    this.dropEnabled = !!value;
  }

  //send data to service for future use and send a callback to the application
  _onDragStartCallback() {
    this._sortableDataService.isDragged = true;
    this._sortableDataService.sortableContainer = this._sortableContainer;
    this._sortableDataService.index = this.index;
    // Add dragData
    this._element.style.opacity = '0.4';
    this._dragDropService.isDragged = true;
    this._dragDropService.dragData = this.dragData;
    this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
    this.onDragStartCallback.emit(this._element);
  }

  //Add classes to the items where the items we sort is enter and remove on other
  _onDragEnterCallback() {
    var listDraggable = document.querySelectorAll('.sortableOver');
    listDraggable.forEach((itemDraggable) => {
      itemDraggable.classList.remove('sortableOver');
    });
    this._sortableDataService.newIndex = this.index;
    this._element.classList.add('sortableOver');
    this.onDragEnterCallback.emit(this._element);
  }

  _onDragLeave() {
    if (this.index === this._sortableDataService.newIndex) {
      return;
    }
    this._sortableDataService.oldIndex = this.index;
    this._element.classList.remove('sortableOver');
    this.onDragLeaveCallback.emit(this._element);
  }

  _onDragOverCallback(event) {
    if (event.dataTransfer !== null) {
      event.dataTransfer.dropEffect = "move";
    }
    this.onDragOverCallback.emit(this._dragDropService.dragData);
  }

  //That reset the style on the element that be sorted and reset data in service
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
    listDraggable.forEach((itemDraggable) => {
      itemDraggable.classList.remove('sortableOver');
    });
    this._element.style.opacity = '1';
    this.onDragEndCallback.emit(this._element);
  }

  //change index of the sorted item with the index of items where we drop
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
        selector: '[atlui-sortable-handle]'
      })
    ];
  }
  constructor(elementRef, dragAndDropService, sortableComponent, cdr) {
    super(elementRef, dragAndDropService, sortableComponent, cdr);
  }
}

sortableHandler.parameters = [ElementRef, dragAndDropService, sortableComponents, ChangeDetectorRef];
