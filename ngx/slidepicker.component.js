import { Component, ElementRef, forwardRef, ContentChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export class slidepickerComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'slidepicker',
        template: `
        <div [hidden]="labels.length === 0" class="slidepicker-track" (mousedown)="TrackDown($event)" (mouseup)="mouseUp($event)" (mousemove)="mouseMove($event)">
          <span class="slidepicker-handle" (mousedown)="HandleDown($event)" (mouseup)="mouseUp($event)" (mousemove)="mouseMove($event)"></span>
        </div>
        <div class="slidepicker-label">
          <ng-content></ng-content>
        </div>`,
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => slidepickerComponent),
          multi: true
        }],
        queries: {
          labels: new ContentChildren(slidepickeroptionComponent)
        }
      })
    ];
  }

  constructor(elementRef) {
    this.elementRef = elementRef;
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.handleClick = false;
    this.oneActive = true;
  }

  //active correct value
  writeValue(val) {
    if (this.labels) {
      if (val === undefined) {
        val = this.labels.first.value;
      }
      if (val !== this.val) {
        var labelActive = this.labels.first;
        this.val = val;
        this.onModelChange(val);
        this.labels.forEach(function(label) {
          if (val === label.value) {
            labelActive = label;
          }
        });
        this.changeActive(labelActive);
      }
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }


  ngAfterViewInit() {
    //Subscribe to the changes of labels queries for know if the queries labels are empty or not and active one if we suppress the actual active
    this.labels.changes.subscribe(labels => {
      if (labels.length > 0) {
        var oneActive = false;
        labels.forEach((label) => {
          if (label.isActive) {
            oneActive = true;
            setTimeout(() => {
              this.changeActive(label);
            }, 0);
          }
        });
        if (oneActive) {
          return;
        } else {
          setTimeout(() => {
            this.changeActive(this.labels.first);
          }, 0);
        }
      }
    });

    this.slidepickerClassList = this.elementRef.nativeElement.classList;
    this.slidepicker = this.elementRef.nativeElement;

    if (this.slidepicker.classList.contains("slidepicker-vertical")) {
      this.vertical = true;
    } else {
      this.vertical = false;
    }
  }

  //change the labels active
  changeActive(labelActive) {
    var self = this;
    if (this.labels.length > 0) {
      if (this.labels.length === 1) {
        this.labels.first.isActive = true;
        this.val = this.labels.first.value;
      } else {

        var labels = this.labels.toArray();
        var index = labels.indexOf(labelActive);
        if (index !== -1) {
          labelActive.isActive = true;
          this.labels.forEach(function(label) {
            if (label !== labelActive) {
              label.isActive = false;
            }
          });
          this.val = labelActive.value;
        }
        this.onModelChange(this.val);
      }

      //Calculate the position of the label and send to this.positionReal
      this.labels.forEach(function(label) {

        if (label.isActive) {
          var labelDom = label.elementRef.nativeElement.getElementsByTagName("a")[0];
          var posLabel, handleAdjustment;
          if (self.vertical) {
            posLabel = labelDom.offsetTop;
            handleAdjustment = labelDom.clientHeight / 2;
          } else {
            posLabel = labelDom.offsetLeft;
            handleAdjustment = labelDom.clientWidht / 2;
          }
          var posReal = posLabel + handleAdjustment;
          self.positionReal(posReal);
        }
      });
    }

  }

  //callback for HTML Event on track
  TrackDown(e) {
    e.preventDefault();
    e.stopPropagation();

    this.handleClick = true;
    this.mouseMove(e);
  }

  //callback for HTML Event on Handle
  HandleDown(e) {
    e.preventDefault();
    e.stopPropagation();

    this.handleClick = true;
  }

  //Callback for HTML event when we move mouse
  mouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.handleClick) {
      //We collect position of mouse and send the data to positionPerc
      var track = this.slidepicker.getElementsByClassName("slidepicker-track")[0];
      var originalE = e.originalEvent;
      var trackHeight = track.offsetHeight;
      var trackWidth = track.offsetWidth;
      var offset = this.getPosition(track);
      var pageY, pageX;
      if (this.vertical) {
        if (originalE && typeof originalE.targetTouches !== "undefined") {
          pageY = originalE.targetTouches[0].pageY;
        } else {
          pageY = e.pageY;
        }
        this.perc = (pageY - offset.top) / trackHeight;
      } else {
        if (originalE && typeof originalE.targetTouches !== "undefined") {
          pageX = originalE.targetTouches[0].pageX;
        } else {
          pageX = e.pageX;
        }
        this.perc = (pageX - offset.left) / trackWidth;
      }
      this.positionPerc();
    }
  }

  //callback for mouse up event and that changes active label
  mouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    var countlabel = this.labels.length;
    var numberLabel = Math.floor(this.perc * (countlabel));

    if (numberLabel >= countlabel) {
      numberLabel = countlabel - 1;
    }

    this.handleClick = false;
    var labels = this.labels.toArray();
    this.changeActive(labels[numberLabel]);
  }

  //Calculate the real position of the handler
  positionReal(position) {
    var handle = this.slidepicker.getElementsByClassName("slidepicker-handle")[0];
    if (this.vertical) {
      handle.style.transform = "translateY(" + position + "px)";
      handle.style.top = "";
    } else {
      handle.style.transform = "translateX(" + position + "px)";
      handle.style.left = "";
    }
  }

  //calculate the position in percent to the top of the trackbar
  positionPerc() {
    var increment;
    var handle = this.slidepicker.getElementsByClassName("slidepicker-handle")[0];
    var track = this.slidepicker.getElementsByClassName("slidepicker-track")[0];
    var trackHeight = track.offsetHeight;
    var trackWidth = track.offsetWidth;

    if (this.vertical) {
      increment = trackHeight / 1000;
      this.perc = (Math.round(this.perc * 1000) * increment) / trackHeight;
    } else {
      increment = trackWidth / 1000;
      this.perc = (Math.round(this.perc * 1000) * increment) / trackWidth;
    }

    if (this.perc < 0) {
      this.perc = 0;
    }
    if (this.perc > 1) {
      this.perc = 1;
    }

    if (this.vertical) {
      handle.style.transform = "";
      handle.style.top = (this.perc * 100) + "%";
    } else {
      handle.style.transform = "";
      handle.style.left = (this.perc * 100) + "%";
    }

  }

  getPosition(element) {
    var left = 0;
    var top = 0;
    while (element.offsetParent != undefined && element.offsetParent != null) {
      left += element.offsetLeft + (element.clientLeft != null ? element.clientLeft : 0);
      top += element.offsetTop + (element.clientTop != null ? element.clientTop : 0);
      element = element.offsetParent;
    }
    return { "left": left, "top": top };
  }

}

