(function(global, module){
  'use strict';

  // AMD/RequireJS
  if (typeof define === 'function' && define.amd) {
    define('loginValidators', ['mediator'], function(mediator) {
      return module(mediator);
    });
  } else if (typeof exports !== 'undefined') {
    // Node/CommonJS
    exports.loginValidators = module();
  } else {
    // Global browser
    global.loginValidators = module();
  }
})(window, function(mediator){

  var validators = {

    checkForEmailAddress: function(data) {
      var email_regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (email_regex.test(data.entered_name)) {
        mediator.publish('emailEnteredIntoUsername', data);
        return true;
      }
      return false;
    },

    init: function() {
      mediator.subscribe('userNameEntered', validators.validateUserName);
      mediator.subscribe('validUserNameEntered', validators.checkForEmailAddress);
    },

    validateUserName: function(usernameElement) {
      var entered_name = usernameElement.value,
          regex = /\w+\.\w+/, // matches firstname.lastname pattern.
          match = entered_name.match(regex);

      if (match) {
        mediator.publish('validUserNameEntered', { 'element': usernameElement, 'entered_name': match.input, 'match': match[0] });
        return match[0];
      }
      mediator.publish('invalidUserNameEntered', usernameElement);
      return false;
    }

  };

  return {
    init: validators.init
  };

});  