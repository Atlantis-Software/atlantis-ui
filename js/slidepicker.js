+function($){
  'use strict'


  var SlidePicker = function(element, options) {
    var $element = element,
      $track = $element.find(".slidepicker-track"),
      $handle = $element.find(".slidepicker-handle"),
      $label = $element.find(".slidepicker-label");

    var countLabel = $label.find("li").length

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
      countlabel : countLabel,
      trackWidth : $track.outerWidth(),
      handleWidth: $handle.outerWidth()
    })

    if (this.data.vertical){
      this.data.trackHeight = this.data.$track.outerHeight()
      this.data.handleHeight = this.data.$handle.outerHeight()
      this.data.increment = this.data.trackHeight / 1000;
    } else {
      this.data.trackWidth = this.data.$track.outerWidth();
			this.data.handleWidth = this.data.$handle.outerWidth();
			this.data.increment = this.data.trackWidth / 1000;
    }
    $element.on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-track", $.proxy(this.TrackDown, this))
      .on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-handle", $.proxy(this.HandleDown, this))
      .on("touch.slidepicker click.slidepicker", ".slidepicker-label li", $.proxy(this.clickLabel, this));

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
      offset = this.data.$track.offset(),
      perc = 0;

    if (this.data.vertical) {
      var pageY = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageY : e.pageY;
			perc = (pageY - offset.top) / this.data.trackHeight;
    } else {
      var pageX = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageX : e.pageX;
			perc = (pageX - offset.left) / this.data.trackWidth;
    }

    this.position(perc);
  }

  SlidePicker.prototype.MouseUp = function(e){
    e.preventDefault();
    e.stopPropagation();
    this.data.$element.removeClass("focus");

    var originalE = e.originalEvent,
      offset = this.data.$track.offset(),
      perc = 0;
    if (this.data.vertical) {
      var pageY = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageY : e.pageY;
			perc = (pageY - offset.top) / this.data.trackHeight;
    } else {
      var pageX = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageX : e.pageX;
			perc = (pageX - offset.left) / this.data.trackWidth;
    }

    perc = 1 / (this.data.countlabel-1) * (Math.round(perc*(this.data.countlabel-1)));

    this.position(perc);

    $("body").off(".slidepicker");
  }

  SlidePicker.prototype.position = function(perc){
    if (this.data.increment > 1) {
			if (this.data.vertical) {
				perc = (Math.round(perc * 1000) * this.data.increment) / this.data.trackHeight;
			} else {
				perc = (Math.round(perc * 1000) * this.data.increment) / this.data.trackWidth;
			}
		}

		if (perc < 0) {
			perc = 0;
		}
		if (perc > 1) {
			perc = 1;
		}

    console.log(perc);

		this.data.$handle.css((this.data.vertical) ? "top" : "left", (perc * 100) + "%");

  }

  SlidePicker.prototype.clickLabel = function(e){
    e.preventDefault();
    e.stopPropagation();

    this.data.$label.find("li").removeClass("active");
    $(e.target).addClass("active");

    var perc = 0;

    if (this.data.vertical) {
			perc = 1 / (this.data.countlabel-1) *this.data.$label.children(".active").index() ;
    } else {
			perc = 1/(this.data.countlabel-1);
    }

    this.position(perc);
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
