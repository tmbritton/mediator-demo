requirejs(['mediator', 'loginUserInteractions', 'loginValidators', 'loginDomUpdate'], 

  function(Mediator, loginUserInteractions, loginValidators, loginDomUpdate) {

    loginUserInteractions.init();

    loginValidators.init();

    loginDomUpdate.init();

    Mediator.subscribe('loginSubmit', function(context){
      console.log(context);
      return context;
    });

    Mediator.subscribe('loginSubmit', function(context){
      console.log('Callback 2');
    });

    Mediator.subscribe('passwordEntered', function(context){
      console.log("Password: " + context.value);
    });
  }
);