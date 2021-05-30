var Splashscreen = WebApp._extend('WebApp.Splashscreen', function () {
    var myapp = {
    	duration : 1,
    	variation : 0.1,
    	delay: 0.5,
    };
    return myapp;
});

Splashscreen._show = function() {
	var splash = document.getElementById('splashscreen');
	if(splash) {
		WebApp._log("Showing Splashscreen");
		splash.style.display = 'block';
	}
};

Splashscreen._hide = function() {
	setTimeout(function() {
		var splash = document.getElementById('splashscreen');
		if(splash) {
			WebApp._log("Hidding Splashscreen");
			if(splash.style.opacity == "")
		        splash.style.opacity = 1;
		    
		    //duration in seconds
		    var duration = Splashscreen.duration;
		    var variation = Splashscreen.variation;
		    var timeout = duration * 1000 * variation;
		    var tick = function () {
		        var opacity = parseFloat(splash.style.opacity).toFixed(1);
		        opacity -= variation;

		        if (opacity > 0)
		            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, timeout);
		        else {
		            opacity = 0;
		            splash.style.display = "none";
		        }
		        splash.style.opacity = opacity;
		    };
		    tick();
		}
	}, this.delay * 1000);
};