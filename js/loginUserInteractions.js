(function(global, module){
  'use strict';

  // AMD/RequireJS
  if (typeof define === 'function' && define.amd) {
    define('loginUserInteractions', ['mediator'], function(mediator) {
      return module(mediator);
    });
  } else if (typeof exports !== 'undefined') {
    // Node/CommonJS
    exports.loginUserInteractions = module(mediator);
  } else {
    // Global browser
    global.loginUserInteractions = module(mediator);
  }
})(window, function(mediator){
   
  var internalApi = {   
    loginSubmitPublisher: function() {
      document.getElementById('login').addEventListener('submit', function(event){
        event.preventDefault();
        mediator.publish('loginSubmit', this);
      });
    },

    userNameChangePublisher: function() {
      document.getElementById('username').addEventListener('change', function(event){
        mediator.publish('userNameEntered', this);
      });
    },

    passwordChangePublisher: function() {
      document.getElementById('password').addEventListener('change', function(event){
        mediator.publish('passwordEntered', this);
      });
    }
  }

  return {
    init: function() {
      internalApi.loginSubmitPublisher();
      internalApi.userNameChangePublisher();
      internalApi.passwordChangePublisher();
    }
  };
});
