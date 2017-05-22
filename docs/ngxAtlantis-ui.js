(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "@angular/common"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@angular/core"), require("@angular/forms"), require("@angular/common")) : factory(root["@angular/core"], root["@angular/forms"], root["@angular/common"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_37__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var selectpickeroptionComponent = function () {
  function selectpickeroptionComponent(elementRef) {
    _classCallCheck(this, selectpickeroptionComponent);

    this.elementRef = elementRef;
  }

  _createClass(selectpickeroptionComponent, [{
    key: 'ngAfterViewInit',
    value: function ngAfterViewInit() {
      if (!this.value) {
        this.value = this.elementRef.nativeElement.innerText.trim();
      }
    }
  }], [{
    key: 'annotations',
    get: function get() {
      return [new _core.Component({
        selector: 'selectpicker-option',
        template: "<ng-content></ng-content>",
        inputs: ['value']
      })];
    }
  }]);

  return selectpickeroptionComponent;
}();

exports.default = selectpickeroptionComponent;


selectpickeroptionComponent.parameters = [_core.ElementRef];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var slidepickeroptionComponent = function () {
  function slidepickeroptionComponent(elementRef) {
    _classCallCheck(this, slidepickeroptionComponent);

    this.elementRef = elementRef;
  }

  _createClass(slidepickeroptionComponent, [{
    key: 'ngAfterViewInit',
    value: function ngAfterViewInit() {
      if (!this.value) {
        this.value = this.elementRef.nativeElement.innerText.trim();
      }
    }
  }], [{
    key: 'annotations',
    get: function get() {
      return [new _core.Component({
        selector: 'slidepicker-option',
        template: "<ng-content></ng-content>",
        inputs: ['value']
      })];
    }
  }]);

  return slidepickeroptionComponent;
}();

exports.default = slidepickeroptionComponent;


slidepickeroptionComponent.parameters = [_core.ElementRef];

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ngxAtlUiModule = undefined;

var _core = __webpack_require__(0);

var _common = __webpack_require__(37);

var _forms = __webpack_require__(1);

var _paginationComponent = __webpack_require__(32);

var _paginationComponent2 = _interopRequireDefault(_paginationComponent);

var _datepickerComponent = __webpack_require__(31);

var _datepickerComponent2 = _interopRequireDefault(_datepickerComponent);

var _datepickerRangeComponent = __webpack_require__(30);

var _datepickerRangeComponent2 = _interopRequireDefault(_datepickerRangeComponent);

var _selectpickerComponent = __webpack_require__(33);

var _selectpickerComponent2 = _interopRequireDefault(_selectpickerComponent);

var _atlmodelDirective = __webpack_require__(29);

var _atlmodelDirective2 = _interopRequireDefault(_atlmodelDirective);

var _selectpickerOptionComponent = __webpack_require__(2);

var _selectpickerOptionComponent2 = _interopRequireDefault(_selectpickerOptionComponent);

var _slidepickerComponent = __webpack_require__(34);

var _slidepickerComponent2 = _interopRequireDefault(_slidepickerComponent);

var _slidepickerOptionComponent = __webpack_require__(3);

