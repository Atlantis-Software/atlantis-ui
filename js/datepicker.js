+function($, moment) {
  'use strict'

  if (!moment) {
    return;
  }

  var DATE_HEADER_TEMPLATE = '<button type="button" class="close" data-dismiss="modal"><span class="modal-close">&times;</span></button>';
  DATE_HEADER_TEMPLATE +=    '<h4 class="modal-title"></h4>';
  DATE_HEADER_TEMPLATE +=    '<div class="calendar-details container-fluid" data-date-type = "single">';
  DATE_HEADER_TEMPLATE +=      '<div class= "input-group inputform inputdateform">';
  DATE_HEADER_TEMPLATE +=        '<input type="text" class="form-control"/>';
  DATE_HEADER_TEMPLATE +=        '<span class="input-group-addon sr-only"></span>';
  DATE_HEADER_TEMPLATE +=      '</div>';
  DATE_HEADER_TEMPLATE +=    '</div>';

  var DATE_RANGE_HEADER_TEMPLATE = '<button type="button" class="close" data-dismiss="modal"><span class="modal-close">&times;</span></button>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<h4 class="modal-title"></h4>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<div class="calendar-details container-fluid" data-date-type = "range">';
  DATE_RANGE_HEADER_TEMPLATE +=    '<div class="input-group inputform inputdateform">';
  DATE_RANGE_HEADER_TEMPLATE +=    '<input type="text" class="form-control"/>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<span class="input-group-addon">→</span>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<input type="text" class="form-control"/>';
  DATE_RANGE_HEADER_TEMPLATE +=    '</div>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<div class="selectdateform">';
  DATE_RANGE_HEADER_TEMPLATE +=    '<select class="form-control range">';
  DATE_RANGE_HEADER_TEMPLATE +=    '<option value="none"></option>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<option value="toDay"></option>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<option value="lastWeek"></option>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<option value="lastMonth"></option>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<option value="last7day"></option>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<option value="last30day"></option>';
  DATE_RANGE_HEADER_TEMPLATE +=    '<option value="lastYear"></option>';
  DATE_RANGE_HEADER_TEMPLATE +=    '</select>';
  DATE_RANGE_HEADER_TEMPLATE +=    '</div>';
  DATE_RANGE_HEADER_TEMPLATE +=    '</div>';

  var MODAL_TEMPLATE = '<div class="modal modal-right fade" id="dateWidget" tabindex="-1" role="dialog">';
  MODAL_TEMPLATE +=    '<div class="modal-dialog" role = "document">';
  MODAL_TEMPLATE +=    '<div class="modal-content">';
  MODAL_TEMPLATE +=    '<div class="modal-header">';
  MODAL_TEMPLATE +=    '<div class="datepicker-header">';
  MODAL_TEMPLATE +=    '</div>';
  MODAL_TEMPLATE +=    '<div class="datepicker-header-margin">';
  MODAL_TEMPLATE +=    '</div>';
  MODAL_TEMPLATE +=    '</div>';
  MODAL_TEMPLATE +=    '<div class="modal-body container-fluid">';
  MODAL_TEMPLATE +=    '</div>';
  MODAL_TEMPLATE +=    '<div class="modal-footer">';
  MODAL_TEMPLATE +=    '</div>';
  MODAL_TEMPLATE +=    '</div><!-- modal-content -->';
  MODAL_TEMPLATE +=    '</div><!-- modal-dialog -->';
  MODAL_TEMPLATE +=    '</div>';

  var DatePicker = function(element, options) {
    moment.locale($.fn.i18n.language);          //Defines the language used by moment using users language
    this.positionEl = 'body';                   //Defines the position of the element
    this.element = $(element);                  //Recovers the element of dom
    this.inputform = null;                      //Defines the inputs forms used when a click is effectued
    this.startDate = moment().startOf('day');   //Begin date
    this.endDate = moment().endOf('day');       //End Date
    this.singeDatePicker = false;               //is a single date picker or not
    this.locale= {                              //Locales used by moment
      format: moment.localeData().longDateFormat('L'),
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
      separator: '-'
    };
    this.numberOfMonths = 1;                    //Number of months to display in the calendar
    this.calendar = [{}];                       //every month.

    //modify dayOfWeek array with the correct firstDay
    var temp;
    temp = this.locale.daysOfWeek.slice(0);
    for (var i= 0; i<7; ++i) {
      this.locale.daysOfWeek[i] = temp[(i+this.locale.firstDay)%7];
    };
    // If options are passed to the function
    if (typeof options !== 'object' || options === null) {
      options = {};
    }
    options = $.extend(this.element.data(), options);

    if (typeof options.numberOfMonths === 'number') {
      this.calendar = [];
      this.numberOfMonths = options.numberOfMonths;
      for (var i = 0; i< this.numberOfMonths; i++) {
        this.calendar.push( { } )
      }
    }

    //Basic template for each month
    if (typeof options.template !== 'string' && !(options.template instanceof $)) {
      options.template = '<div class="datepicker show-calendar">'
      for (var i = 0; i< this.numberOfMonths; i++) {
        options.template += '<div class="calendar calendar' + i + '"><div class="calendar-table"></div></div>';
      }
      options.template += '</div>';
    }

    this.positionEl = (options.positionEl && $(options.positionEl).length) ? $(options.positionEl) : $(this.positionEl);
    //rajoute au dom le template
    this.container = $(options.template).appendTo(this.positionEl);

    if (typeof options.startDate === 'string') {
      this.startDate = moment(options.startDate, this.locale.format);
    }

    if (typeof options.startDate === 'object') {
      this.startDate = moment(options.startDate);
    }

    if (typeof options.endDate === 'string') {
      this.endDate = moment(options.endDate, this.locale.format);
    }

    if (typeof options.endDate === 'object') {
      this.endDate = moment(options.endDate);
    }

    if (typeof options.singleDatePicker === 'boolean') {
      this.singleDatePicker = options.singleDatePicker;
      if (this.singleDatePicker) {
        this.endDate = this.startDate.clone();
      }
    }
    this.inputform = (options.inputform && $(options.inputform).length) ? $(options.inputform) : null;

    //vérifie si une valeur est présente dans le inputs d'origine, et si c'est le cas le place dans le calendrier
    if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
      var valueStart, valueEnd;
      if ($(this.element).hasClass('input-group')) {
        valueStart = $(this.element).find('input').first().val()
        valueEnd = $(this.element).find('input').last().val()
      }else if (this.singleDatePicker) {
        valueStart = $(this.element).val();
        valueEnd = valueStart;
      }
      var start = moment(valueStart);
      var end = moment(valueEnd);
      if (start !== null && start.isValid() && end !== null && end.isValid()) {
        this.setStartDate(start);
        this.setEndDate(end);
        this.updateFormInputs();
      }
    }


    //Link event to function
    this.container.find('.calendar')
      .on('click.datepicker', '.prev', $.proxy(this.clickPrev, this))
      .on('click.datepicker', '.next', $.proxy(this.clickNext, this))
      .on('mousedown.datepicker', 'td.available', $.proxy(this.clickDate, this));

    $('.calendar-details').on('change.datepicker', 'input', $.proxy(this.formInputsChanged, this));

    this.updateView();
  };

  DatePicker.prototype = {
    constructor : DatePicker,

    /**
     * Defines startdate, updateView, Element and InputsForms
     * @param {String_Object} startDate the date use for modify startDate in datepicker
     */
    setStartDate: function (startDate) {
      if (typeof startDate === 'string') {
        this.startDate = moment(startDate, this.locale.format)
      }
      if (typeof startDate === 'object') {
        this.startDate = moment(startDate);
      }
      this.startDate = this.startDate.startOf('day');

      this.updateView();
      this.updateElement();
      this.updateFormInputs();
    },

    /**
     * Get StartDate,
     * @return {object} startDate
     */
    getStartDate: function() {
      return this.startDate
    },

    /**
     * Defines endDate, updateView, Element and InputsForms
     * @param {String_Object} endDate The date use for modify endDate in datepicker
     */
    setEndDate: function(endDate) {
      if (typeof endDate === 'string') {
        this.endDate = moment(endDate, this.locale.format)
      }
      if (typeof endDate === 'object') {
        this.endDate = moment(endDate);
      }
      if (this.endDate.isBefore(this.startDate)) {
        this.endDate = this.startDate.clone();
      }
      this.startDate = this.startDate.startOf('day');

      this.previousRightTime = this.endDate.clone();
      this.updateView();
      this.updateElement();
      this.updateFormInputs();
    },

    /**
     * Get endDate,
     * @return {object} endDate
     */
    getEndDate: function() {
      return this.endDate
    },

    //
    //function to update view
    //argument: none
    //return: none
    //update months and calendars
    updateView: function() {
      this.updateMonthsInView();
      this.updateCalendars();
    },

    //
    //function to update month
    //arguments: none
    //return: none
    //update month when the day selected was not in the first calendar

    updateMonthsInView: function() {
      if (this.endDate) {
        //Si aucune modification ne fait rien
        if (!this.singleDatePicker && this.calendar[0].month &&
          (this.startDate.format('YYYY-MM') == this.calendar[0].month.format('YYYY-MM'))) {
          for (var i = 1; i<this.numberOfMonths; i++ ) {
            if (this.calendar[i].month &&
            (this.endDate.format('YYYY-MM') == this.calendar[i].month.format('YYYY-MM'))) {
              return;

            }
          }
        }

        this.calendar[0].month = this.startDate.clone().date(2);
        for (var i = 1; i< this.numberOfMonths; i++ ) {
          this.calendar[i].month = this.startDate.clone().date(2).add(i, 'month');
        }
        this.positionEl.parent().scrollTop(0);
      } else {
        if (this.calendar[0].month.format('YYYY-MM') != this.startDate.format('YYYY-MM')){
          this.calendar[0].month = this.startDate.clone().date(2);
          for (var i = 1; i< this.numberOfMonths; i++ ) {
            this.calendar[i].month = this.startDate.clone().date(2).add(i , 'month');
          }
          this.positionEl.parent().scrollTop(0);
        }
      }
    },

    //
    //Function to update Calendars one par one
    //argument: none
    //return: none

    updateCalendars: function() {
      for (var i = 0; i< this.numberOfMonths; i++) {
        this.renderCalendar(i);
      }
      if (this.endDate == null) {
        return;
      }
    },

    //
    //function to create and display calendar in dom
    //argument: nbrCalendar (int)
    //return: none

    renderCalendar: function(nbrCalendar) {
      var calendar = this.calendar[nbrCalendar];
      var month = calendar.month.month();
      var year = calendar.month.year();
      var daysInMonth = moment([year, month]).daysInMonth();
      var firstDay = moment([year, month, 1]);
      var lastDay = moment([year, month, daysInMonth]);
      var lastMonth = moment(firstDay).subtract(1, 'month').month();
      var lastYear = moment(firstDay).subtract(1, 'month').year();
      var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
      var dayOfWeek = firstDay.day();

      //initialize a 6 rows x 7 columns array for the calendar
      var calendar = [];
      calendar.firstDay = firstDay;
      calendar.lastDay = lastDay;

      //Clean old calendar;
      for (var i = 0; i < 6; i++) {
          calendar[i] = [];
      }

      //populate the calendar with date objects
      var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
      if (startDay > daysInLastMonth)
          startDay -= 7;

      if (dayOfWeek == this.locale.firstDay)
          startDay = daysInLastMonth - 6;

      var curDate = moment([lastYear, lastMonth, startDay, 12]);

      var col, row;
      for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
          if (i > 0 && col % 7 === 0) {
              col = 0;
              row++;
          }
          calendar[row][col] = curDate.clone()
          curDate.hour(12);

      }

      //make the calendar object available to hoverDate/clickDate
      this.calendar[nbrCalendar].calendar = calendar;

      //
      // Display the calendar
      //

      var html = '<table class="table-condensed">';
      html += '<thead>';
      html += '<tr>';


      if (nbrCalendar == 0) {
          html += '<th class="prev available"><i>←</i></th>';
      } else {
          html += '<th></th>';
      }

      var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

      html += '<th colspan="5" class="month">' + dateHtml + '</th>';
      if (nbrCalendar == 0) {
          html += '<th class="next available"><i>→</i></th>';
      } else {
          html += '<th></th>';
      }

      html += '</tr>';
      html += '<tr>';



      $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
          html += '<th>' + dayOfWeek + '</th>';
      });

      html += '</tr>';
      html += '</thead>';
      html += '<tbody>';

      for (var row = 0; row < 6; row++) {
          html += '<tr>';

          for (var col = 0; col < 7; col++) {

              var classes = [];

              //highlight today's date
              if (calendar[row][col].isSame(new Date(), "day")) {
                  classes.push('today');
                }
              //highlight weekends
              if (calendar[row][col].isoWeekday() > 5) {
                  classes.push('weekend');
                }

              //grey out the dates in other months displayed at beginning and end of this calendar
              if (calendar[row][col].month() != calendar[1][1].month()) {
                  classes.push('off');
                }

              //highlight the currently selected start date
              if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
                  classes.push('active', 'start-date');
                }

              //highlight the currently selected end date
              if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
                  classes.push('active', 'end-date');
                }

              //highlight dates in-between the selected dates
              if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate) {
                  classes.push('in-range');
                }

              var cname = '', disabled = false;
              for (var i = 0; i < classes.length; i++) {
                  cname += classes[i] + ' ';
                  if (classes[i] == 'disabled')
                      disabled = true;
              }
              if (!disabled) {
                  cname += 'available';
                }
              html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

          }
          html += '</tr>';
      }

      html += '</tbody>';
      html += '</table>';
      var classCalendar = "calendar"+ nbrCalendar;
      this.container.find('.calendar.'+ classCalendar + ' .calendar-table').html(html);


    },

    //
    //function to display previous month
    //argument: events click
    //return: none
    //update all calendars with -1 months

    clickPrev: function(e) {
      for (var i = 0; i< this.numberOfMonths; i++) {
        this.calendar[i].month.subtract(1, 'month');
      }
      this.updateCalendars();
    },

    //
    //
    //function to display next month
    //argument: events click
    //return: none
    //update all calendars with +1 months


    clickNext: function(e){
      for (var i = 0; i< this.numberOfMonths; i++) {
        this.calendar[i].month.add(1, 'month');
      }
      this.updateCalendars();
    },

    //
    //function click on date, update view, original element, inputs forms
    //argument: event click
    //return: none
    //modify calendars and view when a event click is done on a date

    clickDate: function(e){
      var title = $(e.target).attr('data-title');
      var row = title.substr(1, 1);
      var col = title.substr(3, 1);
      var cal = $(e.target).parents('.calendar');
      var date;
      for (var i = 0; i< this.numberOfMonths; i++) {
        if (cal.hasClass('calendar'+i)) {
          date = this.calendar[i].calendar[row][col];
        }
      }
      if (this.endDate || date.isBefore(this.startDate, 'day')) {
        this.endDate = null;
        this.setStartDate(date.clone());
      } else if (!this.endDate && date.isBefore(this.startDate)) {
        this.setEndDate(this.startDate.clone());
      } else {
        this.setEndDate(date.clone())
      }
      if (this.singleDatePicker) {
        this.setEndDate(this.startDate);
      }
      this.updateView();
      this.updateFormInputs();
      if (this.endDate) {
        this.updateElement();
      }
      e.stopPropagation();
    },

    //
    //Update inputs forms
    //argument: none
    //return: none
    //after clickDate function and setstart/endDate Modify the inputs form

    updateFormInputs: function() {
      if (this.inputform && this.inputform.hasClass('inputform')) {
        this.inputform.find('input').first().val(this.startDate.format(this.locale.format));
        if (this.endDate) {
          this.inputform.find('input').last().val(this.endDate.format(this.locale.format));
        }
      } else if (this.inputform) {
        this.inputform.find('input').first().val(this.startDate.format(this.locale.format));
      }
    },

    //
    // Update view if inputs forms changed
    //argument: none
    //return: none
    // If inputs form change, execute setStart/endDate and update view and element

    formInputsChanged: function() {
      if (this.inputform && this.inputform.hasClass('inputform')) {
        var start = moment(this.inputform.find('input').first().val(), this.locale.format);
        var end = moment(this.inputform.find('input').last().val(), this.locale.format);
        if (start.isValid() && end.isValid()) {
          if (!this.singleDatePicker && end.isBefore(start)) {
            start = end.clone();
          }
          this.setStartDate(start);
          this.setEndDate(end);
        }
      }
      this.updateView();
      this.updateElement();
    },

    //
    //update Original Element
    //argument: none
    //return: none
    //update the original element when an action modify the calendars or the input forms

    updateElement: function(){
      if (this.element.is('input') && this.singleDatePicker) {
        this.element.val(this.startDate.format("YYYY-MM-DD"));
        this.element.trigger('change');
      } else if (this.element.is('input') && !this.singleDatePicker) {
        this.element.val(this.startDate.format("YYYY-MM-DD") + this.locale.separator + this.endDate.format("YYYY-MM-DD"));
        this.element.trigger('change');
      } else if (this.element.hasClass('input-group') && !this.singleDatePicker) {
        this.element.find('input').first().val(this.startDate.format("YYYY-MM-DD"))
        if (this.endDate) {
          this.element.find('input').last().val(this.endDate.format("YYYY-MM-DD"))
        }
      } else if (this.element.hasClass('input-group')) {
        this.element.find('input').first().val(this.startDate.format("YYYY-MM-DD"))
      }
    },

    //
    //Delete Datepicker
    //

    remove: function(){
      this.container.remove();
      this.element.off('.datepicker');
      this.element.removeData();
    },

  };

  $.fn.datepicker = function(options, callback) {
      this.each(function() {
          var el = $(this);
          if (el.data('datepicker')) {
              el.data('datepicker').remove();
          }
          el.data('datepicker', new DatePicker(el, options, callback));
      });
      return this;
  };

  $(document).on('click.bs.modal.data-api', 'input[type="date"]', function(e) {
    var $this = $(this);
    if ($(this).parent().hasClass("input-group")){
      $this = $(this).parent();
    }
    var title = $("label[for='" + $this.attr("id") + "']").text() || "";
    var href = $this.attr('href');
    e.preventDefault();

    // crée le dom correspondant au modal
    var $modal = $(MODAL_TEMPLATE).appendTo('body');

    // check if datepicker require a single date or range
    if ($this.find('input').length !== 2) {
      $modal.find(".datepicker-header").html(DATE_HEADER_TEMPLATE);
      $modal.find(".modal-title").text(title);
      $this.datepicker({
        singleDatePicker: true,
        numberOfMonths : 3,
        positionEl : $(".modal-body"),
        inputform: $(".inputform")
      });
    } else {
      var $header = $(DATE_RANGE_HEADER_TEMPLATE);
      $header.find(".modal-title").text(title);
      var lang = $.fn.i18n.language;
      $header.find('.range option[value="none"]').text($.fn.i18n.langs[lang].define);
      $header.find('.range option[value="toDay"]').text($.fn.i18n.langs[lang].today);
      $header.find('.range option[value="lastWeek"]').text($.fn.i18n.langs[lang].lastWeek);
      $header.find('.range option[value="lastMonth"]').text($.fn.i18n.langs[lang].lastMonth);
      $header.find('.range option[value="last7day"]').text($.fn.i18n.langs[lang].last7day);
      $header.find('.range option[value="last30day"]').text($.fn.i18n.langs[lang].last30day);
      $header.find('.range option[value="lastYear"]').text($.fn.i18n.langs[lang].lastYear);

      $modal.find(".datepicker-header").html($header);
      var $calendar = $this.datepicker({
        numberOfMonths: 6,
        positionEl: $(".modal-body"),
        inputform: $(".inputform")
      });
      var $range = $header.find(".range");
      $range.on('change', function() {
        var startDate, endDate
        switch($range.val()) {
          case "toDay":
            startDate = moment();
            endDate = startDate;
            break;
          case "lastWeek":
          startDate = moment().subtract(1, 'weeks').startOf('isoweek');
            endDate = moment().subtract(1, 'weeks').endOf('isoweek');
            break;
          case "lastMonth":
            startDate = moment().subtract(1, 'months').startOf('month');
            endDate =  moment().subtract(1, 'months').endOf('month');
            break;
          case "last7day":
            startDate =  moment().subtract(1, 'weeks');
            endDate = moment();
            break;
          case "last30day":
            startDate =  moment().subtract(1, 'months');
            endDate = moment();
            break;
          case "lastYear":
            startDate =  moment().subtract(1, 'years').startOf('year');
            endDate =  moment().subtract(1, 'years').endOf('year');
            break;
          default :
            break;
        }
        $calendar.data('datepicker').setStartDate(startDate, "YYYY-MM-DD");
        $calendar.data('datepicker').setEndDate(endDate, "YYYY-MM-DD");
      });
    }

    var DatepickerModal = $modal.modal();
    DatepickerModal.on('hidden.bs.modal', function(e) {
      $modal.remove();
    });
  });

  return DatePicker;
}(jQuery, moment);
