angular.module('auth.register.controller', [])
.controller( 'RegisterController', function RegisterController($log, lodash, Utils, Error, $scope, $state, Auth){
  $scope.submitDisabled = false;

  $scope.register = function(){
    $scope.submitDisabled = true;
    Auth.register($scope.user).then(
      function (){
        $state.go('dashboard.index');
      },
      function (err){
        $scope.submitDisabled = false;
        Error.catch(err);
      }
    );
  };
});
