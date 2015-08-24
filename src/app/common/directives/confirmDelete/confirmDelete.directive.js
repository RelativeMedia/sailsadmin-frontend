angular.module('directives.confirmDelete', [])
.directive('confirm', ['$modal', function($modal) {
  return {
    restrict: 'A',
    scope: {
      'action': '&confirm',
      'text': '@',
      'title': '@'
    },
    link: function(scope, elem) {
      elem.on('click', function() {
        var modalInstance = $modal.open({
          templateUrl: 'app/common/directives/confirmDelete/confirmDelete.tpl.html',
          controller: ["$scope", "$modalInstance", "text", "title", function($scope, $modalInstance, text, title) {

            $scope.text = text;
            $scope.title = title;

            $scope.ok = function () {
              $modalInstance.close(/*$scope.text*/);
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

          }],
          resolve: {
            text: function () {
              return scope.text;
            },
            title: function() {
              return scope.title;
            }
          }
        });
        modalInstance.result.then(function (/*text*/) {
          scope.action();
        }, function () {
        });
      });
    }
  };
}]);
