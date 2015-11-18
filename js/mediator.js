(function(global, module) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD/RequireJS
    define('mediator', [], function() {
      return module();
    });
  } else if (typeof exports !== 'undefined') {
    // Node/CommonJS
    exports.Mediator = module();
  } else {
    // Browser global
    global.Mediator = module();
  }
})(this, function(){
  var mediator = {},
      subscriptions = {};
    
  mediator.getAllSubscriptions = function() {
    return subscriptions;
  };

  mediator.subscribe = function(event_name, callback) {
    if (typeof subscriptions[event_name] != 'object' && !subscriptions.isArray) {
      subscriptions[event_name] = [];
    }
    subscriptions[event_name].push(callback);
  };
  
  mediator.publish = function(event_name, context) {
    if (subscriptions.hasOwnProperty(event_name)) {
      subscriptions[event_name].forEach(function(callback) {
        callback(context);
      });
    }
  };

  return mediator;
});
