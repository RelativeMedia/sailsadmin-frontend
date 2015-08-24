angular.module('lodash', [])
.factory('lodash', function() {
	return window._; // assumes lodash has already been loaded on the page
});
