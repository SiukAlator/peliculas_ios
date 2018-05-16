var Config = require('/libs/Config');



exports.getRank = function(callback, params) {
	//TODO
	if (Config.mode == 0) {
		Ti.API.info('xhr.getRank->params: ' + JSON.stringify(params));
	}
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			if (Config.mode == 0) {
				Ti.API.info('xhr.getRank: ' + this.responseText);
			}
			var json = JSON.parse(this.responseText);
			callback(json);
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
			callback(false);
		},
		timeout : Config.timeOut
	});

	var paramsBody = {
		api_key : params['token']
	};
	Ti.API.info('paramsBody: ' + JSON.stringify(paramsBody));

	client.open('POST', Config.SERVER_BASE_URL + 'top_rated');
	client.send(paramsBody);
};

exports.getPop = function(callback, params) {
	//TODO
	if (Config.mode == 0) {
		Ti.API.info('xhr.getRank->params: ' + JSON.stringify(params));
	}
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			if (Config.mode == 0) {
				Ti.API.info('xhr.getRank: ' + this.responseText);
			}
			var json = JSON.parse(this.responseText);
			callback(json);
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
			callback(false);
		},
		timeout : Config.timeOut
	});

	var paramsBody = {
		api_key : params['token']
	};
	Ti.API.info('paramsBody: ' + JSON.stringify(paramsBody));

	client.open('POST', Config.SERVER_BASE_URL + 'popular');
	client.send(paramsBody);
};