export class dragAndDropAbstractComponent {
  constructor(ElementRef, ChangeDetectorRef, dragAndDropService, isContainer) {
    this._element = ElementRef.nativeElement;
    this._element.style.cursor = "move";
    this._dragAndDropService = dragAndDropService;
    this.dropZones = [];
    this._cdr = ChangeDetectorRef;
    this.dropEnabled = false;
    this._isContainer = isContainer;

    this._element.ondragenter = (event) => {
      if (this.notSortable) {
        return;
      }
      this._onDragEnter(event);
    };

    this._element.ondragover = (event) => {
      if (this.notSortable) {
        return;
      }
      this._onDragOver(event);

      if (event.dataTransfer != null) {
        event.dataTransfer.dropEffect = 'move';
      }

      return false;
    };

    this._element.ondragleave = (event) => {
      if (this.notSortable) {
        return;
      }
      this._onDragLeave(event);
    };

    this._element.ondrop = (event) => {
      if (this.notSortable) {
        return;
      }
      this._onDrop(event);
    };

    this._element.onmousedown = (event) => {
      if (this.notSortable) {
        return;
      }
      this._target = event.target;
    };

    this._element.onmouseover = () => {
      if (this.notSortable || this._isContainer) {
        this._element.style.cursor = "auto";
        return;
      }
      if (this._dragHandle) {
        return;
      }
      this._element.style.cursor = "move";
    };

    this._element.onmouseout = () => {
      if (this.notSortable) {
        return;
      }
      if (this._dragHandle) {
        return;
      }
      this._element.style.cursor = "auto";
    };

    this._element.ondragstart = (event) => {
      if (this.notSortable) {
        return;
      }
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

        event.dataTransfer.effectAllowed = 'move';
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
      if (this.notSortable) {
        return;
      }
      this._onDragEnd(event);

      let cursorelem = (this._dragHandle) ? this._dragHandle : this._element;
      cursorelem.style.cursor = "move";
    };
  }

  setDragHandle(elem) {
    if (this._dragHandle) {
      return;
    }
    this._dragHandle = elem;
    this._element.style.cursor = "auto";
    this._dragHandle.style.cursor = "move";
  }

  set dragEnabled(enabled) {
    if (this.notSortable || this.notSortable === undefined) {
      return;
    }
    this._dragEnabled = !!enabled;
    this._element.draggable = this._dragEnabled;
  }

  get dragEnabled() {
    return this._dragEnabled;
  }

  _onDragEnter(event) {
    // console.log("abstract OnDragEnter");
    if (event.stopPropagation  && this.nested) {
      event.stopPropagation();
    }
    if (this._isDropAllowed(event)) {
      this._onDragEnterCallback(event);
    }
  }

  _onDragOver(event) {
    // console.log("abstract OnDragOver");
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (this._isDropAllowed(event)) {
      this._onDragOverCallback(event);
    }
  }

  _onDragLeave(event) {
    // console.log("abstract OnDragLeave");
    if (this._isDropAllowed(event)) {
      this._onDragLeaveCallback(event);
    }
  }

  _onDrop(event) {
    // console.log("abstract OnDragDrop");
    if (event.preventDefault) {
      event.preventDefault();
    }

    if (event.stopPropagation && this.nested) {
      event.stopPropagation();
    }

    if (this._isDropAllowed(event)) {
      this._onDropCallback(event);

      this.detectChanges();
    }
  }

  detectChanges() {
    // Programmatically run change detection to fix issue in Safari
    this._cdr.detectChanges();
  }

  _isDropAllowed() {
    if (this._dragAndDropService.isDragged || this.dropEnabled) {
      if (this.allowDrop) {
        return this.allowDrop(this._dragAndDropService.dragData);
      }

      if (this.dropZones.length === 0 && this._dragAndDropService.allowedDropZones.length === 0) {
        return true;
      }
      for (let i = 0; i < this._dragAndDropService.allowedDropZones.length; i++) {
        let dragZone = this._dragAndDropService.allowedDropZones[i];
        if (this.dropZones.indexOf(dragZone) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  _onDragStart(event) {
    // console.log("abstract OnDragStart");
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (this._dragEnabled) {
      this._dragAndDropService.allowedDropZones = this.dropZones;
      this._onDragStartCallback(event);
    }
  }

  _onDragEnd(event) {
    // console.log("abstract OnDragEnd");
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    this._dragAndDropService.allowedDropZones = [];
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
