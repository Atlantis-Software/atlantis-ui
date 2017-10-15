export class dragAndDropAbstractComponent {
  constructor(ElementRef, ChangeDetectorRef, dragAndDropService, isContainer) {
    this._element = ElementRef.nativeElement;
		//Define the style per default for cursor
    this._element.style.cursor = "move";
		//Allow to send data between 2 sortable's items
    this._dragAndDropService = dragAndDropService;
		//Array of dropZones
    this.dropZones = [];
    this._cdr = ChangeDetectorRef;
    this.dropEnabled = false;
    this._isContainer = isContainer;
		//Define all function we launch on HTML Event
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
      //if the dataTransfer is not null we apply a effect and change cursor
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

	//if handle is present define the dragHandle and reapply style for cursor
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

	//function call when HTML events is fired
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

	//Verify if the drop is allowed on different element
  _isDropAllowed() {
    if (this._dragAndDropService.isDragged || this.dropEnabled) {
			//If we send a function to allowDrop we call this
      if (this.allowDrop) {
        return this.allowDrop(this._dragAndDropService.dragData);
      }
			//else we look for dropZones if we have not dropzone drop is allowed else we compare dropZone
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