slidepickerComponent.parameters = [ElementRef];

export class slidepickeroptionComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'slidepicker-option',
        template: `
          <a (click)="clickLabel($event)"><ng-content></ng-content></a>`,
        inputs: ['value'],
        styles: [
          ":host { display: list-item; }"
        ],
        host: {
          "[class.active]": "isActive"
        }
      })
    ];
  }

  constructor(elementRef, slidepicker) {
    this.elementRef = elementRef;
    this.slidepicker = slidepicker;
    this.isActive = false;
  }

  ngOnDestroy() {

  }

  toggleActive(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.slidepicker.changeActive(this);
    }
  }


  //Callback for click on label event
  //this call parent function
  clickLabel(e) {
    e.preventDefault();

    if (!this.isActive) {
      this.toggleActive(e);

      var label = e.target;
      var posLabel, handleAdjustment;
      if (this.slidepicker.vertical) {
        posLabel = label.offsetTop;
        handleAdjustment = label.clientHeight / 2;
      } else {
        posLabel = label.offsetLeft;
        handleAdjustment = label.clientWidht / 2;
      }
      var posReal = posLabel + handleAdjustment;
      this.slidepicker.positionReal(posReal);

    }
  }

  ngAfterViewInit() {
    if (!this.value) {
      this.value = this.elementRef.nativeElement.innerText.trim();
    }
    if (this.slidepicker.labels) {
      var self = this;
      this.slidepicker.labels.forEach(function(label) {
        if (label.isActive) {
          self.slidepicker.changeActive(label);
        }
      });
    }
  }
}

slidepickeroptionComponent.parameters = [ElementRef, slidepickerComponent];
