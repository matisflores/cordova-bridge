//configs
var configs = {
    name : 'cordova-bridge',
};

//bindings
WebApp._bind("Cordova.deviceready", function() {
	//checkeo de conexion
	if(navigator && navigator.connection && navigator.connection.type) {
		if(navigator.connection.type == Connection.NONE) {
			WebApp._error('Device is not connected to internet');
			navigator.notification.alert('No hay conexion a internet.\nRevise su conexion y vuelva a intentarlo.', null, "BilleteraPais", "Cerrar");
		} else
			launch();
	} else {
		WebApp._error('Navigator not founded');
		launch();
	}
});

/*WebApp._bind("WebApp.loaded", function(){
	WebApp.Splashscreen._hide();
});*/

WebApp._bind("WebApp.unconfigured", function(){
	WebApp._error('WebApp not configured');
	WebApp.Splashscreen._hide();
});

WebApp._bind("body.unload", function(){
	WebApp.Splashscreen._show();
});

function launch() {
	var url = '/embedded/index.html';
		var bind = WebApp._bind('Parser.parsed', function() {
        WebApp.Splashscreen._hide();
        WebApp._unbind('Parser.parsed', bind);
		var embedded = WebApp.Embedded('container', function(data) {
			if(data && data.cmd) {// && WebApp.Cordova._checkCmd(data.cmd)) {
				if(data.cmd == 'Embedded.Initialized') {
					//WebApp.Splashscreen._hide();
				} else {
	                data.result = WebApp.Cordova._call(data.cmd, data.params || []);
	                WebApp._log('Message result: ' + JSON.stringify(data.result));
	                embedded._send(data);
	            }
            }
		});
	})
	WebApp._parse('home', 'wrapper', { url: url });
}

function handleOpenURL(url) {
	setTimeout(function() {
		WebApp._dispatch("WebApp.url", url);
	}, 0);
}
