(function(global, module){
  'use strict';

  // AMD/RequireJS
  if (typeof define === 'function' && define.amd) {
    define('loginDomUpdate', ['mediator'], function(mediator) {
      return module(mediator);
    });
  } else if (typeof exports !== 'undefined') {
    // Node/CommonJS
    exports.loginDomUpdate = module(mediator);
  } else {
    // Global browser
    global.loginDomUpdate = module(mediator);
  }
})(window, function(mediator){

  var domUpdates = {

    loginForm: document.getElementById('login'),

    clearTextField: function(data) {
      data.value = '';
    },

    clearErrorMessage: function(data) {
      data.labels[0].innerHTML = '';
    },

    displayUsernameErrorMessage: function(data) {
      data.element.labels[0].innerHTML = 'Error: username must be in firstname.lastname pattern.';
    },

    displayPasswordErrorMessage: function(data) {
      data.labels[0].innerHTML = 'Error: Password must be "password" to be valid.';
    },

    init: function() {
      mediator.subscribe('emailEnteredIntoUsername', domUpdates.removeEmailAddressFromUsername);
      mediator.subscribe('invalidUserNameEntered', domUpdates.displayUsernameErrorMessage);
      mediator.subscribe('userNameFieldFocused', domUpdates.clearTextField);
      mediator.subscribe('userNameFieldFocused', domUpdates.clearErrorMessage);
      mediator.subscribe('passwordFieldFocused', domUpdates.clearTextField);
      mediator.subscribe('passwordFieldFocused', domUpdates.clearErrorMessage);
      mediator.subscribe('incorrectPasswordEntered', domUpdates.displayPasswordErrorMessage);
      mediator.subscribe('loginAjaxSuccess', domUpdates.loginSuccess);
      mediator.subscribe('beforeSendAjax', domUpdates.makeSpinner);
    },

    loginSuccess: function(data) {
      var username = domUpdates.loginForm.elements.username.value;
      domUpdates.loginForm.innerHTML = 'Hello ' + username + '!';
    },

    makeSpinner: function(data) {
      var img = document.createElement('img'),
          submit_button = document.getElementById('formsubmit');
      img.src = 'img/ajax-loader.gif';

      data.removeChild(submit_button);
      data.appendChild(img);
    },

    removeEmailAddressFromUsername: function(data) {
      data.element.value = data.match;
    },

  };

  return {
    init: domUpdates.init,
  }

});
