import { Pipe, PipeTransform, Injector, ReflectiveInjector } from '@angular/core';

export default class DynamicPipe {
  static get annotations() {
    return [
      new Pipe({
        name: 'dynamic'
      })
    ];
  }
  constructor(injector) {
    this.injector = injector
  }

  transform(value, pipe) {
    // var injector = ReflectiveInjector.resolveAndCreate([pipe])
    console.log(this.injector.get(pipe))
    return pipe.transform
  }
}

DynamicPipe.parameters = [Injector]
