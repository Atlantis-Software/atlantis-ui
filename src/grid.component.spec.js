import {
  getTestBed,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtlantisUiModule } from './atlantis-ui.module.js';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr-FR');
import localeES from '@angular/common/locales/es';
registerLocaleData(localeES, 'es-ES');
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe, 'de-DE');

var assert = require('assert');

var types = [
  {
    type: "date",
    alignment: "right",
    pipes: [DatePipe],
    optionsPipe: ['shortDate'],
    transformation: function(val) {
      if (moment(val, moment.ISO_8601).isValid()) {
        return moment(val).toString();
      } else {
        return "ERR: invalid value";
      }
    }
  },
  {
    type: 'number',
    transformation: function(val) {
      if (!isNaN(val)) {
        return val;
      } else {
        return "ERR: invalid value";
      }
    }
  },
  {
    type: 'boolean',
    transformation: function(val) {
      if (typeof val === void 0 || val === null) {
        return val;
      }
      if (!val || val == '0' || val == 'false') {
        return 0;
      }
      return 1;
    }
  },
];



class gridTestComponent {
  static get annotations() {
    return [
      new Component({
        template: `
        <atlui-grid id="grid" class="table table-bordered" [multiple]="true" [columns]= "columns" [rows]= "rows" (selectedRows)="selectionTest($event)" (onCellChange)="onModify($event)" [selected]="selection" (sort)="onSort($event)">

        </atlui-grid>
        <atlui-grid [headerFixed]="headerFixed" id="templateHeader" class="table table-bordered" [multiple]="true" [columns]= "columns" [rows]= "rows" (selectedRows)="selectionTest($event)" (onCellChange)="onModify($event)" [selected]="selection" (sort)="onSort($event)">
          <ng-template atlui-grid-cell-header let-columnName>
            <span style="color:red;">{{columnName | uppercase}}</span>
          </ng-template>
        </atlui-grid>`
      })
    ];
  }
  constructor() {
    this.headerFixed = false;

    this.columns = [
      {
        label: "test",
        alignment: "center"
      },
      {
        label: "testNumber",
        width: "150px",
        type: "number",
        isEditable: true,
        isSortable: true
      },
      {
        label: "testText",
        isEditable: true,
        isSortable: true
      },
      {
        label: "testDate",
        type: 'date',
        isEditable: true,
        isSortable: true
      },
      {
        label: "testBoolean",
        type: 'boolean',
        isEditable: true,
        isSortable: true
      },
      {
        label: "testDateMedium",
        type: 'date',
        isEditable: true,
        isSortable: true,
        format: 'mediumDate'
      },
      {
        label: "testDateFormat",
        type: 'date',
        isEditable: true,
        isSortable: true,
        format: 'yyyy-MM-dd'
      }
    ];

    this.originalRows = [
      {
        test: "1",
        testNumber: 2,
        testText: "1",
        testDate: new Date('04/27/2012'),
        testBoolean: 0,
        testDateMedium: new Date('04/27/2012'),
        testDateFormat: new Date('04/27/2012'),
        style: { 'background-color': 'red' }
      },
      {
        test: "2",
        testNumber: 6,
        testText: "5",
        testDate: new Date('01/01/1970'),
        testBoolean: 1,
        testDateMedium: new Date('01/01/1970'),
        testDateFormat: new Date('01/01/1970'),
        style: { 'color': 'green' }
      },
      {
        test: "3",
        testNumber: 5,
        testText: '4',
        testDate:  new Date('10/10/2012'),
        testBoolean: 1,
        testDateMedium: new Date('10/10/2012'),
        testDateFormat: new Date('10/10/2012')
      },
      {
        test: "4",
        testNumber: 42,
        testText: "8",
        testDate: new Date('05/09/2005'),
        testBoolean: 1,
        testDateMedium: new Date('05/09/2005'),
        testDateFormat: new Date('05/09/2005')
      },
      {
        test: "5",
        testNumber: 27,
        testText: "4",
        testDate: new Date('06/04/1999'),
        testBoolean: 0,
        testDateMedium: new Date('06/04/1999'),
        testDateFormat: new Date('06/04/1999')
      },
      {
        test: "6",
        testNumber: 3,
        testText: "7",
        testDate: new Date('07/03/2003'),
        testBoolean: 0,
        testDateMedium: new Date('07/03/2003'),
        testDateFormat: new Date('07/03/2003')
      },
      {
        test: "7",
        testNumber: 27,
        testText: "9",
        testDate: new Date('05/09/2005'),
        testBoolean: 0,
        testDateMedium: new Date('05/09/2005'),
        testDateFormat: new Date('05/09/2005')
      },
      {
        test: "8",
        testNumber: 152,
        testText: '32',
        testDate: new Date('10/02/2003'),
        testBoolean: 1,
        testDateMedium: new Date('10/02/2003'),
        testDateFormat: new Date('10/02/2003')
      }
    ];

    this.rows = [...this.originalRows];

    this.selection = [];

  }

