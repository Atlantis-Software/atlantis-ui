/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SELECT CLASS DEFINITION
  // =========================
  var backdrop = '.select-backdrop'
  var toggle   = '[data-toggle="select"]'

  var Select = function (element) {
    var self = this;
    var $element = $(element);
    $element.hide();

    var $options = $('<ul class="select-options"/>');

    this.$text = $('<span class="select-text">&nbsp;</span>');
    var $button = $('<button class="btn btn-default select-toggle" type="button" data-toggle="select"/>')
                  .append(this.$text) // default value button
                  .append('<span class="caret"></span>');

    var $select = $('<div class="select"></div>').append($button).append($options);

    if ($element.attr('multiple')) {
      $select.attr('aria-multiple', 'true');
    } else {
      var txt = $element.find(":selected").text();
      if (txt) {
        this.$text.text(txt);
      }
      $select.attr('aria-multiple', 'false');
    }

    // generate list with the options of the origin select
    $element.children('option').each(function() {
      var value = $(this).val();
      var text = $(this).text();
      var opt = $('<li><a href="#">' + text + '</a></li>');
      opt.attr('aria-option-value', value);
      $options.append(opt);
    });

    $select.insertAfter($element);   // insert select generated below origin
    $select.on('change.bs.select', function(e, value) {
      $element.val(value);
    });
  }

  Select.VERSION = '0.0.1';

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) {
        return;
      }
      // do not close select multiple select-options on click on option
      if (e && e.target && $(e.target).is('.select-options li a')) {
        e.preventDefault();
        e.stopPropagation();
        var li = $(e.target).parent();
        if ($parent.attr('aria-multiple') === 'true') {
          li.toggleClass('selected');
          updateText($parent);
          var values = [];
          $parent.find('.select-options li.selected').each(function() {
            values.push($(this).attr('aria-option-value'));
          });
          $parent.trigger($.Event('change.bs.select'), [values]);
          return;
        } else {
          li.parent().find('li').removeClass('selected');
          li.addClass('selected');
          updateText($parent);
          $parent.trigger($.Event('change.bs.select'), [li.attr('aria-option-value')]);
        }
      }
      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) {
        return;
      }

      $parent.trigger(e = $.Event('hide.bs.select', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger($.Event('hidden.bs.select', relatedTarget));
    })
  }
  // update value button by the seleted options
  function updateText($parent) {
    var text = $parent.find('.select-text');
    var selection = '';
    $parent.find('.select-options li.selected a').each(function() {
      if (selection !== '') {
        selection += ', ';
      }
      selection += $(this).text();
    });
    if (selection === '') {
      text.html('&nbsp;');
    } else {
      text.text(selection);
    }
  }

  Select.prototype.toggle = function (e) {
    var $this = $(this)
    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')
    clearMenus();
    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('select-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.select', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.select', relatedTarget))
    }

    return false
  }

  Select.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a';
    var $items = $parent.find('.select-options' + desc)

    if (!$items.length) return

    var index = $items.index(e.target);


    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // SELECT PLUGIN DEFINITION
  // ==========================

  function Plugin(option) { 
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('.selectpicker')
      if (!data) $this.data('.selectpicker', (data = new Select(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.selectpicker

  $.fn.selectpicker             = Plugin
  $.fn.selectpicker.Constructor = Select


  // SELECT NO CONFLICT
  // ====================

  $.fn.selectpicker.noConflict = function () {
    $.fn.selectpicker = old
    return this
  }


  // APPLY TO STANDARD SELECT ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.select.data-api', clearMenus)
    .on('click.bs.select.data-api', '.select form', function (e) { e.stopPropagation() })
    .on('click.bs.select.data-api', toggle, Select.prototype.toggle)
    .on('keydown.bs.select.data-api', toggle, Select.prototype.keydown)
    .on('keydown.bs.select.data-api', '.select-options', Select.prototype.keydown)

}(jQuery);
