import {
  Component,
  ElementRef,
  Injector
} from '@angular/core';

export default class gridCellComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'grid-cell',
        template: `{{content}}`,
        inputs: ['content', 'type', 'pipes']
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
    })
    if (index !== -1) {
      if (Array.isArray(this.pipes[index])) {
        this.pipes[index].forEach(function(pipeType) {
          pipeType.pipeInjected = self.injector.get(pipeType.pipe, null);
          if (pipeType.pipeInjected !== null) {
            var args = [self.content].concat(pipeType.option);
            self.content = pipeType.pipeInjected.transform.apply(self, args);
          }
        })
      } else {
        self.pipes[index].pipeInjected = self.injector.get(self.pipe[index], null);
        if (self.pipes[index].pipeInjected !== null) {
          var args = [self.content].concat(self.pipes[index].option);
          self.content = self.pipes[index].pipeInjected.transform.apply(self, args);
        }
      }
    }
  }

}

gridCellComponent.parameters = [ElementRef, Injector];
