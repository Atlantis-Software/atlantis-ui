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

  constructor (elementRef) {
    this.elementRef = elementRef;
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
    this.handleClick = false;
  }

  writeValue(val) {
    if (this.labels) {
      if (val === undefined ) {
        val = this.labels.first.value;
      }
      if (val !== this.val) {
        var labelActive = this.labels.first;
        this.val = val;
        this.onModelChange(val);
        this.labels.forEach(function(label){
          if (val === label.value) {
            labelActive = label;
          }
        })
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
    this.lastNumberLabels = this.labels.length;

    var labelsChanges = this.labels.changes.subscribe(labels => {
      if (this.lastNumberLabels === 0 ) {
        setTimeout(()=>  {
          this.changeActive(labels.first);
        },0)
      }
      this.lastNumberLabels = labels.length;
    })

    this.slidepickerClassList = this.elementRef.nativeElement.classList;
    this.slidepicker = this.elementRef.nativeElement;

    if (this.slidepicker.classList.contains("slidepicker-vertical")) {
      this.vertical = true;
    } else {
      this.vertical = false;
    }
  }

  changeActive(labelActive) {
    var self = this;
    if (this.labels.length > 0) {
      if (this.labels.length === 1) {
        this.labels.first.isActive = true;
        this.val = this.labels.first.value;
      } else {

        var labels = this.labels.toArray();
        var index = labels.indexOf(labelActive);
        if (index !== -1){
          labelActive.isActive = true;
          this.labels.forEach(function(label) {
            if (label !== labelActive) {
              label.isActive = false;
            }
          })
          this.val = labelActive.value;
        }
        this.onModelChange(this.val);
      }


      this.labels.forEach(function(label){

        if(label.isActive){
          var labelDom = label.elementRef.nativeElement.getElementsByTagName("a")[0];
          var posLabel;
          if (self.vertical) {
            posLabel = labelDom.offsetTop;
            var handleAdjustment = labelDom.clientHeight/2;
          } else {
            posLabel = labelDom.offsetLeft;
            var handleAdjustment = labelDom.clientWidht/2;
          }
          var posReal = posLabel + handleAdjustment;
          self.positionReal(posReal)
        }
      })
    }

  }

  TrackDown(e) {
    e.preventDefault();
    e.stopPropagation();

    this.handleClick = true;
    this.mouseMove(e);
  }

  HandleDown(e) {
    e.preventDefault();
    e.stopPropagation();

    this.handleClick = true;
  }

  mouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.handleClick) {
      var track = this.slidepicker.getElementsByClassName("slidepicker-track")[0];
      var originalE = e.originalEvent;
      var trackHeight = track.offsetHeight;
      var trackWidth = track.offsetWidth;
      var offset = this.getPosition(track);
      if (this.vertical) {
        var pageY;
        if (originalE && typeof originalE.targetTouches !== "undefined") {
          pageY = originalE.targetTouches[0].pageY
        } else {
          pageY = e.pageY;
        }
        this.perc = (pageY - offset.top) / trackHeight;
      } else {
        var pageY;
        if (originelE && typeof originalE.targetTouches !== "undefined") {
          pageY = originalE.targetTouches[0].pageX
        } else {
          pageY = e.pageX;
        }
        this.perc = (pageX - offset.left) / trackWidth;
      }
      this.positionPerc();
    }
  }

  mouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    var track = this.slidepicker.getElementsByClassName("slidepicker-track")[0];

    var originalE = e.originalEvent;
    var countlabel = this.labels.length;
    var trackHeight = track.offsetHeight;
    var trackWidth = track.offsetWidth;

    var numberLabel = Math.floor(this.perc * (countlabel))

    if(numberLabel >= countlabel) {
      numberLabel = countlabel -1;
    }

    this.handleClick = false;
    var labels = this.labels.toArray();
    this.changeActive(labels[numberLabel]);
  }

  positionReal(position){
    var handle = this.slidepicker.getElementsByClassName("slidepicker-handle")[0];
    if (this.vertical) {
      handle.style.transform = "translateY("+position+"px)";
      handle.style.top = "";
    } else {
      handle.style.transform = "translateX("+position+"px)";
      handle.style.left = "";
    }
  }

  positionPerc() {
    var increment;
    var handle = this.slidepicker.getElementsByClassName("slidepicker-handle")[0];
    var track = this.slidepicker.getElementsByClassName("slidepicker-track")[0];
    var trackHeight = track.offsetHeight;
    var trackWidth = track.offsetWidth;

    if (this.vertical) {
      increment = trackHeight / 1000;
      this.perc = (Math.round(this.perc * 1000) * increment ) / trackHeight;
    } else {
      increment = trackWidth / 1000;
      this.perc = (Math.round(this.perc * 1000) * increment ) / trackWidth;
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
    while (element.offsetParent != undefined && element.offsetParent != null ) {
      left += element.offsetLeft + (element.clientLeft != null ? element.clientLeft : 0);
      top += element.offsetTop + (element.clientTop != null ? element.clientTop : 0);
      element = element.offsetParent;
    }
    return {"left": left, "top": top}
  }

}

slidepickerComponent.parameters = [ElementRef];

export class slidepickeroptionComponent {
	static get annotations() {
		return [
			new Component({
        selector: 'slidepicker-option',
        template: `
          <a (click)="clickLabel($event)">
            <ng-content></ng-content>
          </a>`,
        inputs: ['value'],
        styles : [
          ":host { display: list-item; }"
        ],
        host: {
          "[class.active]": "isActive"
        }
	  	})
		];
	}

  constructor (elementRef, slidepicker) {
    this.elementRef = elementRef;
    this.slidepicker = slidepicker;
    // this.slidepicker.addLabel(this);
    this.isActive = false;
  }

  ngOnDestroy() {
    var self = this;
    if (this.isActive) {
      var labels = this.slidepicker.labels.toArray()
      if (this === this.slidepicker.labels.first) {
        setTimeout(function(){
          self.slidepicker.changeActive(labels[1])
        },0)
      } else {
        setTimeout(function(){
          self.slidepicker.changeActive(self.slidepicker.labels.first);
        },0);
      }
    } else {
      this.slidepicker.labels.forEach(function(label){
        if (label.isActive) {
          setTimeout(function(){
            self.slidepicker.changeActive(label)
          }, 0)
        }
      })
    }
  }

  toggleActive(e) {
    if (typeof e === "event") {
      e.preventDefault();
    }
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.slidepicker.changeActive(this);
    }
  }

  clickLabel(e) {
    e.preventDefault();

    if (!this.isActive) {
      this.toggleActive(e)

      var label = e.target;
      var posLabel;
      if (this.slidepicker.vertical) {
        posLabel = label.offsetTop;
        var handleAdjustment = label.clientHeight/2;
      } else {
        posLabel = label.offsetLeft;
        var handleAdjustment = label.clientWidht/2;
      }
      var posReal = posLabel + handleAdjustment;
      this.slidepicker.positionReal(posReal)

    }
  }

  ngAfterViewInit() {
    if (!this.value) {
      this.value = this.elementRef.nativeElement.innerText.trim();
    }
    if (this.slidepicker.labels) {
      var self = this;
      this.slidepicker.labels.forEach(function(label){
        if (label.isActive) {
          self.slidepicker.changeActive(label)
        }
      })
    }
  }
}

slidepickeroptionComponent.parameters = [ElementRef, slidepickerComponent];
