angular.module('App.dashboard', [
  'dashboard.controllers'
])
.config( function config($stateProvider, AccessLevels){
  $stateProvider
  .state( 'dashboard', {
    abstract: true,
    data: {
      access: AccessLevels.roles.user,
    },
    views: {
      '': {
        templateUrl: 'app/common/templates/layout_fluid.tpl.html'
      }
    }
  })
  .state('dashboard.index', {
    url: '/',
    data: {
      navs: {
        sidebar: {
          display: 'Dashboard',
          accessLevel: 'user',
        }
      }
    },
    resolve: {
      users: function(User, Error){
        return User.find().then(
          function(results){
            return results;
          },
          function(error){
            Error.catch(error, true);
            return error;
          }
        );
      }
    },
    views: {
      'content': {
        templateUrl: 'app/components/dashboard/dashboard.tpl.html',
        controller: 'DashboardController',
      }
    }
  });

});
