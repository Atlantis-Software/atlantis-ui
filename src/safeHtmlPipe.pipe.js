import { Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

export default class safeHtmlPipe {
  static get annotations() {
    return [
      new Pipe({
        name: 'safeHtml'
      })
    ];
  }
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }
  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
safeHtmlPipe.parameters = [DomSanitizer];