  selectionTest(row) {
    this.selection = row;
  }

  onModify(cell) {
    this.index = cell.index;
    this.column = cell.column;
  }

  onSort(sorting) {
    if (!sorting.length) {
      return this.rows = [...this.originalRows];
    }
    this.loading = true;
    var columnToSort = sorting[sorting.length - 1];
    var sortingFunc = function() {};
    switch (columnToSort.type) {
      case 'text':
        sortingFunc = function(a, b) {
          return a[columnToSort.label].localeCompare(b[columnToSort.label]) * (columnToSort.order === 'desc' ? -1 : 1);
        };
        break;
      case 'boolean':
      case 'number':
        sortingFunc = function(a, b) {
          var comparison = a[columnToSort.label] > b[columnToSort.label];
          return columnToSort.order === 'desc' ? !comparison : comparison;
        };
        break;
      case 'date':
        sortingFunc = function(a, b) {
          var comparison = moment(a[columnToSort.label]).isAfter(moment(b[columnToSort.label]));
          return columnToSort.order === 'desc' ? !comparison : comparison;
        };
        break;
    }
    this.rows = this.rows.sort(sortingFunc);
    this.loading = false;
  }
}

const tb_base = {
  imports: [CommonModule, FormsModule, AtlantisUiModule.forRoot(types)],
  declarations: [gridTestComponent],
  providers: [DatePipe, UpperCasePipe, { provide: LOCALE_ID, useValue: 'fr-FR'}]
};

