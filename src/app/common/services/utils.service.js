angular.module( 'services.utils', ['lodash'])
.service('Utils', function($log, lodash, Config) {
	return {
		prepareUrl: function(uriSegments, disableVersion) {

      if (!lodash.has(Config, 'api')) {
        $log.error('No API information defined in Config');
			}else{
				var url;
				if(Config.api.ssl){
					url = 'https://';
				}else{
					url = 'http://';
				}

				url = url + Config.api.host;

				if(Config.api.port){
					url = url + ':' + Config.api.port;
				}

				if(!disableVersion){
					url = url + '/' + Config.api.version;
				}

				if(uriSegments){
	        if( lodash.startsWith(uriSegments, '/') ){
	          url = url + uriSegments;
	        }else{
	          url = url + "/" + uriSegments;
	        }
				}


        return url;
			}

		},
	};

});
