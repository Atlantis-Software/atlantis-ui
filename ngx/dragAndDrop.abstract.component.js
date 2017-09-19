export class dragAndDropAbstractComponent {
  constructor(ElementRef, ChangeDetectorRef, dragAndDropService) {
    this._element = ElementRef.nativeElement;
    this._element.style.cursor = "pointer";
    this._dragAndDropService = dragAndDropService;
    this.dropZones = [];
    this._cdr = ChangeDetectorRef;

    this._element.ondragenter = (event) => {
      this._onDragEnter(event);
    };

    this._element.ondragover = (event) => {
      this._onDragOver(event);

      if (event.dataTransfer != null) {
        event.dataTransfer.dropEffect = 'move';
      }

      return false;
    };

    this._element.ondragleave = (event) => {
      this._onDragLeave(event);
    };

    this._element.ondrop = (event) => {
      this._onDrop(event);
    };

    this._element.onmousedown = (event) => {
      this._target = event.target;
    };

    this._element.ondragstart = (event) => {
      if (this._dragHandle) {
        if (!this._dragHandle.contains(this._target)) {
          event.preventDefault();
          return;
        }
      }

      this._onDragStart(event);
      //
      if (event.dataTransfer != null) {
        event.dataTransfer.setData('text', '');
        // // Change drag cursor
        let cursorelem = (this._dragHandle) ? this._dragHandle : this._element;
        //
        if (this._dragEnabled) {
          cursorelem.style.cursor = this.effectCursor ? this.effectCursor : "move";
        } else {
          cursorelem.style.cursor = "auto";
        }
      }
    };

    this._element.ondragend = (event) => {
      this._onDragEnd(event);

      let cursorelem = (this._dragHandle) ? this._dragHandle : this._element;
      cursorelem.style.cursor = "pointer";
    };
  }

  setDragHandle(elem) {
    if (this._dragHandle) {
      return;
    }
    this._dragHandle = elem;
    this._element.style.cursor = "auto";
    this._dragHandle.style.cursor = "pointer";
  }

  set dragEnabled(enabled) {
    this._dragEnabled = !!enabled;
    this._element.draggable = this._dragEnabled;
  }

  get dragEnabled() {
    return this._dragEnabled;
  }

  _onDragEnter(event) {
    if (this._isDropAllowed(event)) {
      this._onDragEnterCallback(event);
    }
  }

  _onDragOver(event) {

    if (this._isDropAllowed(event)) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      this._onDragOverCallback(event);
    }
  }

  _onDragLeave(event) {
    if (this._isDropAllowed(event)) {
      this._onDragLeaveCallback(event);
    }
  }

  _onDrop(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    }

    if (this._isDropAllowed(event)) {
      this._onDropCallback(event);

      this.detectChanges();
    }
  }

  detectChanges() {
    // Programmatically run change detection to fix issue in Safari
    setTimeout(() => {
      this._cdr.detectChanges();
    }, 250);
  }

  _isDropAllowed(event) {
    if ((this._dragAndDropService.isDragged || (event.dataTransfer && event.dataTransfer.files)) && this.dropEnabled) {
      if (this.allowDrop) {
        return this.allowDrop(this._dragAndDropService.dragData);
      }
      if (this.dropZones.length === 0 && this._dragAndDropService.allowedDropZones.length === 0) {
        return true;
      }
    }
    return false;
  }

  _onDragStart(event) {
    if (this._dragEnabled) {
      this._onDragStartCallback(event);
    }
  }

  _onDragEnd(event) {
    this._onDragEndCallback(event);
  }

  _onDragEnterCallback() {}
  _onDragOverCallback() {}
  _onDragLeaveCallback() {}
  _onDropCallback() {}

  _onDragStartCallback() {}
  _onDragEndCallback() {}

}

export class dragAndDropAbstractHandleComponent {
  constructor(elementRef, dragAndDropService, dragAndDropAbstractComponent) {
    this._element = elementRef.nativeElement;
    dragAndDropAbstractComponent.setDragHandle(this._element);
  }
}
