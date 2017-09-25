export class dragAndDropAbstractComponent {
  constructor(ElementRef, ChangeDetectorRef, dragAndDropService) {
    this._element = ElementRef.nativeElement;
    this._element.style.cursor = "pointer";
    this._dragAndDropService = dragAndDropService;
    this.dropZones = [];
    this._cdr = ChangeDetectorRef;
    this.dropEnabled = false;

    this._element.onclick = (event) => {
      event.stopPropagation();
      console.log(this.dropZones);
    }

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
    console.log("abstract OnDragEnter");
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (this._isDropAllowed(event)) {
      this._onDragEnterCallback(event);
    }
  }

  _onDragOver(event) {
    console.log("abstract OnDragOver");
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
    console.log("abstract OnDragLeave");
    if (this._isDropAllowed(event)) {
      this._onDragLeaveCallback(event);
    }
  }

  _onDrop(event) {
    console.log("abstract OnDragDrop");
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
    this._cdr.detectChanges();
  }

  _isDropAllowed(event) {
    if ((this._dragAndDropService.isDragged || (event.dataTransfer && event.dataTransfer.files)) && this.dropEnabled) {
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
    console.log("abstract OnDragStart");
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (this._dragEnabled) {
      this._dragAndDropService.allowedDropZones = this.dropZones;
      this._onDragStartCallback(event);
    }
  }

  _onDragEnd(event) {
    console.log("abstract OnDragEnd");
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
