export class modalService {
  constructor() {
    this.modals = [];
  }

  openModal(modal) {
    this.modals.push(modal);
    this.modals.forEach((modal, i) => {
      modal.elementRef.nativeElement.style.zIndex = 1050 + i;
    });
  }

  closeModal(modal) {
    var indexModal = -1;
    this.modals.forEach((modalOpen, index) => {
      if (modal === modalOpen) {
        indexModal = index;
      }
    });
    if (indexModal === -1) {
      return;
    }
    this.modals.splice(indexModal, 1);
  }
}

export function modalServiceFactory() {
  return new modalService();
}
