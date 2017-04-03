(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "@angular/common"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@angular/core"), require("@angular/forms"), require("@angular/common")) : factory(root["@angular/core"], root["@angular/forms"], root["@angular/common"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_32__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
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
/* 3 */,
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ngxAtlUiModule = undefined;

var _core = __webpack_require__(0);

var _common = __webpack_require__(32);

var _forms = __webpack_require__(1);

var _paginationComponent = __webpack_require__(29);

var _paginationComponent2 = _interopRequireDefault(_paginationComponent);

var _datepickerComponent = __webpack_require__(28);

var _datepickerComponent2 = _interopRequireDefault(_datepickerComponent);

var _selectpickerComponent = __webpack_require__(30);

var _selectpickerComponent2 = _interopRequireDefault(_selectpickerComponent);

var _atlmodelDirective = __webpack_require__(27);

var _atlmodelDirective2 = _interopRequireDefault(_atlmodelDirective);

var _selectpickerOptionComponent = __webpack_require__(2);

var _selectpickerOptionComponent2 = _interopRequireDefault(_selectpickerOptionComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ngxAtlUiModule = exports.ngxAtlUiModule = function ngxAtlUiModule() {};

ngxAtlUiModule.annotations = [new _core.NgModule({
  imports: [_common.CommonModule, _forms.FormsModule],
  declarations: [_paginationComponent2.default, _datepickerComponent2.default, _atlmodelDirective2.default, _selectpickerComponent2.default, _selectpickerOptionComponent2.default],
  exports: [_paginationComponent2.default, _datepickerComponent2.default, _atlmodelDirective2.default, _selectpickerComponent2.default, _selectpickerOptionComponent2.default]
})];

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ngxAtlantisUiModule = __webpack_require__(23);

Object.defineProperty(exports, 'ngxAtlUiModule', {
  enumerable: true,
  get: function get() {
    return _ngxAtlantisUiModule.ngxAtlUiModule;
  }
});

/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _forms = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var datePickerComponent = function () {
  function datePickerComponent(elementRef) {
    _classCallCheck(this, datePickerComponent);

    this.onModelTouched = function () {};
    this.onModelChange = function () {};
    this.val = '';
    this.elementRef = elementRef;
  }

  _createClass(datePickerComponent, [{
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
  }, {
    key: 'valueChange',
    value: function valueChange(event) {
      this.val = event.target.value;
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
        inputs: ['val'],
        providers: [{
          provide: _forms.NG_VALUE_ACCESSOR,
          useExisting: (0, _core.forwardRef)(function () {
            return datePickerComponent;
          }),
          multi: true
        }]
      })];
    }
  }]);

  return datePickerComponent;
}();

exports.default = datePickerComponent;


datePickerComponent.parameters = [_core.ElementRef];

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
    value: function ngOnChanges(changes) {
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
      if (!this.changingPage) {
        e.preventDefault();
        if (this.page > 1) {
          this.changePage(e, this.page - this.numberPageShow);
        }
      }
    }

    //show 5 next page when click on next arrow

  }, {
    key: 'nextPage',
    value: function nextPage(e) {
      if (!this.changingPage) {
        e.preventDefault();
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
/* 30 */
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
  function selectpickerComponent() {
    _classCallCheck(this, selectpickerComponent);

    this.onModelTouched = function () {};
    this.onModelChange = function () {};
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
        template: __webpack_require__(31),
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


selectpickerComponent.parameters = [];

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "<div class=\"select\" [attr.aria-multiple]=\"multiple\"> <input type=\"hidden\" class=\"select-value\" (change)=\"valueChange($event)\"/> <button class=\"btn btn-default select-toggle\" type=\"button\" data-toggle=\"select\"> <span class=\"select-text\"></span> <span class=\"caret\"></span> </button> <ul class=\"select-options\"> <li *ngFor=\"let option of options;\"> <input type=\"checkbox\" class=\"option-status sr-only\" [(atlmodel)]=\"option.selected\"/> <a [innerHTML]=\"option.elementRef.nativeElement.innerHTML\"></a> </li> </ul> </div> ";

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ })
/******/ ]);
});