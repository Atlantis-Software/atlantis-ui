import { DatePipe } from '@angular/common'

export class gridConfig {
  constructor() {
    this.types = [
      {
        type: "date",
        alignment: "right",
        pipe: DatePipe,
        optionsPipe : 'shortDate'
      }
    ]
  }
}

gridConfig.parameters= []
