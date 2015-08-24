angular.module('auth.login.controller', [])
.controller( 'LoginController', function LoginController($log, lodash, Utils, Error, $scope, $state, Auth){
  $scope.submitDisabled = false;
  $scope.login = function(){
    $scope.submitDisabled = true;

    Auth.login($scope.user).then(
      function (user){

        if(user.resetPassword){
          $state.go('auth.resetPassword');
        }else{
          $state.go('dashboard.index');
        }

      },
      function (error){
        Error.catch(error, true);
        $scope.submitDisabled = false;
      }
    );

  };

});
