angular.module( 'services.errorhandler', [])
.factory('Error', function($log, lodash, Notification) {
  return {

    catch: function(error, alert){

      /**
       * if the error we're getting is from the backend due
       * to validation issues.. handle the notification differently.
       */
      if(error.error === "E_VALIDATION"){
        $log.error(error);
        lodash.each(error.invalidAttributes, function(err){
          Notification.error({
            message: err[0].message
          });
        });

      }else{
        if(alert){
          Notification.error({
            message: error.msg,
          });
        }
      }

      if(error.type === 'error'){
        $log.error(error.type, 'Received:', error.category, 'message:', error.msg);
      }else{
        $log.info(error.type, 'Received:', error.category, 'message:', error.msg);
      }

    }
  };
});
