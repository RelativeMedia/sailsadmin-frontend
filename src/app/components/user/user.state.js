angular.module('App.user', [
  'user.model',
  'user.controllers',
])
.config( function config($stateProvider, AccessLevels){
  $stateProvider
  .state( 'user', {
    abstract: true,
    data: {
      access: AccessLevels.roles.admin,
    },
    views: {
      '': {
        templateUrl: 'app/common/templates/layout_fluid.tpl.html'
      }
    }
  })
  .state('user.index', {
    url: '/user',
    data: {
      navs: {
        sidebar: {
          display: 'User Management',
          accessLevel: 'admin'
        }
      }
    },
    resolve: {
      users: function(User){
        return User.find().then(
          function (users){ return users; },
          function (error){ return error; }
        );
      }
    },
    views: {
      'content': {
        templateUrl: 'app/components/user/list/list.tpl.html',
        controller: 'UserListController',
      }
    }
  });

});
