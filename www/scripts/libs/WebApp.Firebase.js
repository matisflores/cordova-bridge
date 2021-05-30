//https://github.com/arnesson/cordova-plugin-firebase
var Firebase = WebApp._extend('WebApp.Firebase', function () {
	var myapp = {
		token : null,
	};
    WebApp._bind("Cordova.deviceready", function(e) { Firebase._init() });
    return myapp;
});

Firebase._init = function () {
	if(window.FirebasePlugin) {
		window.FirebasePlugin.onTokenRefresh(function(token) {
			WebApp._log("Firebase Token Refresh: " + token);
			Firebase.token = token;
			WebApp._dispatch("Firebase.token_refresh", token);
		}, function(error) {
			WebApp._error("Firebase Token Error: " + error);
			Firebase.token = null;
		    WebApp._dispatch("Firebase.token_error", error);
		});

		window.FirebasePlugin.onNotificationOpen(function(notification) {
		    WebApp._log("Firebase Notification Open: " + JSON.stringify(notification));
			WebApp._dispatch("Firebase.notification_open", notification);
		}, function(error) {
		    WebApp._error("Firebase Notification Error: " + error);
		    WebApp._dispatch("Firebase.notification_error", error);
		});

		if(window.FirebasePlugin.hasPermission) {
			window.FirebasePlugin.hasPermission(function(data) {
				WebApp._log("Firebase Has Permission: " + data.isEnabled);
			    if(!data.isEnabled && window.FirebasePlugin.grantPermission)
			    	window.FirebasePlugin.grantPermission();
			});
		}
		
		Firebase._setBadge = function(number) {
			WebApp._log("Firebase Set Badge: " + number);
			window.FirebasePlugin.setBadgeNumber(number);
		};

		Firebase._getBadge = function(callback) {
			WebApp._log("Firebase get Badge");
			window.FirebasePlugin.getBadgeNumber(callback);
		};

		Firebase._subscribe = function(topic) {
			WebApp._log("Firebase Suscribe: " + topic);
			window.FirebasePlugin.subscribe(topic);
		};

		Firebase._unsubscribe = function(topic) {
			WebApp._log("Firebase Unsuscribe: " + topic);
			window.FirebasePlugin.unsubscribe(topic);
		};
	} else {
		delete WebApp.Firebase;
		Firebase = null;
		WebApp._error('FirebasePlugin no encontrado');
		WebApp._dispatch("Firebase.error");
	}
};