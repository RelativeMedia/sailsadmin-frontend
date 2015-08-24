angular.module('services.auth', ['lodash'])
.factory('Auth', function Auth($log, lodash, Utils, Error, $http, $sails, $q, $window, LocalService, AccessLevels){

  function decodeToken(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var object = $window.atob(base64);
    return JSON.parse(object);
  }

  return {
    getUserGroup: function getUserGroup(accessLevelId){
        return lodash.find(AccessLevels.groups, { id: accessLevelId });
    },
    isAuthorized: function isAuthorized(accessLevels){
      var token = LocalService.get('auth_token');
      var user = decodeToken(token);
      user.group = this.getUserGroup(user.accessLevel);
      return lodash.includes(accessLevels, user.group.name);
    },
    authorize: function authorize(access, cb){
      var token = LocalService.get('auth_token');

      if(!token && access[0] !== '*'){
        return cb({type: 'error', msg: 'Not Authenticated', category: 'NOT_LOGGED_IN'});
      }

      if(token){
        var user = decodeToken(token);
        user.group = this.getUserGroup(user.accessLevel);
        if( lodash.includes(access, '*') ){
          return cb(null, token);
        }else if( lodash.includes(access, user.group.name) ){
          return cb(null, token);
        }else{
          return cb({type: 'error', msg: 'Invalid Authorization', category: 'INVALID_AUTHORIZATION'});
        }
      }
    },

    CurrentUser: function(){
      if (LocalService.get('auth_token')) {
        var token = LocalService.get('auth_token');
        return decodeToken(token);
      } else {
        return {};
      }
    },

    /**
     * Login a user given credentials. Sets the auth_token in local
     * storage.
     *
     * @param  {object} credentials - object of user credentials
     * @return {object}             - user object
     */
    login: function login(credentials){
      var deferred = $q.defer();

      $http.post( Utils.prepareUrl('/auth/login'), credentials)
      .success(function(result){
        LocalService.set('auth_token', JSON.stringify(result.token));
        deferred.resolve(result);
      })
      .error(function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },


    resetPassword: function resetPassword(user, newPassword){
      var deferred = $q.defer();

      $http.put( Utils.prepareUrl('/auth/resetPassword/' + user.id), newPassword)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(error){
        deferred.reject(error);
      });

      return deferred.promise;

    },

    /**
     * logout a user, delete the auth_token out of local storage and
     * post to logout to invalidate the user token on the server side.
     *
     */
    logout: function logout(){
      var deferred = $q.defer();

      $http.post( Utils.prepareUrl('/auth/logout') )
      .success(function(result){
        LocalService.unset('auth_token');
        deferred.resolve(result);
      })
      .error(function(error){
        deferred.reject(error);
      });
    },

    register: function register(user){
      var deferred = $q.defer();

      $http.post( Utils.prepareUrl('/auth/register'), user)
      .success(function(result){
        LocalService.set('auth_token', JSON.stringify(result.token));
        deferred.resolve(result);
      })
      .error(function(error){
        deferred.reject(error);
      });

      return deferred.promise;

    }
  };
})
.factory('socketAuthInterceptor', function($q, $injector, lodash){
  var LocalService = $injector.get('LocalService');

  return {
    request: function(config) {
      var token;
      if (LocalService.get('auth_token')) {
        token = angular.fromJson( LocalService.get('auth_token') );
      }
      if (token) {
        lodash.merge(config, {
          data: {
            params: {
              token: token
            }
          }
        });
      }

      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        LocalService.unset('auth_token');
        $injector.get('$state').go('auth.login');
      }
      return $q.reject(response);
    }
  };
})
.factory('httpAuthInterceptor', function($q, $injector, lodash) {
  var LocalService = $injector.get('LocalService');

  return {
    request: function(config) {
      var token;
      if (LocalService.get('auth_token')) {
        token = angular.fromJson( LocalService.get('auth_token') );
      }
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        LocalService.unset('auth_token');
        $injector.get('$state').go('auth.login');
      }
      return $q.reject(response);
    }
  };
})
.config(function($httpProvider, $sailsProvider) {
  $httpProvider.interceptors.push('httpAuthInterceptor');
  $sailsProvider.interceptors.push('socketAuthInterceptor');
});
