angular.module('user.list.controller', [

])
.controller( 'UserListController', function UserListController( $scope, $state, $log, $modal, users, User, Auth, Error, Notification, AccessLevels){
  $scope.users = users;
  $scope.getUserGroup = function(accessLevelId){
    return Auth.getUserGroup(accessLevelId);
  };


  $scope.editUser = function($index, user){
    var $modalInstance = $modal.open({
      templateUrl: 'app/components/user/list/editUser.modal.tpl.html',
      resolve: {
        groups: function(){
          return AccessLevels.groups;
        },
        user: function(){
          return user;
        }
      },
      controller: function($scope, $modalInstance, User, groups, user){
        $scope.groups = groups;
        $scope.user = user;

        $scope.close = function(){
          $modalInstance.dismiss('cancel');
        };

        $scope.ok = function(){
          User.update($scope.user).then(
            function(result){
              $modalInstance.close(result);
            },
            function(error){
              Error.catch(error, true);
            }
          );
        };

      }

    });

    $modalInstance.result.then(
      function(data){
        Notification.success('User Edited Successfully');
      }
    );
  };

  $scope.createUser = function(){
    var $modalInstance = $modal.open({
      templateUrl: 'app/components/user/list/addUser.modal.tpl.html',
      resolve: {
        groups: function(){
          return AccessLevels.groups;
        },
      },
      controller: function($scope, $modalInstance, User, groups){
        $scope.groups = groups;

        $scope.newUser = {
          accessLevel: 1
        };

        $scope.close = function(){
          $modalInstance.dismiss('cancel');
        };

        $scope.ok = function(){
          User.create($scope.newUser).then(
            function(result){
              $modalInstance.close(result);
            },
            function(error){
              Error.catch(error, true);
            }
          );
        };

      }

    });

    $modalInstance.result.then(
      function(data){
        $scope.users.results.push(data);
        Notification.success('User Created Successfully');
      }
    );

  };


  $scope.resetPassword = function($index, user){
    var $modalInstance = $modal.open({
      templateUrl: 'app/components/user/list/resetPassword.modal.tpl.html',
      resolve: {
        user: function(){
          return user;
        }
      },
      controller: function($scope, $modalInstance, User, user){

        $scope.close = function(){
          $modalInstance.dismiss('cancel');
        };

        $scope.ok = function(){
          User.resetPassword(user).then(
            function(){
              $modalInstance.dismiss('ok');
              Notification.success('Successfully Sent Password Reset');
            },
            function(error){
              Error.catch(error, true);
            }
          );
        };

      }
    });
  };

  $scope.deleteUser = function($index, user){
    User.destroy({ id: user.id }).then(
      function (result){
        $scope.users.results.splice($index, 1);
        Notification.success('User Deleted Successfully');
      },
      function (error){
        Error.catch(error, true);
      }
    );
  };
});
