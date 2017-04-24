+function($){
  'use strict'


  var SlidePicker = function(element, options) {
    var $element = element,
      $track = $element.find(".slidepicker-track"),
      $handle = $element.find(".slidepicker-handle"),
      $label = $element.find(".slidepicker-label"),
      $input = $element.find(".slidepicker-input");

    var countLabel = $label.find("div").length;

    if ($element.hasClass("vertical")){
      options.vertical = true;
    } else {
      options.vertical = false;
    }

    this.data = $.extend({}, options, {
      $element : $element,
      $track: $track,
			$handle: $handle,
      $label : $label,
      $input : $input,
      countlabel : countLabel
    })

    var initialLabel = $(".slidepicker-label div")[0]
    var initialPos = $(initialLabel).position()

    if (this.data.vertical){
      this.data.trackHeight = this.data.$track.innerHeight();
      this.data.handleHeight = this.data.$handle.innerHeight();
      this.data.increment = this.data.trackHeight / 1000;
      initialPos = initialPos.top;
      this.data.handleAdjustment = +$(initialLabel).css('margin-top').split("px")[0] + 5;
    } else {
      this.data.trackWidth = this.data.$track.outerWidth();
			this.data.handleWidth = this.data.$handle.outerWidth();
			this.data.increment = this.data.trackWidth / 1000;
      initialPos = initialPos.left;
      this.data.handleAdjustment = +$(initialLabel).css('margin-left').split("px")[0] + 8;
    }


    this.data.$handle.css((this.data.vertical) ? "top" : "left", (initialPos + this.data.handleAdjustment) + "px");

    $element.on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-track", $.proxy(this.TrackDown, this))
      .on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-handle", $.proxy(this.HandleDown, this))
      .on("touch.slidepicker click.slidepicker", ".slidepicker-label div", $.proxy(this.clickLabel, this));

  }

  SlidePicker.prototype.TrackDown = function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.MouseMove(e);

    this.data.$element.addClass("focus");

    $("body").on("touchmove.slidepicker mousemove.slidepicker", $.proxy(this.MouseMove, this))
      .one("touchend.slidepicker touchcancel.slidepicker mouseup.slidepicker",$.proxy(this.MouseUp, this))
  }

  SlidePicker.prototype.HandleDown = function(e) {
    e.preventDefault();
		e.stopPropagation();

    this.data.$element.addClass("focus")

    $("body").on("touchmove.slidepicker mousemove.slidepicker", $.proxy(this.MouseMove, this))
      .one("touchend.slidepicker touchcancel.slidepicker mouseup.slidepicker",$.proxy(this.MouseUp, this))
  }

  SlidePicker.prototype.MouseMove = function(e){
    e.preventDefault();
    e.stopPropagation();

    var originalE = e.originalEvent,
      offset = this.data.$track.offset();

    if (this.data.vertical) {
      var pageY = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageY : e.pageY;
			this.perc = (pageY - offset.top) / this.data.trackHeight;
    } else {
      var pageX = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageX : e.pageX;
			this.perc = (pageX - offset.left) / this.data.trackWidth;
    }

    this.positionperc();
  }

  SlidePicker.prototype.MouseUp = function(e){
    e.preventDefault();
    e.stopPropagation();

    this.data.$element.removeClass("focus");

    var originalE = e.originalEvent,
      offset = this.data.$track.offset(),
      numberLabel = Math.round(this.perc * (this.data.countlabel-1)),
      label = $(".slidepicker-label div")[numberLabel];

    this.changeActive(label);

    var posLabel = $(label).position()
    if (this.data.vertical) {
      posLabel = posLabel.top;
    } else {
      posLabel = posLabel.left;
    }

    this.positionReal(posLabel);

    $("body").off(".slidepicker");
  }

  SlidePicker.prototype.positionReal = function(posLabel) {

    this.data.$handle.css((this.data.vertical) ? "top" : "left", (posLabel + this.data.handleAdjustment) + "px");
    if (this.data.$input[0]){
      var slideChangeEvent = document.createEvent('Event');
      slideChangeEvent.initEvent('change', true, true);
      this.data.$input[0].dispatchEvent(slideChangeEvent);
    }
  }

  SlidePicker.prototype.positionperc = function(){
    if (this.data.increment > 1) {
			if (this.data.vertical) {
				this.perc = (Math.round(this.perc * 1000) * this.data.increment) / this.data.trackHeight;
			} else {
				this.perc = (Math.round(this.perc * 1000) * this.data.increment) / this.data.trackWidth;
			}
		}

		if (this.perc < 0) {
			this.perc = 0;
		}
		if (this.perc > 1) {
			this.perc = 1;
		}


		this.data.$handle.css((this.data.vertical) ? "top" : "left", (this.perc * 100) + "%");

  }

  SlidePicker.prototype.clickLabel = function(e){
    e.preventDefault();
    e.stopPropagation();

    this.changeActive(e.target);

    var posLabel = $(e.target).position()
    if (this.data.vertical) {
      posLabel = posLabel.top;
    } else {
      posLabel = posLabel.left;
    }

    this.positionReal(posLabel);
  }

  SlidePicker.prototype.changeActive = function(target){

    this.data.$label.find("div").removeClass("active");
    $(target).addClass("active")
    this.data.$input.val($(target).text());

  }

  $.fn.slidepicker = function(options){

    this.each(function(){
      var el = $(this);
      if (el.data('slidepicker')) {
        el.data('slidepicker').remove();
      }
      el.data('slidepicker', new SlidePicker(el, options));
    });

    return this;
  }

}(jQuery);
