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

    init: function() {
      mediator.subscribe('emailEnteredIntoUsername', domUpdates.removeEmailAddressFromUsername);
    },

    removeEmailAddressFromUsername: function(data) {
      data.element.value = data.match;
    },

  };

  return {
    init: domUpdates.init,
  }

});
