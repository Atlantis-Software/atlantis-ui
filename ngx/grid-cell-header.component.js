import { Component, ElementRef, Injector, EventEmitter} from '@angular/core';

export default class gridCellHeaderComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'grid-cell-header',
        template: `
				<span (click)="onSort()">{{content}}</span>
				<span [class]="sortingClass"></span>`,
        inputs: ['column','content', 'pipes', 'sorting'],
				outputs: ['sort']
	  	})
		];
	}

	set sorting(val){
		this._sorting = val;

		if (val && this.column) {
			if (val && val.column.label === this.column.label) {
				this.sortDir = val.sort.dir;
			}else {
				this.sortDir = "";
			}
		} else {
			this.sortDir = "";
		}

		if (this.sortDir === "desc") {
			this.sortingClass = "icon icon-sort-desc";
		} else if (this.sortDir === "asc") {
			this.sortingClass = "icon icon-sort-asc";
		} else {
			this.sortingClass = "";
		}
	}

	get sorting(){
		return this._sorting
	}

  constructor(elementRef, injector) {
		this.sort = new EventEmitter();
		this.injector = injector;
		this.sortType = "none";
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
			if( Array.isArray(this.pipes[index])) {
				this.pipes[index].forEach(function( pipeType) {
					pipeType.pipeInjected = self.injector.get(pipeType.pipe, null);
					if (pipeType.pipeInjected !== null) {
						var args = [self.content].concat(pipeType.option);
						self.content = pipeType.pipeInjected.transform.apply(self, args);
					}
				})
			} else {
				self.pipes[index].pipeInjected = self.injector.get(self.pipe[index], null);
				if (self.pipes[index].pipeInjected !== null) {
					var args = [self.content].concat(pipeType.option);
					self.content = pipeType.pipeInjected.transform.apply(self, args);
				}
			}
		}
  }

	onSort() {
		var sort = {label: this.column.label};
		if (this.sortDir === 'asc') {
			sort.dir = 'desc';
		} else {
			sort.dir = 'asc';
		}
		this.sort.emit({
			column: this.column,
			sort
		});
	}

}

gridCellHeaderComponent.parameters = [ElementRef, Injector];
