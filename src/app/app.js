angular.module('App', [
  'ui.router',
  'lodash',
  'ui.bootstrap',
  'ngResource',
  'angularUtils.directives.dirPagination',
  'ngSails',
  'angularSpinner',
  'ui-notification',
  'chart.js',

  /**
   * Component Definitions
   */
  'services',
  'constants',
  'directives',

  /**
   * Feature Definitions
   */
  'App.auth',
  'App.dashboard',
  'App.user',
])

.config( function ($urlRouterProvider, $sailsProvider, $logProvider, NotificationProvider, Config){
  NotificationProvider.setOptions({
      delay: 10000,
      startTop: 80,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
  });
  $sailsProvider.url = Config.api.url;
  $logProvider.debugEnabled(Config.debugMode);
  $urlRouterProvider.otherwise('/');
})

.run( function ($log, lodash, Utils, Error, $rootScope, $state, Auth, usSpinnerService, Config){
  $rootScope.user = Auth.CurrentUser();
  $rootScope.Utils = Utils;
  $rootScope.lodash = lodash;
  $rootScope.pageTitle = Config.pageTitle;
  $rootScope.spinnerSpinning = false;

  $rootScope.startSpin = function(){
    $rootScope.spinnerSpinning = true;
    usSpinnerService.spin('spinner-1');
  };

  $rootScope.stopSpin = function(){
    $rootScope.spinnerSpinning = false;
    usSpinnerService.stop('spinner-1');
  };

  $rootScope.$on('$stateChangeStart', function(event, toState) {

    if (toState.resolve) {
      $rootScope.startSpin();
    }

    Auth.authorize(toState.data.access, function(err){
      if(err){
        event.preventDefault();
        Error.catch(err);
        if(err.category === 'INVALID_AUTHORIZATION'){
          $state.go('dashboard.index');
        }else{
          $state.go('auth.login');
        }
      }
    });
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState){
    var data = $state.$current.data;
    $rootScope.data = data;
    if (toState.resolve) {
      $rootScope.stopSpin();
    }
  });
});
