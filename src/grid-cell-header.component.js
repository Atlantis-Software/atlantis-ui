import {
  Component,
  Injector
} from '@angular/core';

export default class gridCellHeaderComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'atlui-grid-cell-header',
        template: `
        <ng-container *ngTemplateOutlet="headerTemplate?.templateRef; context:ctx"></ng-container>
        <span *ngIf="!headerTemplate?.templateRef">{{content}}</span>
        <span [class]="sortingClass"></span>`,
        inputs: ['content', 'pipes', 'sortingClass', 'headerTemplate']
      })
    ];
  }

  constructor(injector) {
    this.injector = injector;
    this.ctx = {};
  }
  //Use pipe if necessary in our content before show content
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

  ngAfterViewInit() {
    this.ctx = {$implicit: this.content};
  }

  ngOnChanges() {
    if (this.ctx) {
      this.ctx.$implicit = this.content;
    }
  }

}

gridCellHeaderComponent.parameters = [Injector];
