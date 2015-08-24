angular.module('directives.ngSidebar', [

])
.directive('ngSidebar', function($state, lodash, Auth) {
  return {
    restrict: 'A',
    templateUrl: 'app/common/directives/ngSidebar/ngSidebar.tpl.html',
    link: function($scope) {

      var defaults = {
        link : {
          type       : 'link',
          isDropdown : false
        },
        group : {
          align : 'left'
        }
      };

      var compileConfigs = function(allStates){
        return lodash.chain(allStates)
          .filter(function(state){
            return lodash.has(state, 'data') && lodash.has(state.data, 'navs');
          }).map(function(state){
            var defaultConfig = lodash.extend({},defaults.link),
                navConfig     = lodash.extend(defaultConfig, state.data.navs, { accessLevels: state.data.access }),
                origState     = angular.copy(state);
            delete origState.data;
            return lodash.extend(navConfig, {_state : origState});
          }).value();
      };

      var stateConfigs = compileConfigs( $state.get() );
      $scope.links = stateConfigs;

      $scope.isAuthorized = function(accessLevel){
        return Auth.isAuthorized(accessLevel);
      };

      $scope.isCurrentState = function(stateName){ // better than ui-sref-active as it's a fuzzy state
          return $state.is(stateName) || $state.includes(stateName + '.*');
      };
    }
  };
});
