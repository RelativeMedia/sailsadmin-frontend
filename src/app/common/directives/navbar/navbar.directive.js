angular.module('directives.navbar', [])
.directive('navbar', function(Auth){
  return {
    templateUrl: 'app/common/directives/navbar/navbar.tpl.html',
    controller: function($rootScope, $scope, $state, $modal){

      $scope.changePassword = function(){
        
      };

      $scope.logout = function(){
        Auth.logout();
        $state.go('auth.login');
      };

    }
  };
});
