export class modalService {
  constructor() {
    this.modalOpen = 0;
  }

  openModal() {
    this.modalOpen += 1;
  }

  closeModal() {
    this.modalOpen -= 1;
    if (this.modalOpen < 0) {
      this.modalOpen = 0;
    }
  }
}

export function modalServiceFactory() {
  return new modalService();
}
