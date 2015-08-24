angular.module('directives.ngAlerts', [
  'ngAlerts.service'
])
.directive('ngAlerts', function(Alert) {
  return {
    restrict: 'A',
    templateUrl: 'app/common/directives/ngAlerts/ngAlerts.tpl.html',
    link: function($scope) {
      $scope.alerts = Alert.alerts;

      $scope.closeAlert = function($index){
        Alert.close($index);
      };
    }
  };
});
