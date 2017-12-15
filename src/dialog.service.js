export class dialogService {
  constructor() {
    this.dialogs = [];
    this.zindex = [];
  }

  addDialog(dialog) {
    this.dialogs.push(dialog);
    this.applyZIndex();
  }

  removeDialog(dialog) {
    if (this.dialogs.indexOf(dialog) > -1) {
      var index = this.dialogs.indexOf(dialog);
      this.dialogs.splice(index, 1);
      this.applyZIndex();
    }
  }

  focusDialog(dialog) {
    if (this.dialogs.indexOf(dialog) > -1) {
      var index = this.dialogs.indexOf(dialog);
      this.dialogs.splice(index, 1);
      this.dialogs.push(dialog);
      this.applyZIndex();
    }
  }

  applyZIndex() {
    this.dialogs.forEach((dialog, index)=> {
      var modalDialog = dialog.elementRef.nativeElement.querySelector('.modal-dialog');
      modalDialog.style.zIndex = ""+ (980 + index);
    });
  }
}

export function dialogServiceFactory() {
  return new dialogService();
}
