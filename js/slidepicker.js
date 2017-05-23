+ function($) {
  'use strict'


  var SlidePicker = function(element, options) {}

  SlidePicker.version = "0.0.1";

  SlidePicker.prototype.TrackDown = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $parent = $(e.target).parents(".slidepicker");

    //Position the handle where click are done
    MouseMove(e, $parent);

    $parent.addClass("focus");

    $("body").on("touchmove.slidepicker mousemove.slidepicker", $.proxy(MouseMove, $parent))
      .one("touchend.slidepicker touchcancel.slidepicker mouseup.slidepicker", $.proxy(MouseUp, $parent));
  }

  SlidePicker.prototype.HandleDown = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $parent = $(e.target).parents(".slidepicker");
    $(e.target).stop(true);
    $parent.addClass("focus");

    $("body").on("touchmove.slidepicker mousemove.slidepicker", $.proxy(MouseMove, $parent))
      .one("touchend.slidepicker touchcancel.slidepicker mouseup.slidepicker", $.proxy(MouseUp, $parent));
  }

  function MouseMove(e, $parent) {
    e.preventDefault();
    e.stopPropagation();

    $parent = $parent || this;
    var $track = $parent.find(".slidepicker-track");
    var vertical;
    var originalE = e.originalEvent,
      offset = $track.offset();

    var trackSize = {
      trackHeight: $track.innerHeight(),
      trackWidth: $track.innerWidth()
    };
    if ($parent.hasClass("slidepicker-vertical")) {
      vertical = true;
    } else {
      vertical = false;
    }

    if (vertical) {
      //save pageY or pageX of mouse and calculate perc with track size and mouse position
      var pageY = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageY : e.pageY;
      var perc = (pageY - offset.top) / trackSize.trackHeight;
    } else {
      var pageX = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageX : e.pageX;
      var perc = (pageX - offset.left) / trackSize.trackWidth;
    }

    positionperc(perc, $parent, vertical, $track, trackSize);
  }

  function MouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    this.removeClass("focus");
    var $track = this.find(".slidepicker-track");
    var countlabel = this.find(".slidepicker-label").find("li").length;
    var vertical, perc, handleAdjustment;
    var trackSize = {
      trackHeight: $track.innerHeight(),
      trackWidth: $track.innerWidth()
    };
    var originalE = e.originalEvent;
    var offset = $track.offset();
    var $label = this.find(".slidepicker-label li")[0];

    //calcul perc for retrieve label's index
    if (this.hasClass("slidepicker-vertical")) {
      vertical = true;
      var pageY = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageY : e.pageY;

      perc = (pageY - offset.top) / trackSize.trackHeight;
      var increment = trackSize.trackHeight / 1000;

      perc = (Math.round(perc * 1000) * increment) / trackSize.trackHeight;
      handleAdjustment = +$($label).css('padding-top').split("px")[0] + 5;
    } else {
      vertical = false;
      var pageX = (typeof originalE.targetTouches !== "undefined") ? originalE.targetTouches[0].pageX : e.pageX;

      perc = (pageX - offset.left) / trackSize.trackWidth;
      var increment = trackSize.trackWidth / 1000;

      perc = (Math.round(perc * 1000) * increment) / trackSize.trackWidth;
      handleAdjustment = +$($label).css('padding-left').split("px")[0] + $label.innerWidth() / 2;
    }

    if (perc < 0) {
      perc = 0;
    }
    if (perc > 1) {
      perc = 1;
    }

    $label = this.find(".slidepicker-label li");

    var offset = $track.offset(),
      numberLabel = Math.floor(perc * (countlabel));

    if (numberLabel >= countlabel) {
      numberLabel = countlabel - 1;
    }
    var label = $label[numberLabel];
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


  //Calculate real position in px for handle
  function positionReal(posLabel, $parent, vertical, handleAdjustment) {

    var $handle = $parent.find(".slidepicker-handle");
    var $input = $parent.find(".slidepicker-input");

    if (vertical) {
      $handle.stop(1, 0).animate({
        "top": posLabel + handleAdjustment + "px"
      }, 1000);
    } else {
      $handle.stop(1, 1).animate({
        "left": posLabel + handleAdjustment + "px"
      }, 500);
    }

    //Send event of input value to angular for correct binding
    if ($input[0]) {
      var slideChangeEvent = document.createEvent('Event');
      slideChangeEvent.initEvent('change', true, true);
      $input[0].dispatchEvent(slideChangeEvent);
    }

  }


  //calcul position with perc when we don't release handle
  function positionperc(perc, $parent, vertical, $track, trackSize) {

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

  SlidePicker.prototype.clickLabel = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $parent = $(e.target).parents(".slidepicker");
    var $handle = $parent.find(".slidepicker-handle");
    var $label = $(e.target).parent();
    var vertical;
    var handleAdjustment;
    if ($parent.hasClass("slidepicker-vertical")) {
      vertical = true;
      handleAdjustment = +$label.css('padding-top').split("px")[0] + 5;
    } else {
      vertical = false;
      handleAdjustment = +$label.css('padding-left').split("px")[0] + $label.innerWidth() / 2;
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

  SlidePicker.prototype.updateHandlerPosition = function(e) {
    var $parent = $(this).parent();
    var labelIndex = $(this).val();
    var label = $parent.find(".slidepicker-label li")[labelIndex];
    var $label = $(label);
    var $handle = $parent.find(".slidepicker-handle");
    var $input = $parent.find(".slidepicker-input");
    var posLabel = $label.position();
    var vertical, handleAdjustment;
    if ($parent.hasClass("slidepicker-vertical")) {
      vertical = true;
      handleAdjustment = +$label.css('padding-top').split("px")[0] + 5;
      posLabel = posLabel.top;
    } else {
      vertical = false;
      handleAdjustment = +$label.css('padding-left').split("px")[0] + $label.innerWidth() / 2;
      posLabel = posLabel.left;
    }
    changeActive($label, $parent);
    $handle.css((vertical) ? "top" : "left", (posLabel + handleAdjustment) + "px");

  }

  function changeActive(target, $parent) {
    var $label = $parent.find(".slidepicker-label");
    var $input = $parent.find(".slidepicker-input");
    $label.find("li").removeClass("active");
    $(target).addClass("active");
    var labelIndex = $label.find("li").index(target);
    $input.val(labelIndex);
  }

  $.fn.slidepicker = function(options) {

    this.each(function() {
      var el = $(this);
      if (el.data('slidepicker')) {
        el.data('slidepicker').remove();
      }
      el.data('slidepicker', new SlidePicker(el, options));
    });

    return this;
  }

  //link event with function
  $(document)
    .on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-track", $.proxy(SlidePicker.prototype.TrackDown, this))
    .on("touchstart.slidepicker mousedown.slidepicker", ".slidepicker-handle", $.proxy(SlidePicker.prototype.HandleDown, this))
    .on("touch.slidepicker click.slidepicker", ".slidepicker-label a", $.proxy(SlidePicker.prototype.clickLabel, this))
    .on("change.slidepicker", ".slidepicker-input", SlidePicker.prototype.updateHandlerPosition);

}(jQuery);
