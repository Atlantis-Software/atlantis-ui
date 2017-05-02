+function($){
  'use strict'


  var SlidePicker = function(element, options) {
    var $element = element,
      $track = $element.find(".slidepicker-track"),
      $handle = $element.find(".slidepicker-handle"),
      $label = $element.find(".slidepicker-label"),
      $input = $element.find(".slidepicker-input");

    var countLabel = $label.find("li").length;

    if ($element.hasClass("slidepicker-vertical")){
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

    var initialLabel = $(".slidepicker-label li")[0]
    var initialPos = $(initialLabel).position()

    if (this.data.vertical){
      this.data.trackHeight = this.data.$track.innerHeight();
      this.data.increment = this.data.trackHeight / 1000;
      initialPos = initialPos.top;
      this.data.handleAdjustment = +$(initialLabel).css('margin-top').split("px")[0] + 5;
    } else {
      this.data.trackWidth = this.data.$track.outerWidth();
			this.data.increment = this.data.trackWidth / 1000;
      initialPos = initialPos.left;
      this.data.handleAdjustment = +$(initialLabel).css('margin-left').split("px")[0] + 8;
    }


    this.data.$handle.css((this.data.vertical) ? "top" : "left", (initialPos + this.data.handleAdjustment) + "px");

    $element.on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-track", $.proxy(this.TrackDown, this))
      .on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-handle", $.proxy(this.HandleDown, this))
      .on("touch.slidepicker click.slidepicker", ".slidepicker-label li", $.proxy(this.clickLabel, this));
  }

  SlidePicker.version = "0.0.1";

  SlidePicker.prototype.TrackDown = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $parent = $(e.target).parents(".slidepicker");

    MouseMove(e, $parent);

    $parent.addClass("focus");

    $("body").on("touchmove.slidepicker mousemove.slidepicker", $.proxy(MouseMove, $parent))
      .one("touchend.slidepicker touchcancel.slidepicker mouseup.slidepicker",$.proxy(MouseUp, $parent));
  }

  SlidePicker.prototype.HandleDown = function(e) {
    e.preventDefault();
		e.stopPropagation();

    var $parent = $(e.target).parents(".slidepicker");

    $parent.addClass("focus");

    $("body").on("touchmove.slidepicker mousemove.slidepicker", $.proxy(MouseMove, $parent))
      .one("touchend.slidepicker touchcancel.slidepicker mouseup.slidepicker",$.proxy(MouseUp, $parent));
  }

  function MouseMove(e, $parent){
    e.preventDefault();
    e.stopPropagation();

    $parent = $parent || this
    var $track = $parent.find(".slidepicker-track");
    var vertical;
    var originalE = e.originalEvent,
      offset = $track.offset();

    var trackSize = {trackHeight : $track.innerHeight(), trackWidth : $track.innerWidth()}
    if ($parent.hasClass("slidepicker-vertical")) {
      vertical = true;
    } else {
      vertical = false;
    }

    if (vertical) {
      var pageY = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageY : e.pageY;
			var perc = (pageY - offset.top) / trackSize.trackHeight;
    } else {
      var pageX = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageX : e.pageX;
			var perc = (pageX - offset.left) / trackSize.trackWidth;
    }

    positionperc(perc, $parent, vertical, $track, trackSize);
  }

  function MouseUp(e){
    e.preventDefault();
    e.stopPropagation();

    this.removeClass("focus");
    var $track = this.find(".slidepicker-track");
    var countlabel = this.find(".slidepicker-label").find("li").length;
    var vertical, perc, handleAdjustment;
    var trackSize = {
      trackHeight : $track.innerHeight(),
      trackWidth : $track.innerWidth()
    };
    var originalE = e.originalEvent;
    var offset = $track.offset();
    var $label = this.find(".slidepicker-label li")[0];


    if (this.hasClass("slidepicker-vertical")) {
      vertical = true;
      var pageY = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageY : e.pageY;

			perc = (pageY - offset.top) / trackSize.trackHeight;
      var increment = trackSize.trackHeight / 1000;

      perc = (Math.round(perc * 1000) * increment) / trackSize.trackHeight;
      handleAdjustment = +$($label).css('margin-top').split("px")[0] + 5;
    } else {
      vertical = false;
      var pageX = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageX : e.pageX;

      perc = (pageX - offset.left) / trackSize.trackWidth;
      var increment = trackSize.trackWidth / 1000;

      perc = (Math.round(perc * 1000) * increment) / trackSize.trackWidth;
      handleAdjustment = +$($label).css('margin-left').split("px")[0] + 10;
    }

    $label = this.find(".slidepicker-label li");

    var offset = $track.offset(),
      numberLabel = Math.round(perc * (countlabel-1)),
      label = $label[numberLabel];

    changeActive(label, this);

    var posLabel = $(label).position();
    if (vertical) {
      posLabel = posLabel.top;
    } else {
      posLabel = posLabel.left;
    }

    positionReal(posLabel, this, vertical, handleAdjustment);

    $("body").off(".slidepicker");
  }

  function positionReal(posLabel, $parent, vertical, handleAdjustment) {

    var $handle = $parent.find(".slidepicker-handle");
    var $input = $parent.find(".slidepicker-input");
    if (vertical) {
      $handle.stop(1, 0)["animate"]({"top" : posLabel + handleAdjustment + "px"}, 1000);
    } else {
      $handle.stop(1, 1)["animate"]({"left" : posLabel + handleAdjustment + "px"}, 500);
    }
    if ($input[0]) {
      var slideChangeEvent = document.createEvent('Event');
      slideChangeEvent.initEvent('change', true, true);
      $input[0].dispatchEvent(slideChangeEvent);
    }

  }

  function positionperc(perc, $parent, vertical, $track, trackSize){

    var $handle = $parent.find(".slidepicker-handle");

    if (vertical) {
      var increment = trackSize.trackHeight / 1000;
      perc = (Math.round(perc * 1000) * increment) / trackSize.trackHeight;
    } else {
			var increment = trackSize.trackWidth / 1000;
      perc = (Math.round(perc * 1000) * increment) / trackSize.trackWidth;
    }


		if (perc < 0) {
	    perc = 0;
		}
		if (perc > 1) {
			perc = 1;
		}

		$handle.css((vertical) ? "top" : "left", (perc * 100) + "%");

  }

  SlidePicker.prototype.clickLabel = function(e){
    e.preventDefault();
    e.stopPropagation();

    var $parent = $(e.target).parents(".slidepicker");
    var $handle = $parent.find(".slidepicker-handle");
    var $label = $(e.target).parent();
    var vertical;
    var handleAdjustment;
    if ($parent.hasClass("slidepicker-vertical")) {
      vertical = true;
      handleAdjustment = +$label.css('margin-top').split("px")[0] + 5;
    } else {
      vertical = false;
      handleAdjustment = +$label.css('margin-left').split("px")[0] + $label.innerWidth()/2;
    }
    changeActive($label, $parent);

    var posLabel = $label.position();
    if (vertical) {
      posLabel = posLabel.top;
    } else {
      posLabel = posLabel.left;
    }

    positionReal(posLabel, $parent, vertical, handleAdjustment);
  }

  SlidePicker.prototype.updateHandlerPosition = function(e){
    var $parent = $(this).parent();
    var labelIndex = $(this).val()
    var label = $parent.find(".slidepicker-label li")[labelIndex];
    var $label = $(label)
    var $handle = $parent.find(".slidepicker-handle");
    var $input = $parent.find(".slidepicker-input");
    var posLabel = $label.position();
    var vertical, handleAdjustment;
    if ($parent.hasClass("slidepicker-vertical")){
      vertical = true;
      handleAdjustment = +$label.css('margin-top').split("px")[0] + 5;
      posLabel = posLabel.top;
    } else {
      vertical = false;
      handleAdjustment = +$label.css('margin-left').split("px")[0] + $label.innerWidth()/2;
      posLabel = posLabel.left;
    }
    $handle.css((vertical) ? "top" : "left", (posLabel + handleAdjustment) + "px");

  }

  function changeActive(target, $parent){
    var $label = $parent.find(".slidepicker-label");
    var $input = $parent.find(".slidepicker-input");
    $label.find("li").removeClass("active");
    $(target).addClass("active");
    var labelIndex = $label.find("li").index(target);
    $input.val(labelIndex);
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

  $(document)
    .on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-track", $.proxy(SlidePicker.prototype.TrackDown, this))
    .on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-handle", $.proxy(SlidePicker.prototype.HandleDown, this))
    .on("touch.slidepicker click.slidepicker", ".slidepicker-label a", $.proxy(SlidePicker.prototype.clickLabel, this))
    .on("change.slidepicker", ".slidepicker-input", SlidePicker.prototype.updateHandlerPosition);

}(jQuery);