describe('grid', function() {

  var gridComponent;
  beforeEach(async(function() {
    TestBed.configureTestingModule(tb_base);
  }));

  afterEach(function() {
    getTestBed().resetTestingModule();
  });

  it('should render default value and available options', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);
    gridComponent = fixture.componentInstance;
    gridComponent.headerFixed = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var columns = document.querySelectorAll('#grid .gridHead');
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    assert.strictEqual(columns.length, 7);
    assert.strictEqual(rows[0].style.backgroundColor, "red");
    assert.strictEqual(rows[1].style.color, "green");

    Object.keys(columns).forEach(function(key,index) {

      assert.strictEqual(columns[key].querySelector('span').innerText, gridComponent.columns[index].label);
    });

    Object.keys(rows).forEach(function(key,indexRow) {
      var cells = rows[key].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText, moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });

    var gridCustomeHeader = document.querySelector('#templateHeader .gridRow .gridHead span');
    assert.strictEqual(gridCustomeHeader.style.color, "red");
    tick(1000);
    fixture.detectChanges();
  }));

  it('should render selected value when click on row', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    rows[0].click();
    tick();

    fixture.detectChanges();

    var selection = testComponent.selection;

    assert.strictEqual(selection.length, 1);
    assert.strictEqual(selection[0], testComponent.rows[0]);
  }));

  it('should render selected value, multiple selection with ctrl key', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    var click = new Event("click", { 'bubbles': true });
    click.ctrlKey = true;

    rows[0].dispatchEvent(click);
    tick();

    fixture.detectChanges();

    rows[1].dispatchEvent(click);
    tick();

    fixture.detectChanges();

    var selection = testComponent.selection;

    assert.strictEqual(selection.length, 2);
    assert.strictEqual(selection[0], testComponent.rows[0]);
    assert.strictEqual(selection[1], testComponent.rows[1]);
  }));

  it('should render selected value, toggle selection with ctrl key', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    var click = new Event("click", { 'bubbles': true });
    click.ctrlKey = true;

    rows[0].dispatchEvent(click);
    tick();
    fixture.detectChanges();

    rows[1].dispatchEvent(click);
    tick();
    fixture.detectChanges();

    rows[0].dispatchEvent(click);
    tick();
    fixture.detectChanges();

    var selection = testComponent.selection;

    assert.strictEqual(selection.length, 1);
    assert.strictEqual(selection[0], testComponent.rows[1]);

  }));

  it('should render selected value, multiple selection with shift key', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var testComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    rows[0].click();
    tick();
    fixture.detectChanges();

    var selection = testComponent.selection;

    assert.strictEqual(selection.length, 1);
    assert.strictEqual(selection[0], testComponent.rows[0]);

    var click = new Event("click", { 'bubbles': true });
    click.shiftKey = true;

    rows[2].dispatchEvent(click);
    tick();
    fixture.detectChanges();

    selection = testComponent.selection;

    assert.strictEqual(selection.length, 3);
    assert.strictEqual(selection[0], testComponent.rows[0]);
    assert.strictEqual(selection[1], testComponent.rows[1]);
    assert.strictEqual(selection[2], testComponent.rows[2]);
  }));

  it('should render sorted value, click on type number', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var columns = document.querySelectorAll('#grid .gridHead');
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    assert.strictEqual(columns.length, 7);


    Object.keys(columns).forEach(function(keyC,indexC) {
      assert.strictEqual(columns[keyC].querySelector('span').innerText, gridComponent.columns[indexC].label);
    });

    columns[1].click();
    tick();
    fixture.detectChanges();

    rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    Object.keys(rows).forEach(function(keyRow,indexRow) {
      var cells = rows[keyRow].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText, moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });

    columns[1].click();
    tick();
    fixture.detectChanges();

    rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    Object.keys(rows).forEach(function(keyRow,indexRow) {
      var cells = rows[keyRow].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText, moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });
  }));

  it('should render sorted value, click on type text', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var columns = document.querySelectorAll('#grid .gridHead');
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    assert.strictEqual(columns.length, 7);


    Object.keys(columns).forEach(function(key,indexColumn) {
      assert.strictEqual(columns[key].querySelector('span').innerText, gridComponent.columns[indexColumn].label);
    });

    columns[1].click();
    tick();
    fixture.detectChanges();

    rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    Object.keys(rows).forEach(function(keyRow,indexRow) {
      var cells = rows[keyRow].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText, moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });

    columns[1].click();
    tick();
    fixture.detectChanges();

    rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    Object.keys(rows).forEach(function(keyRow,indexRow) {
      var cells = rows[keyRow].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText, moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });
  }));

  it('should render sorted value, click on type date', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var columns = document.querySelectorAll('#grid .gridHead');
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    assert.strictEqual(columns.length, 7);

    Object.keys(columns).forEach(function(key,indexColumn) {
      assert.strictEqual(columns[key].querySelector('span').innerText, gridComponent.columns[indexColumn].label);
    });

    columns[1].click();
    tick();
    fixture.detectChanges();

    rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    Object.keys(rows).forEach(function(keyRow,indexRow) {
      var cells = rows[keyRow].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText, moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });

    columns[1].click();
    tick();
    fixture.detectChanges();

    rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    Object.keys(rows).forEach(function(keyRow,indexRow) {
      var cells = rows[keyRow].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText , moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });
  }));


  it('locale french :  should render default format type date', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
        assert.strictEqual('01/01/1970', cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));


  it('locale french : should render format mediumDate type date', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDateMedium') {
        assert.strictEqual('1 janv. 1970' , cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));

  it('locale french : should render format yyyy-MM-dd type date', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDateFormat') {
        assert.strictEqual('1970-01-01', cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));

  it('should render sorted value, click on type boolean', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var columns = document.querySelectorAll('#grid .gridHead');
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    assert.strictEqual(columns.length, 7);


    Object.keys(columns).forEach(function(key,indexColumn) {
      assert.strictEqual(columns[key].querySelector('span').innerText, gridComponent.columns[indexColumn].label);
    });

    columns[1].click();
    tick();
    fixture.detectChanges();

    rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    Object.keys(rows).forEach(function(keyRow,indexRow) {
      var cells = rows[keyRow].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText, moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });

    columns[1].click();
    tick();
    fixture.detectChanges();

    rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    Object.keys(rows).forEach(function(keyRow,indexRow) {
      var cells = rows[keyRow].querySelectorAll('.gridCell');
      Object.keys(cells).forEach(function(keyCell,indexCell) {
        if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
          assert.strictEqual(cells[keyCell].querySelector('atlui-grid-cell').innerText, moment(gridComponent.rows[indexRow][gridComponent.columns[indexCell].label]).format('L'));
          return;
        }
      });
    });
  }));

  it('should render correct value when we modify content, type number', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[0].querySelectorAll('.gridCell');

    var doubleClick = new Event("dblclick", { 'bubbles': true });
    doubleClick.shiftKey = true;

    cells[1].dispatchEvent(doubleClick);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelector('input');
    var oldValue = input.value;

    input.value = "test";
    input.dispatchEvent(
      new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'Enter' })
    );

    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    assert.equal(input.value, "test");

    var cancel = document.querySelector('.grid-label-error');
    cancel.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    assert.equal(input.value, oldValue);
    input.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();
    assert.equal(cells[1].querySelector('atlui-grid-cell').innerText, oldValue);

    cells[1].dispatchEvent(doubleClick);
    tick();
    fixture.detectChanges();
    input = document.querySelector('input');
    input.value = 123;
    //  allows to trigger onCellChange event
    input.dispatchEvent(
      new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'Enter' })
    );

    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    assert.equal(cells[1].querySelector('atlui-grid-cell').innerText, 123);
  }));

  it('should render correct value when we modify content, type text', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[0].querySelectorAll('.gridCell');

    var doubleClick = new Event("dblclick", { 'bubbles': true });
    doubleClick.shiftKey = true;

    cells[2].dispatchEvent(doubleClick);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelector('input');
    input.value = "test";
    // allows to trigger onCellChange event
    input.dispatchEvent(
      new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'Enter' })
    );
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    assert.equal(cells[2].querySelector('atlui-grid-cell').innerText, "test");

    cells[2].dispatchEvent(doubleClick);
    tick();
    fixture.detectChanges();
    input = document.querySelector('input');
    input.value = 123;
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    assert.equal(cells[2].querySelector('atlui-grid-cell').innerText, "123");
  }));

  it('should render correct value when we modify content, type date', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');

    var cells = rows[0].querySelectorAll('.gridCell');

    var doubleClick = new Event("dblclick", { 'bubbles': true });
    doubleClick.shiftKey = true;

    cells[3].dispatchEvent(doubleClick);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    var cancel = document.querySelector('.datepicker-label-remove');
    cancel.click();
    var input = document.querySelector('input');

    input.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();
    assert.equal(cells[3].querySelector('atlui-grid-cell').innerText, moment("2012-04-27").format('L'));


    cells[3].dispatchEvent(doubleClick);
    tick();
    fixture.detectChanges();
    input = document.querySelector('.datepicker-date-input').querySelector('input');
    input.click();
    tick();
    fixture.detectChanges();

    var firstAvailable = document.querySelector('.available');
    firstAvailable.click();

    tick();
    fixture.detectChanges();
    assert.strictEqual(cells[3].querySelector('atlui-grid-cell').innerText, moment("2012-04-01").format('L'));
  }));

  it('should render correct value when we modify content, type boolean', fakeAsync(() => {
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[0].querySelectorAll('.gridCell');

    var doubleClick = new Event("dblclick", { 'bubbles': true });
    doubleClick.shiftKey = true;

    cells[4].dispatchEvent(doubleClick);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    var input = document.querySelector('input');
    input.value = "test";
    // allows to trigger onCellChange event
    input.dispatchEvent(
      new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'Enter' })
    );
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    assert.equal(cells[4].querySelector('atlui-grid-cell').innerText, true);

    cells[4].dispatchEvent(doubleClick);
    tick();
    fixture.detectChanges();
    input = document.querySelector('input');
    input.value = "true";
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    assert.equal(cells[4].querySelector('atlui-grid-cell').innerText, true);

    cells[4].dispatchEvent(doubleClick);
    tick();
    fixture.detectChanges();
    input = document.querySelector('input');
    input.value = "";
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    assert.equal(cells[4].querySelector('atlui-grid-cell').innerText, false);

    cells[4].dispatchEvent(doubleClick);
    tick();
    fixture.detectChanges();
    input = document.querySelector('input');
    input.value = "0";
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    assert.equal(cells[4].querySelector('atlui-grid-cell').innerText, false);
  }));

  it('locale spanish :  should render default format type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'es-ES'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
        assert.strictEqual('1/1/70' , cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));


  it('locale spanish : should render format mediumDate type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'es-ES'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDateMedium') {
        assert.strictEqual('1 ene. 1970' , cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));

  it('locale spanish : should render format yyyy-MM-dd type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'es-ES'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDateFormat') {
        assert.strictEqual('1970-01-01' , cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));

  it('locale german :  should render default format type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'de-DE'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
        assert.strictEqual('01.01.70' , cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));


  it('locale german : should render format mediumDate type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'de-DE'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDateMedium') {
        assert.strictEqual('01.01.1970' , cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));

  it('locale german : should render format yyyy-MM-dd type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'de-DE'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDateFormat') {
        assert.strictEqual('1970-01-01', cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));

  it('locale english :  should render default format type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'en-US'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDate') {
        assert.strictEqual('1/1/70', cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));


  it('locale english : should render format mediumDate type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'en-US'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDateMedium') {
        assert.strictEqual('Jan 1, 1970', cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));

  it('locale english : should render format yyyy-MM-dd type date', fakeAsync(() => {
    TestBed.overrideProvider(LOCALE_ID, {useValue: 'en-US'});
    TestBed.compileComponents();
    var fixture = TestBed.createComponent(gridTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    gridComponent = fixture.componentInstance;
    var rows = document.querySelector('atlui-grid-body').querySelectorAll('.gridRow');
    var cells = rows[1].querySelectorAll('.gridCell');
    Object.keys(cells).forEach(function(keyCell,indexCell) {
      if (gridComponent.columns[indexCell].type === 'date' && gridComponent.columns[indexCell].label === 'testDateFormat') {
        assert.strictEqual('1970-01-01' , cells[keyCell].querySelector('atlui-grid-cell').innerText);
      }
    });
  }));
});
