angular.module('ngAlerts.service', [])
.factory('Alert', function($log, lodash) {
  return {
    alerts: [],
    add: function(message){

      if(message.type === 'error'){
        message.type = 'danger';
      }

      var alert = {
        title: message.title,
        message: message.message,
        type: message.type.toLowerCase(),
        category: message.category,
        options: {
          sticky: false,
          dismissable: false
        }
      };

      lodash.merge(alert.options, message.options);
      this.alerts.push(alert);
    },
    close: function($index){
      this.alerts.splice($index, 1);
    },
    clearAll: function(){
      this.alerts = [];
    },
    clear: function(){
      this.alerts = lodash.filter(this.alerts, function(alert){
        return alert.options.sticky === true;
      });
    }
  };
});
