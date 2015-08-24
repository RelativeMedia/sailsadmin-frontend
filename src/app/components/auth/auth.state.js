angular.module('App.auth', [
  'auth.controllers',
])
.config( function config($stateProvider, AccessLevels){
  $stateProvider
  .state( 'auth', {
    abstract: true,
    data: {
      access: AccessLevels.roles.public,
    },
    views: {
      '': {
        templateUrl: 'app/components/auth/auth.layout.html'
      }
    }
  })
  .state('auth.login', {
    url: '/login',
    views: {
      'content': {
        templateUrl: 'app/components/auth/login/login.tpl.html',
        controller: 'LoginController',
      }
    }
  })
  .state('auth.resetPassword', {
    url: '/resetPassword',
    views: {
      'content': {
        templateUrl: 'app/components/auth/resetPassword.tpl.html',
        controller: 'ResetPasswordController'
      }
    }
  })
  .state('auth.register', {
    url: '/register',
    views: {
      'content': {
        templateUrl: 'app/components/auth/register/register.tpl.html',
        controller: 'RegisterController',
      }
    }
  });
});
