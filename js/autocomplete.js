/*
	jQuery autocomplete v1.0.7
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/jQuery-autoComplete
	License: http://www.opensource.org/licenses/mit-license.php
*/

+function($) {
  $.fn.autocomplete = function(options) {
    var opts = $.extend({}, $.fn.autocomplete.defaults, options);

    // public methods
    if (typeof options == 'string') {
      this.each(function(){
        var that = $(this).find('input');
        if (options == 'destroy') {
          $(window).off('resize.autocomplete-body', that.updateSC);
          that.off('blur.autocomplete-body focus.autocomplete-body keydown.autocomplete-body keyup.autocomplete-body');
          if (that.data('autocomplete')){
            that.attr('autocomplete', that.data('autocomplete'));
          } else {
            that.removeAttr('autocomplete');
          }
          $(that.data('sc')).remove();
          that.removeData('sc').removeData('autocomplete');
        }
      });
      return this;
    }

    return this.each(function() {
      var that = $(this).find('input.autocomplete-input');
      that.container = $(this);
      that.filter = that.container.find('.autocomplete-filter'); //Determine the filter for request to server
      that.body = $('<div class="autocomplete-body"></div>'); //dom for the body of autocomplete
      // sc = 'suggestions container'
      that.sc = $('<div class="autocomplete-suggestions ' + opts.menuClass + '"></div>'); //dom for the suggestions of autocomplete
      that.data('sc', that.sc).data('autocomplete', that.attr('autocomplete'));
      that.attr('autocomplete', 'off');
      that.cache = {};  //stock in cache if we want an precedent result
      that.last_val = ''; //last value in input
      that.last_key = ''; //last key pressed
      that.nav = $('<div class="pagination-autocomplete"></div>');
      that.currentPage = 1; //page actual
      that.pagination = {
        pageCount: opts.pageCount,
        page: that.currentPage,
        val: '',
        pages: 0,
        filter: {}
      }; //data what are send to server

      that.updateSC = function(resize, next) {
        that.sc.css({
          top: that.offset().top + that.outerHeight(),
          left: that.offset().left,
          width: that.container.width()
        });
        if (!resize) {
          that.sc.show();
          if (!that.sc.maxHeight) {
            that.sc.maxHeight = parseInt(that.sc.css('max-height'));
          }
          if (!that.sc.suggestionHeight) {
            that.sc.suggestionHeight = $('.autocomplete-suggestion', that.sc).first().outerHeight();
          }
          if (that.sc.suggestionHeight){
            if (!next) {
              that.sc.scrollTop(0);
            } else {
              var scrTop = that.sc.scrollTop(), selTop = next.offset().top - that.sc.offset().top;
              if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0) {
                that.sc.scrollTop(selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight);
              } else if (selTop < 0) {
                that.sc.scrollTop(selTop + scrTop);
              }
            }
          }
        }
      };

      that.updateNav = function(resize, next) {
        that.nav.css({
          top: that.sc.offset().top + parseInt(that.sc.css('height')),
          left: that.sc.offset().left,
          width: that.container.width()
        });
        if (!resize) {
          that.nav.show();
          if (!that.nav.maxHeight) {
            that.nav.maxHeight = parseInt(that.nav.css('max-height'));
          }
          if (!that.nav.suggestionHeight) {
            that.nav.suggestionHeight = $('.autocomplete-suggestion', that.nav).first().outerHeight();
          }
          if (that.nav.suggestionHeight){
            if (!next) {
              that.nav.scrollTop(0);
            } else {
              var scrTop = that.nav.scrollTop(), selTop = next.offset().top - that.nav.offset().top;
              if (selTop + that.nav.suggestionHeight - that.nav.maxHeight > 0) {
                that.nav.scrollTop(selTop + that.nav.suggestionHeight + scrTop - that.nav.maxHeight);
              } else if (selTop < 0) {
                that.nav.scrollTop(selTop + scrTop);
              }
            }
          }
        }
      };

      $(window).on('resize.autocomplete-body', that.updateSC);
      $(window).on('resize.autocomplete-body', that.updateNav);
      that.body.appendTo('body');
      that.sc.appendTo(that.body);

      that.sc.on('mouseleave', '.autocomplete-suggestion', function() {
        $('.autocomplete-suggestion.selected').removeClass('selected');
      });

      that.sc.on('mouseenter', '.autocomplete-suggestion', function() {
        $('.autocomplete-suggestion.selected').removeClass('selected');
        $(this).addClass('selected');
      });

      that.sc.on('mousedown click', '.autocomplete-suggestion', function(e) {
        var item = $(this), v = item.data('val');
        if (v || item.hasClass('autocomplete-suggestion')) { // else outside click
          that.val(v);
          opts.onSelect(e, v, item);
          that.sc.hide();
          that.nav.hide();
        }
        return false;
      });

      that.nav.on('click', '.prev', $.proxy(clickPrev, this))
             .on('click', '.first', $.proxy(clickFirst, this))
             .on('click', '.next', $.proxy(clickNext, this))
             .on('click', '.last', $.proxy(clickLast, this));

      that.on('blur.autocomplete-body', function() {
        try { over_sb = $('.autocomplete-suggestions:hover').length; } catch(e){ over_sb = 0; } // IE7 fix :hover
        over_pb = $('.pagination-autocomplete:hover').length;
        if (!over_sb && !over_pb) {
          that.last_val = that.val();
          that.sc.hide();
          that.nav.hide();
          setTimeout(function(){
            that.sc.hide();
            that.nav.hide();
          }, 350); // hide suggestions on fast input

        } else if (!that.is(':focus')) {
          setTimeout(function(){
            that.focus();
          }, 20);
        }
      });

      if (!opts.minChars) {
        that.on('focus.autocomplete-body', function() {
          that.last_val = '\n';
          that.trigger('keyup.autocomplete-body');
        });
      }

      function suggest(data) {
        var val = that.val();
        that.cache[val] = data;
        if (data && data.list && data.list.length && (val.length >= opts.minChars || that.last_key == 13)) {
          var nav = '';
          that.pagination.pages = data.pages
          if (data.pages > 1) {
            nav += '<ul class="pagination">';
            nav +=   '<li><a class="first">&laquo</a>';
            nav +=   '<li><a class="prev">&lt;</a>';
            nav +=   '<li><a class="page" data-val=' + data.page +' disabled>' + data.page + '/' + data.pages + '</a>';
            nav +=   '<li><a class="next">&gt;</a>';
            nav +=   '<li><a class="last">&raquo;</a>';
            nav += '</ul>';
          }
          that.sc.html('');
          for (var i=0; i < data.list.length; i++) {
            that.sc.append(opts.renderItem(data.list[i], val));
          }
          that.nav.html(nav);
          that.nav.css({
            top: that.sc.offset().top + that.outerHeight() + that.sc.height()
          });
          that.nav.appendTo(that.body);
          that.updateSC(0);
          that.updateNav(0);
        } else {
          that.sc.hide();
          that.nav.hide();
        }
      }

      function clickPrev() {
        if (that.currentPage>1) {
          goToPage(+that.currentPage - 1);
        }
      }

      function clickNext() {
        if (that.currentPage<that.pagination.pages) {
          goToPage(+that.currentPage + 1);
        }
      }

      function clickFirst() {
        if (that.currentPage != 1) {
          goToPage(1);
        }
      }

      function clickLast() {
        if (that.currentPage != that.pagination.pages) {
          goToPage(that.pagination.pages);
        }
      }

      function goToPage(e) {
        if (typeof e === "object") {
          that.currentPage = $(e.target).attr("data-val");
        } else {
          that.currentPage = e;
        }
        that.pagination.page = that.currentPage;
        opts.source(that.pagination, suggest);
        that.nav.find('.active').removeClass('active');
        that.nav.find('.page' + that.currentPage).parent().addClass('active');
      }

      that.on('keydown.autocomplete-body', function(e) {
        // esc
        if (e.which == 27) {
          that.val(that.last_val).sc.hide();
          that.nav.hide();
        }
        // enter or tab
        else if (e.which == 13 || e.which == 9) {
          var sel = $('.autocomplete-suggestion.selected', that.sc);
          if (sel.length && that.sc.is(':visible')) {
            opts.onSelect(e, sel.data('val'), sel);
            setTimeout(function() {
              that.sc.hide(); that.nav.hide();
            }, 20);
          }
        }
        that.last_key = e.which;
      });

      that.on('keyup.autocomplete-body', function(e) {
        if (!~$.inArray(e.which, [16, 27, 35, 36, 37, 38, 39, 40])) {
          var val = that.val();
          if ((val.length >= opts.minChars || that.last_key == 13) && val.length >0 ) {
            that.pagination.filter = {};
            /*that.filter.find("input[type='checkbox']:checked").each(function() {
              that.pagination.filter.push($(this).val());
            });*/
            var values = that.filter.find('input').serializeArray();
            values.forEach(function(obj) {
              if (obj.name.endsWith('[]')) {
                var name = obj.name.slice(0, -2);
                that.pagination.filter[name] = that.pagination.filter[name] || [];
                that.pagination.filter[name].push(obj.value);
              } else {
                that.pagination.filter[obj.name] = obj.value;
              }

            });
            if (that.last_key !== 13) {
              that.currentPage = 1;
            }
            that.last_val = val;
            that.pagination.currentPage = that.currentPage;
            that.pagination.val = val;
            clearTimeout(that.timer);
            if (opts.cache) {
              if (val in that.cache) {
                suggest(that.cache[val]); return;
              }
              // no requests if previous suggestions were empty
              for (var i = 1; i < val.length-opts.minChars; i++) {
                var part = val.slice(0, val.length - i);
                if (part in that.cache && !that.cache[part].list.length) {
                  suggest([]); return;
                }
              }
            }
            that.timer = setTimeout(function() {
              opts.source(that.pagination, suggest)
            }, opts.delay);
          } else {
            that.sc.hide();
            that.nav.hide();
          }
        }
      });
    });
  }

  $.fn.autocomplete.defaults = {
    source: 0,
    minChars: 3,
    delay: 150,
    cache: 1,
    menuClass: '',
    pageCount: 10,
    renderItem: function(item, search) {
      // escape special characters
      search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
      return $('<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>');
    },
    onSelect: function(e, term, item) {}
  };
}(jQuery);
