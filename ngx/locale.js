var nav = window.navigator;
var language = ((
      nav.language ||
      nav.browserLanguage ||
      nav.systemLanguage ||
      nav.userLanguage
    ) || '').split('-')[0].split('_')[0];
var locale;
switch(language) {
  case 'en':
    locale = 'en-US';
    break;
  case 'fr':
    locale = 'fr-FR';
    break;
  default:
    language = 'en';
    locale = 'en-US';
    break;
}

export {locale, language};