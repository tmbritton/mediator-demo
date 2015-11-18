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
      // Meh, regex good enough for this demo.
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
      mediator.subscribe('passwordEntered', validators.validatePassword);
      mediator.subscribe('loginSubmit', validators.validateSubmittedData);
    },

    validatePassword: function(data) {
      var password = data.value;
      if (password == 'password') {
        mediator.publish('correctPasswordEntered', data);
        return true;
      }
      mediator.publish('incorrectPasswordEntered', data);
      return false;
    },

    validateSubmittedData: function(data) {
      var submitted_data = {
        'username': data.elements.username.value,
        'password': data.elements.password.value
      };

      for (var key in submitted_data) {
        if (key == 'username' && submitted_data[key].length <= 0) {
          mediator.publish('invalidUserNameEntered', { 'element': data.elements.username, 'entered_name': submitted_data[key] });
          return false;
        }
        if (key == 'password' && submitted_data[key].length <= 0) {
          mediator.publish('incorrectPasswordEntered', data.elements.password );
          return false;
        }
      }

      mediator.publish('loginSumbitValidated', data);
    },

    validateUserName: function(usernameElement) {
      var entered_name = usernameElement.value,
          regex = /\w+\.\w+/, // matches firstname.lastname pattern.
          match = entered_name.match(regex);

      if (match) {
        mediator.publish('validUserNameEntered', { 'element': usernameElement, 'entered_name': entered_name, 'match': match[0] });
        return match[0];
      }
      mediator.publish('invalidUserNameEntered', { 'element': usernameElement, 'entered_name': entered_name });
      return false;
    }

  };

  return {
    init: validators.init
  };

});  