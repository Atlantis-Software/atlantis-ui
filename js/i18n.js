+function($) {
  var nav = window.navigator;
  var language = ((
    nav.language ||
    nav.browserLanguage ||
    nav.systemLanguage ||
    nav.userLanguage
  ) || '').split('-')[0].split('_')[0];

  $.fn.i18n = {
    language: language,
    langs: []
  };
}(jQuery);
