import { Component, ElementRef, Injector} from '@angular/core';
import { gridConfig } from './grid.config.js';

export default class gridComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'grid',
        template: `
				<grid-header class="gridHeader" [columns]="columns" [pipes]="pipes">
        </grid-header>
        <grid-body class="gridBody" [columns]="columns" [rows]="rows" [pipes]="pipes">
        </grid-body>
        <grid-footer class="gridFooter" *ngIf="config.footer !=='none'" [columns]="columns" [rows]="rows">
        </grid-footer>`,
        styles: [':host { display : table;}'],
        inputs: ['columns', 'rows', 'config']
	  	})
		];
	}

  constructor(elementRef, gridConfig, injector) {
		var self = this;
		this.injector = injector;
		this.pipes = [];
		this.types =  gridConfig;
		this.types.forEach(function(type, i) {
			if ( type.pipes) {
				if (Array.isArray(type.pipes) ) {
					self.pipes[i] = [];
					type.pipes.forEach(function(pipe, indexPipe) {
						var options = type.optionsPipe[indexPipe] || [];
						options = Array.isArray(options) ? options : options.split(':');
						self.pipes[i][indexPipe] = {
							pipe: pipe,
							option: options || []
						}
					})
					self.pipes[i].type = type.type
				} else {
					var options = type.optionsPipe[i] || [];
					options = Array.isArray(options) ? options : options.split(':');
					self.pipes[i] = {
						pipe: self.pipes[i],
						type: type.type,
						option: options
					}
				}
			}
		})
  }

  ngOnInit(){
		var self = this;
		// this.rows.forEach(function(row){
		// 	self.columns.forEach(function(column){
		// 		var index = -1;
		// 		self.types.forEach(function(type, i){
		// 			if (column.type === type.type) {
		// 				index = i;
		// 			}
		// 		})
		// 		if ( index !== -1) {
		// 			if( Array.isArray(self.pipes[index])) {
		// 				self.pipes[index].forEach(function( pipe, i) {
		// 					if (pipe !== null) {
		// 						if ( self.types[index].optionsPipe[i] ){
		// 							row[column.label] = self.pipes[index].transform( row[column.label], self.types[index].optionsPipe[i]);
		// 						} else {
		// 							row[column.label] = self.pipes[index].transform( row[column.label]);
		// 						}
		// 					}
		// 				})
		// 			} else {
		// 				if (self.pipes[index] !== null) {
		// 					row[column.label] = self.pipes[index].transform( row[column.label], self.types[index].optionsPipe);
		// 				}
		// 			}
		// 		}
		// 	})
		// })
		this.columns.forEach(function (column) {
			var indexHeader = -1;
			var indexType = -1;
			self.types.forEach(function(type, i) {
				// if (column.type === "header") {
				// 	indexHeader = i;
				// }
				if(column.type === type.type) {
					indexType = i;
				}
			})
			// if ( indexHeader !== -1 && self.pipes[indexHeader] !== null) {
			// 	column.label = self.pipes[indexHeader].transform( column.label, self.types[indexHeader].optionsPipe );
			// }

			// if ( indexHeader !== -1) {
			// 	if( Array.isArray(self.pipes[indexHeader])) {
			// 		self.pipes[indexHeader].forEach(function( pipe, i) {
			// 			if (pipe !== null) {
			// 				if ( self.types[indexHeader].optionsPipe[i] ){
			// 					row[column.label] = self.pipes[indexHeader].transform( row[column.label], self.types[indexHeader].optionsPipe[i]);
			// 				} else {
			// 					row[column.label] = self.pipes[indexHeader].transform( row[column.label]);
			// 				}
			// 			}
			// 		})
			// 	} else {
			// 		if (self.pipes[indexHeader] !== null) {
			// 			row[column.label] = self.pipes[indexHeader].transform( row[column.label], self.types[indexHeader].optionsPipe);
			// 		}
			// 	}
			// }

			if ( indexType !== -1 ) {
				column.class = column.class || self.types[indexType].class;
				column.alignment = column.alignment || self.types[indexType].alignment;
				column.width = column.width || "auto";
			}
		})

    this.config = {}
    this.config.footer = "none" || this.config.footer;
  }
}

gridComponent.parameters = [ElementRef, gridConfig, Injector];
