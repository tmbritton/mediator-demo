(function(global, module){
  'use strict';

  // AMD/RequireJS
  if (typeof define === 'function' && define.amd) {
    define('loginFakeAjax', ['mediator'], function(mediator) {
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

  var fakeAjax = {

    doFakeAjax: function(data) {
      mediator.publish('beforeSendAjax', data);
      window.setTimeout(function(){
        var fake_response_data = {
          'response_code': 200,
          'status': 'ok'
        };
        mediator.publish('loginAjaxSuccess', fake_response_data)
      }, 2000);
    },

    init: function() {
      mediator.subscribe('loginSumbitValidated', fakeAjax.doFakeAjax);
    },

  };

  return {
    init: fakeAjax.init
  };

});
