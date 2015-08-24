angular.module('user.model', ['lodash'])
.factory('User', function User($log, lodash, Utils, Error, $q, $sails){

  return {
    find: function(filter){
      var deferred = $q.defer();

      var params = {
        params: filter || { sort: 'id' }
      };

      $sails.get('/v1/user', params)
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(data){
        deferred.reject(data);
      });

      return deferred.promise;
    },
    resetPassword: function(user){
      var deferred = $q.defer();

      $sails.post('/v1/user/resetPassword/', { user: user })
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },
    create: function(user){
      var deferred = $q.defer();

      $sails.post('/v1/user', user)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },
    update: function(user){
      var deferred = $q.defer();

      $sails.put('/v1/user/' + user.id, user)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },
    destroy: function(user){
      var deferred = $q.defer();
      $sails.delete( '/v1/user/' + user.id )
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});
