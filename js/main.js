requirejs(['mediator', 'loginUserInteractions', 'loginValidators', 'loginDomUpdate', 'loginFakeAjax'], 

  function(Mediator, loginUserInteractions, loginValidators, loginDomUpdate, loginFakeAjax) {

    loginUserInteractions.init();

    loginValidators.init();

    loginDomUpdate.init();

    loginFakeAjax.init();

  }
);