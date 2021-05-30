//https://github.com/arnesson/cordova-plugin-firebase
var Barcodescanner = WebApp._extend('WebApp.Barcodescanner', function () {
	var myapp = {
		token : null,
	};
    WebApp._bind("Cordova.deviceready", function(e) { Barcodescanner._init() });
    return myapp;
});

Barcodescanner._init = function () {
	if(cordova.plugins.barcodeScanner) {
		Barcodescanner._scan = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					WebApp._log("Barcodescanner success: " + JSON.stringify(result));
					WebApp._dispatch("Barcodescanner.scan_success", result);
				},
                function(error) {
                	WebApp._error("Barcodescanner error: " + error);
					WebApp._dispatch("Barcodescanner.scan_error", error);
				},
                {
                    preferFrontCamera: false, // iOS and Android
                    showFlipCameraButton: true, // iOS and Android
                    showTorchButton: true, // iOS and Android
                    torchOn: true, // Android, launch with the torch switched on (if available)
                    prompt: "Posicione el codigo dento del area delimitada", // Android
                    resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    //formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                    //orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations: true, // iOS
                    disableSuccessBeep: false // iOS
                }
			);
			return true;
		};
	} else {
		delete WebApp.Barcodescanner;
		Barcodescanner = null;
		WebApp._error('Barcodescanner no encontrado');
		WebApp._dispatch("Barcodescanner.error");
	}
};