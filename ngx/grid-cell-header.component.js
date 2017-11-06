import {
  Component,
  ElementRef,
  Injector
} from '@angular/core';

export default class gridCellHeaderComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'grid-cell-header',
        template: `
        <span>{{content}}</span>
        <span [class]="sortingClass"></span>`,
        inputs: ['content', 'pipes', 'sortingClass']
      })
    ];
  }

  constructor(elementRef, injector) {
    this.injector = injector;
  }

  ngOnInit() {
    var index = -1;
    var self = this;
    this.pipes.forEach(function(pipe, i) {
      if (pipe.type === self.type) {
        index = i;
      }
    });
    if (index !== -1) {
      if (Array.isArray(this.pipes[index])) {
        this.pipes[index].forEach(function(pipeType) {
          pipeType.pipeInjected = self.injector.get(pipeType.pipe, null);
          if (pipeType.pipeInjected !== null) {
            var args = [self.content].concat(pipeType.option);
            self.content = pipeType.pipeInjected.transform.apply(pipeType.pipeInjected, args);
          }
        });
      } else {
        self.pipes[index].pipeInjected = self.injector.get(self.pipe[index], null);
        if (self.pipes[index].pipeInjected !== null) {
          var args = [self.content].concat(self.pipes[index].option);
          self.content = self.pipes[index].pipeInjected.transform.apply(self.pipes[index].pipeInjected, args);
        }
      }
    }
  }

}

gridCellHeaderComponent.parameters = [ElementRef, Injector];