var _slidepickerOptionComponent2 = _interopRequireDefault(_slidepickerOptionComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ngxAtlUiModule = exports.ngxAtlUiModule = function ngxAtlUiModule() {};

ngxAtlUiModule.annotations = [new _core.NgModule({
  imports: [_common.CommonModule, _forms.FormsModule],
  declarations: [_paginationComponent2.default, _datepickerComponent2.default, _datepickerRangeComponent2.default, _atlmodelDirective2.default, _selectpickerComponent2.default, _selectpickerOptionComponent2.default, _slidepickerComponent2.default, _slidepickerOptionComponent2.default],
  exports: [_paginationComponent2.default, _datepickerComponent2.default, _datepickerRangeComponent2.default, _atlmodelDirective2.default, _selectpickerComponent2.default, _selectpickerOptionComponent2.default, _slidepickerComponent2.default, _slidepickerOptionComponent2.default]
})];

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ngxAtlUiModule = undefined;

var _ngxAtlantisUiModule = __webpack_require__(25);

exports.ngxAtlUiModule = _ngxAtlantisUiModule.ngxAtlUiModule;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var atlModelDirective = function () {
  _createClass(atlModelDirective, null, [{
    key: 'annotations',
    get: function get() {
      return [new _core.Directive({
        selector: '[atlmodel]',
        inputs: ['atlmodel'],
        outputs: ['atlmodelChange']
      })];
    }
  }]);

  function atlModelDirective(elementRef) {
    _classCallCheck(this, atlModelDirective);

    this.atlmodelChange = new _core.EventEmitter();
    this.elementRef = elementRef;
  }

  _createClass(atlModelDirective, [{
    key: 'emitChange',
    value: function emitChange() {
      var changeEvent = document.createEvent('Event');
      changeEvent.initEvent('change', true, true);
      this.elementRef.nativeElement.dispatchEvent(changeEvent);
    }
  }, {
    key: 'ngAfterViewInit',
    value: function ngAfterViewInit() {
      var self = this;
      this.elementRef.nativeElement.addEventListener('change', function () {
        self.model = self.elementRef.nativeElement.checked;
        self.atlmodelChange.emit(self.model);
      }, true);
    }
  }, {
    key: 'atlmodel',
    get: function get() {
      return this.model;
    },
    set: function set(val) {
      this.model = val;
      if (this.model) {
        this.elementRef.nativeElement.checked = true;
      } else {
        this.elementRef.nativeElement.checked = false;
      }
      this.emitChange();
      this.atlmodelChange.emit(this.model);
    }
  }]);

  return atlModelDirective;
}();

exports.default = atlModelDirective;


atlModelDirective.parameters = [_core.ElementRef];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var datepickerrangeComponent = function () {
  function datepickerrangeComponent() {
    _classCallCheck(this, datepickerrangeComponent);

    this.startChange = new _core.EventEmitter();
    this.endChange = new _core.EventEmitter();
  }

  _createClass(datepickerrangeComponent, [{
    key: 'setStart',


    // event start change emit by the datepicker atlantis ui
    value: function setStart(event) {
      this.start = event.target.value;
      // emit change value on startChange
      this.startChange.emit(this.start);
    }

    // event end change emit by the datepicker atlantis ui

  }, {
    key: 'setEnd',
    value: function setEnd(event) {
      this.end = event.target.value;
      // emit change value on endChange
      this.endChange.emit(this.end);
    }
  }], [{
    key: 'annotations',
    get: function get() {
      return [new _core.Component({
        selector: 'datepicker-range',
        template: __webpack_require__(35),
        inputs: ['start', 'end'],
        outputs: ['startChange', 'endChange']
      })];
    }
  }]);

  return datepickerrangeComponent;
}();

exports.default = datepickerrangeComponent;


datepickerrangeComponent.parameters = [];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _forms = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var datepickerComponent = function () {
  function datepickerComponent(elementRef) {
    _classCallCheck(this, datepickerComponent);

    this.onModelTouched = function () {};
    this.onModelChange = function () {};
    this.val = '';
    this.elementRef = elementRef;
  }

  _createClass(datepickerComponent, [{
    key: 'writeValue',
    value: function writeValue(val) {
      if (val !== this.val) {
        this.val = val;
        this.onModelChange(val);
      }
    }
  }, {
    key: 'registerOnChange',
    value: function registerOnChange(fn) {
      this.onModelChange = fn;
    }
  }, {
    key: 'registerOnTouched',
    value: function registerOnTouched(fn) {
      this.onModelTouched = fn;
    }

    // event on change value

  }, {
    key: 'valueChange',
    value: function valueChange(event) {
      // change the value
      this.val = event.target.value;
      // emit the change
      this.onModelChange(this.val);
    }
  }, {
    key: 'value',
    get: function get() {
      return this.val;
    },
    set: function set(val) {
      if (val !== this.val) {
        this.val = val;
        this.onModelChange(val);
      }
    }
  }], [{
    key: 'annotations',
    get: function get() {
      return [new _core.Component({
        selector: 'datepicker',
        template: '<input  type="date" class="form-control" [ngModel]="val" (change)="valueChange($event)"/>',
        // necessary to use ngModel
        providers: [{
          provide: _forms.NG_VALUE_ACCESSOR,
          useExisting: (0, _core.forwardRef)(function () {
            return datepickerComponent;
          }),
          multi: true
        }]
      })];
    }
  }]);

  return datepickerComponent;
}();

exports.default = datepickerComponent;


datepickerComponent.parameters = [_core.ElementRef];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pagination = function () {
  _createClass(pagination, null, [{
    key: 'annotations',
    get: function get() {
      return [new _core.Component({
        selector: 'pagination',
        inputs: ['page', 'pages'],
        outputs: ['pagechange'],
        template: '\n        <ul class="pagination">\n          <li (click)="previousPage($event)" [class.disabled]="page === 1">\n            <a href="#">\n              <i class="icon icon-previous"></i>\n            </a>\n          </li>\n          <li [class.active]="pageSh === page" *ngFor="let pageSh of pageShow; let i = index" (click)="changePage($event, pageSh)">\n            <a href="#">\n              {{pageSh}}\n            </a>\n          </li>\n          <li *ngIf="page <= pages - (numberPageShowPrevious+1) && pages > numberPageShow">\n            <a *ngIf="!changingPage" href="#" (click)="choosePage($event, null)">\n              ...\n            </a>\n            <input [(ngModel)]="pageChoose" *ngIf="changingPage" type="number" [value]="page" (blur)="choosePage($event ,pageChoose)" (keyup.enter)="choosePage($event ,pageChoose)"/>\n          </li>\n          <li *ngIf="page <= pages - numberPageShowPrevious && pages > numberPageShow" (click)="changePage($event, pages)">\n            <a href="#">\n              {{pages}}\n            </a>\n          </li>\n          <li (click)="nextPage($event)" [class.disabled]="page === pages">\n            <a href="#">\n              <i class="icon icon-next"></i>\n            </a>\n          </li>\n        </ul>'
      })];
    }

    //Initialize numberPageShow, after and previous for calculate how many page we want after and previous actual page

  }]);

  function pagination() {
    _classCallCheck(this, pagination);

    this.numberPageShow = 5;
    this.numberPageShowAfter = Math.floor(this.numberPageShow / 2);
    this.numberPageShowPrevious = Math.ceil(this.numberPageShow / 2);
    this.changingPage = false;
    this.pagechange = new _core.EventEmitter();
  }

  //initialize local variable with @Input


  _createClass(pagination, [{
    key: 'ngOnChanges',
    value: function ngOnChanges() {
      this.pageChoose = this.page;
      this.pageCount = this.createArray(this.pages);
      //verify if number of page total is inferior to numberpageShow and if true show all pages
      if (this.pages <= this.numberPageShow) {
        this.pageShow = this.pageCount;
      } else {
        //verify is current page is before numberPageShow previous and show x first page
        if (this.page <= this.numberPageShowPrevious) {
          this.pageShow = this.pageCount.slice(0, this.numberPageShow);
          //verify is current page is after numberPageShow after and show x last page
        } else if (this.page >= this.pages - this.numberPageShowAfter) {
          this.pageShow = this.pageCount.slice(this.pages - this.numberPageShow, this.pages);
          //other it's show x-numberPageShow/2 to x+numberPageshow/2 page
        } else {
          this.pageShow = this.pageCount.slice(this.page - this.numberPageShowPrevious, this.page + this.numberPageShowAfter);
        }
      }
    }

    //create an array with 1,2,3 ... n

  }, {
    key: 'createArray',
    value: function createArray(number) {
      var pages = new Array(number);
      for (var i = 0; i < number; i++) {
        pages[i] = i + 1;
      }
      return pages;
    }

    //Send event to function pass in output with page we want

  }, {
    key: 'changePage',
    value: function changePage(e, index) {
      e.preventDefault();
      if (!this.changingPage) {
        if (index > this.pages) {
          index = this.pages;
        } else if (index < 1) {
          index = 1;
        }
        if (index != this.page) {
          this.pagechange.emit(index);
        }
      }
    }

    //show 5 previous page when click on previous arrow

  }, {
    key: 'previousPage',
    value: function previousPage(e) {
      e.preventDefault();
      if (!this.changingPage) {
        if (this.page > 1) {
          this.changePage(e, this.page - this.numberPageShow);
        }
      }
    }

    //show 5 next page when click on next arrow

  }, {
    key: 'nextPage',
    value: function nextPage(e) {
      e.preventDefault();
      if (!this.changingPage) {
        if (this.page < this.pages) {
          this.changePage(e, this.page + this.numberPageShow);
        }
      }
    }

    //change button ... to input for choose page we want

  }, {
    key: 'choosePage',
    value: function choosePage(e, pageChoose) {
      e.preventDefault();
      this.changingPage = !this.changingPage;
      if (pageChoose != null) {
        if (pageChoose === 0) {
          pageChoose = 1;
        }
        this.changePage(e, +pageChoose);
      }
    }
  }]);

  return pagination;
}();

exports.default = pagination;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _forms = __webpack_require__(1);

var _selectpickerOption = __webpack_require__(2);

var _selectpickerOption2 = _interopRequireDefault(_selectpickerOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var selectpickerComponent = function () {
  function selectpickerComponent(changeDetectorRef) {
    _classCallCheck(this, selectpickerComponent);

    this.onModelTouched = function () {};
    this.onModelChange = function () {};
    this.cdr = changeDetectorRef;
    this.val = '';
  }

  _createClass(selectpickerComponent, [{
    key: 'writeValue',
    value: function writeValue(val) {
      if (val !== this.val) {
        this.val = val;
        this.updateOptions();
        this.onModelChange(val);
      }
    }
  }, {
    key: 'registerOnChange',
    value: function registerOnChange(fn) {
      this.onModelChange = fn;
    }
  }, {
    key: 'registerOnTouched',
    value: function registerOnTouched(fn) {
      this.onModelTouched = fn;
    }
  }, {
    key: 'ngAfterViewInit',
    value: function ngAfterViewInit() {
      this.updateOptions();
    }
  }, {
    key: 'updateOptions',
    value: function updateOptions() {
      if (!this.options) {
        return;
      }
      var self = this;
      if (this.multiple && Array.isArray(this.val)) {
        this.options.forEach(function (option) {
          if (self.val.indexOf(option.value) >= 0) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        });
      } else {
        this.options.forEach(function (option) {
          if (self.val === option.value) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        });
      }
      this.cdr.detectChanges();
    }
  }, {
    key: 'valueChange',
    value: function valueChange() {
      var self = this;
      var value = null;
      if (self.multiple) {
        value = [];
      }
      this.options.forEach(function (option) {
        if (option.selected) {
          if (self.multiple) {
            value.push(option.value);
          } else {
            value = option.value;
          }
        }
      });
      this.val = value;
      this.onModelChange(this.val);
    }
  }, {
    key: 'value',
    get: function get() {
      return this.val;
    },
    set: function set(val) {
      if (val !== this.val) {
        this.val = val;
        this.onModelChange(val);
      }
    }
  }], [{
    key: 'annotations',
    get: function get() {
      return [new _core.Component({
        selector: 'selectpicker',
        template: __webpack_require__(36),
        inputs: ['multiple'],
        queries: {
          options: new _core.ContentChildren(_selectpickerOption2.default)
        },
        providers: [{
          provide: _forms.NG_VALUE_ACCESSOR,
          useExisting: (0, _core.forwardRef)(function () {
            return selectpickerComponent;
          }),
          multi: true
        }]
      })];
    }
  }]);

  return selectpickerComponent;
}();

exports.default = selectpickerComponent;


selectpickerComponent.parameters = [_core.ChangeDetectorRef];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _forms = __webpack_require__(1);

var _slidepickerOption = __webpack_require__(3);

var _slidepickerOption2 = _interopRequireDefault(_slidepickerOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var slidepickercomponent = function () {
  function slidepickercomponent(changeDetectorRef, elementRef) {
    _classCallCheck(this, slidepickercomponent);

    this.val = '';
    this.onModelTouched = function () {};
    this.onModelChange = function () {};
    this.cdr = changeDetectorRef;
    this.index = 0;
    this.elementRef = elementRef;
  }

  _createClass(slidepickercomponent, [{
    key: 'writeValue',
    value: function writeValue(val) {
      var self = this;
      if (val !== this.val) {
        this.val = val;
        this.onModelChange(val);
        if (this.options) {

          //Transform from angular queries object (this.options) to flat array.
          var options = this.options.toArray();
          var isInOptions = false;
          options.forEach(function (element, index) {
            // Check index value.
            if (element.value === self.val) {
              isInOptions = true;
              self.index = index;
              self.updateHandlerPosition();
            }
          });
          if (!isInOptions) {
            self.index = 0;
            self.updateHandlerPosition();
          }
        }
      }
    }
  }, {
    key: 'registerOnChange',
    value: function registerOnChange(fn) {
      this.onModelChange = fn;
    }
  }, {
    key: 'registerOnTouched',
    value: function registerOnTouched(fn) {
      this.onModelTouched = fn;
    }

    // event slide value change emit by the slidepicker atlantis ui

  }, {
    key: 'setValue',
    value: function setValue(event) {
      var self = this;
      if (event.target.value !== "" && this.index !== event.target.value) {
        this.index = event.target.value;
        if (this.options) {
          this.val = this.options.toArray()[this.index].value;
          this.onModelChange(this.val);
        }
      }
    }

    // Send value to jquery to update curser position

  }, {
    key: 'updateHandlerPosition',
    value: function updateHandlerPosition() {
      var input = this.elementRef.nativeElement.getElementsByClassName("slidepicker-input");
      input[0].value = this.index;
      var inputChangeEvent = document.createEvent('Event');
      inputChangeEvent.initEvent('change', true, true);
      input[0].dispatchEvent(inputChangeEvent);
      this.cdr.detectChanges();
    }
  }, {
    key: 'value',
    get: function get() {
      return this.val;
    },
    set: function set(val) {
      if (val !== this.val) {
        this.val = val;
        this.onModelChange(val);
      }
    }
  }], [{
    key: 'annotations',
    get: function get() {
      return [new _core.Component({
        selector: 'slidepicker',
        template: '\n          <div class="slidepicker-track">\n            <span class="slidepicker-handle"></span>\n          </div>\n          <ul class="slidepicker-label">\n            <li *ngFor="let option of options">\n              <input type="hidden" [(ngModel)]="option.value"/>\n              <a [innerHTML]="option.elementRef.nativeElement.innerHTML"></a>\n            </li>\n          </ul>\n          <input type="hidden" class="slidepicker-input" [(ngModel)]="index" (change)="setValue($event)"/>',
        queries: {
          options: new _core.ContentChildren(_slidepickerOption2.default)
        },
        providers: [{
          provide: _forms.NG_VALUE_ACCESSOR,
          useExisting: (0, _core.forwardRef)(function () {
            return slidepickercomponent;
          }),
          multi: true
        }]
      })];
    }
  }]);

  return slidepickercomponent;
}();

exports.default = slidepickercomponent;


slidepickercomponent.parameters = [_core.ChangeDetectorRef, _core.ElementRef];

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "<div class=\"input-group\" id=\"rangeDatePicker\" class=\"input-group\"> <input class=\"form-control start\" [ngModel]=\"start\" (change)=\"setStart($event)\" type=\"date\"/> <span class=\"input-group-addon\"></span> <input class=\"form-control end\" [ngModel]=\"end\" (change)=\"setEnd($event)\" type=\"date\"/> </div> ";

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "<div class=\"select\" [attr.aria-multiple]=\"multiple\"> <input type=\"hidden\" class=\"select-value\" (change)=\"valueChange($event)\"/> <button class=\"btn btn-default select-toggle\" type=\"button\" data-toggle=\"select\"> <span class=\"select-text\"></span> <span class=\"caret\"></span> </button> <ul class=\"select-options\"> <li *ngFor=\"let option of options;\"> <input type=\"checkbox\" class=\"option-status sr-only\" [(atlmodel)]=\"option.selected\"/> <a [innerHTML]=\"option.elementRef.nativeElement.innerHTML\"></a> </li> </ul> </div> ";

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_37__;

/***/ })
/******/ ]);
});