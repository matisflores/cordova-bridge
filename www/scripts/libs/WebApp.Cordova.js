var WACordova = WebApp._extend('WebApp.Cordova', function () {
	document.addEventListener('deviceready', function (e) { WebApp._dispatch("Cordova.deviceready", e); });
    document.addEventListener('pause', function (e) { WebApp._dispatch("Cordova.pause", e); });
    document.addEventListener('resume', function (e) { WebApp._dispatch("Cordova.resume", e); });
    document.addEventListener('backbutton', function (e) { WebApp._dispatch("Cordova.backbutton", e); });
    document.addEventListener('menubutton', function (e) { WebApp._dispatch("Cordova.menubutton", e); });
    document.addEventListener('searchbutton', function (e) { WebApp._dispatch("Cordova.searchbutton", e); });
    document.addEventListener('startcallbutton', function (e) { WebApp._dispatch("Cordova.startcallbutton", e); });
    document.addEventListener('endcallbutton', function (e) { WebApp._dispatch("Cordova.endcallbutton", e); });
    document.addEventListener('volumedownbutton', function (e) { WebApp._dispatch("Cordova.volumedownbutton", e); });
    document.addEventListener('volumeupbutton', function (e) { WebApp._dispatch("Cordova.volumeupbutton", e); });
    document.addEventListener('activated', function (e) { WebApp._dispatch("Cordova.activated", e); });

    setTimeout('WACordova._init()', 100);

	var myapp = {
		plugins: [],
	};

    return myapp;
});

WACordova._init = function () {
	//device
	if(window['device'])
		this.plugins.push('device');
};

WACordova._checkCmd = function (target) {
	WebApp._log('Cordova check: ' + target);
	for(var i in this.plugins) {
		if(target.indexOf(this.plugins[i] + '.') == 0)
			return true;
	}
	return false;
};

WACordova._call = function (target, params) {
	var parts = target.split('.');
	var i = 0;
	var last = null;
	var obj = window;
	WebApp._log('Cordova call: ' + target);
	while(obj[parts[i]] && i < parts.length) {
		last = obj;
		obj = obj[parts[i]];
		i++;
	}
	if(obj && i == parts.length)
		if(typeof obj == 'function')
			return obj.apply(last, params);
		else
			return obj;

	return null;
};