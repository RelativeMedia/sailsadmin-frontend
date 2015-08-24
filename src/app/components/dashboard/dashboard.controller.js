angular.module('dashboard.controllers', [
  'dashboard.controller'
]);

angular.module('dashboard.controller', [])
.controller( 'DashboardController', function DashboardController($scope, $log, lodash, users){

    /**User Counts Pie Chart **/
  var adminUsersCount = lodash.filter(users.results, { accessLevel: 2 }).length;
  var userUsersCount = lodash.filter(users.results, { accessLevel: 1 }).length;
  $scope.userLabels = ["Admins", "Users"];
  $scope.userCounts = [adminUsersCount, userUsersCount];

});
