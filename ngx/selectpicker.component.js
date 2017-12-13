import { Component, ContentChildren, forwardRef, ChangeDetectorRef, IterableDiffers, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import selectpickeroptionComponent from './selectpicker-option.component';


export default class selectpickerComponent {
  constructor(changeDetectorRef, differs, elementRef) {
    this.elementRef = elementRef;
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.cdr = changeDetectorRef;
    this.isOpen = false;
    this.differ = differs.find([]).create(null);
    this.SelectedValuesText = "&nbsp;";
  }
  static get annotations() {
    return [
      new Component({
        selector: 'selectpicker',
        template: require('./selectpicker.html'),
        inputs: ['multiple'],
        queries: {
          options: new ContentChildren(selectpickeroptionComponent)
        },
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => selectpickerComponent),
          multi: true
        }],
        // need click outsite component
        host: {
          '(document:click)': 'handleClick($event)',
        }
      })
    ];

  }
  get value() {
    return this.val;
  }

  writeValue(val) {
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
      // iniliaze list with selected values
      this.updateOptions();
    }
  }

  updateOptions() {
    if (!this.options) {
      return;
    }
    var self = this;
    // select mutiple
    if (this.multiple && Array.isArray(this.val)) {
      this.SelectedValuesText = [];
      // update options according to thi.val value
      this.options.forEach(function(option) {
        var index = self.val.indexOf(option.value);
        if (index > -1) {
          option.selected = true;
          self.SelectedValuesText.push(option.text);
        } else {
          option.selected = false;
        }
      });
      // space html if empty array to avoid a small select
      if (this.val.length <= 0) {
        this.SelectedValuesText = "&nbsp;";
      }
    } else { // select simple
      this.SelectedValuesText = null;
      // update options according to this.val value
      this.options.forEach(function(option) {
        if (self.val === option.value) {
          option.selected = true;
          self.SelectedValuesText = option.text;
        } else {
          option.selected = false;
        }
      });
      // space html if empty array to avoid a small select
      if (!this.SelectedValuesText || this.SelectedValuesText == "") {
        if (this.options.first) {
          this.options.first.selected = true;
          this.SelectedValuesText = this.options.first.text;
          if (this.SelectedValuesText == "") {
            this.SelectedValuesText = "&nbsp;";
          }
        } else {
          this.SelectedValuesText = "&nbsp;";
        }
      }
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  Open() {
    this.isOpen = this.isOpen ? false : true;
  }

  // click outsite component to close select
  handleClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.isOpen = false;
    }
  }

  //That check for every selectpicker widget's change.
  ngDoCheck() {
    // if this.val change we must update options
    // only for the select multiple because detect change is not fired
    // we must create a new instance to have a detect change
    if (Array.isArray(this.val)) {
      var changes = this.differ.diff(this.val);
      if (changes) {
        this.updateOptions();
      }
    }
  }

  ngAfterViewInit() {
    // Run change detection explicitly after the option.text change by selectpickeroptionComponent
    // because ngAfterViewInit change binding but does not trigger a new round of change detection => error
    this.options.changes.subscribe(()=> {
      this.updateOptions();
    });
    this.cdr.detectChanges();
  }

  selectOption(option, event) {
    var self = this;
    // id select multiple
    if (this.multiple) {
      if (!this.val) {
        this.val = [];
      }
      if (!this.SelectedValuesText || this.val.length <= 0) {
        this.SelectedValuesText = [];
      }
      // delete all value not in the options
      var options = [];
      this.options.forEach(function(option) {
        options.push(option.value);
      });
      this.val.forEach(function(value) {
        var index = options.indexOf(value);
        if (index <= -1) {
          index = self.val.indexOf(value);
          self.val.splice(index, 1);
        }
      });
      // key press ctrl
      if (event.ctrlKey) {
        // option already selected , unselect value
        if (option.selected) {
          // delete value
          option.selected = false;
          if (Array.isArray(this.val)) {
            var index = this.val.indexOf(option.value);
            if (index > -1) {
              this.val.splice(index, 1);
            }
          }
          // delete value in list text
          if (Array.isArray(this.SelectedValuesText)) {
            var indexText = this.SelectedValuesText.indexOf(option.text);
            if (indexText > -1) {
              this.SelectedValuesText.splice(indexText, 1);
            }
          }
        } else { // option not selected , select value
          // add value
          index = options.indexOf(option.value);
          this.previousSelectedIndex = index;
          this.previousSelectedValue = option.value;
          option.selected = true;
          //selected value
          this.val.push(option.value);
          this.SelectedValuesText.push(option.text);
          this.ctrlKey = true;
        }
      } else if (event.shiftKey) { // if key press shift
        if (!option.selected) {
          var indexOption;
          var currentIndexVal;
          var currentIndexOption;
          var previousIndexVal;
          // if we have a previous value
          if (typeof this.previousSelectedIndex != "undefined" && this.previousSelectedIndex != null) {
            this.val = [];
            this.options.forEach(function(option4) {
              indexOption = options.indexOf(option4.value);
              currentIndexVal = self.val.indexOf(option.value);
              currentIndexOption = options.indexOf(option.value);
              // if current value is not selected, we select current value
              if (currentIndexVal <= -1) {
                self.val.push(option.value);
              }
              previousIndexVal = self.val.indexOf(self.previousSelectedValue);
              //if previous value is not selected , we select previous value
              if (previousIndexVal <= -1) {
                self.val.push(self.previousSelectedValue);
              }
              // we select value between previous Value and current value
              if (indexOption < currentIndexOption && indexOption > self.previousSelectedIndex) {
                var index = self.val.indexOf(option4.value);
                if (index <= -1) {
                  self.val.push(option4.value);
                }
              } else if (indexOption > currentIndexOption && indexOption < self.previousSelectedIndex) {
                index = self.val.indexOf(option4.value);
                if (index <= -1) {
                  self.val.push(option4.value);
                }
              }
            });
          }
        } else {
          this.options.forEach(function(option4) {
            var index = options.indexOf(option4.value);
            var currentIndex = options.indexOf(option.value);
            // if not key press ctrl delete all item below value selected
            // if key press ctrl before delete all item above value selected
            if (!self.ctrlKey && index > currentIndex || self.ctrlKey && index < currentIndex) {
              index = self.val.indexOf(option4.value);
              if (index > -1) {
                self.val.splice(index, 1);
              }
            }
          });
        }
      } else { // click on value
        index = options.indexOf(option.value);
        this.previousSelectedIndex = index;
        this.previousSelectedValue = option.value;
        option.selected = true;
        this.val = [];
        this.val.push(option.value);
        this.SelectedValuesText.push(option.text);
        this.ctrlKey = false;
      }
      // if array empty text have html space if not the select is small
      if (this.val.length <= 0) {
        this.SelectedValuesText = '&nbsp;';
      }
      // detection du changement de valeur de this.val
      this.onModelChange(this.val);

    } else { // select simple
      this.SelectedValuesText = null;
      // toutes les valeurs sont déselectionnées
      this.options.forEach(function(option) {
        option.selected = false;
      });
      // on selectionne la valeur selectionnée
      option.selected = true;
      this.val = option.value;
      // mise a jour du text
      if (option.text && option.text != "") {
        this.SelectedValuesText = option.text;
      } else {
        this.SelectedValuesText = "&nbsp;";
      }
      // on ferme la liste après avoir selectionné une valeur
      this.isOpen = false;
      // detection du changement de valeur de this.val
      this.onModelChange(self.val);
    }

  }
  // on hover item list the cursor is a pointer and indicates a link
  onHover($event) {
    this.cursor = $event.type == 'mouseover' ? 'pointer' : 'auto';
    event.preventDefault();
    event.stopPropagation();
  }

}

selectpickerComponent.parameters = [ChangeDetectorRef, IterableDiffers, ElementRef];
