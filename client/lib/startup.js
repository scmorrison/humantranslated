// client/lib/startup.js
Meteor.startup(function() {
  var localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
  var locale = 'en';
  if (localeFromBrowser.match(/ja/)) {
    locale = 'ja';
  }
  i18n.setLanguage(locale);
});
