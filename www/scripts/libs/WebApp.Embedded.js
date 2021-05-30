WebApp.Embedded = function (element, handler) {
	var myapp = {
        embedded : null,
        guid : WebApp._guid(),
        handler: handler,
        _initialize : function(element, handler) {
            this.handler = handler || null;
            if(element && element.postMessage) {
                element.postMessage({ cmd: 'Embedded.Initialize', params: { guid: this.guid } }, '*');
                return true;
            } else {
                if(typeof element == 'string')
                    element = document.getElementById(element)
                element = element || document.getElementById('container');
                if(element && element.contentWindow) {
                    var guid = this.guid;
                    element.onload = function() {
                        element.contentWindow.postMessage({ cmd: 'Embedded.Initialize', params: { guid: guid } }, '*');
                    };
                    return true;
                }
            }
            return false;
        },
        _send : function (message, origin) {
            origin = origin || '*';
            WebApp._log('Embedded Send: ' + (typeof message == 'string' ? message : JSON.stringify(message)));
            if(this.embedded)
                this.embedded.postMessage(message, origin);
        },
        _receive : function(event) {
            if(event && event.data && event.data.cmd && event.data.cmd == 'Embedded.Initialized' && event.data.params && event.data.params.guid && event.data.params.guid == this.guid) {
                this.embedded = event.source;
            }
            if(this.embedded && event && event.data && event.data.cmd && this.handler) {
                WebApp._log('Embedded Receive: ' + JSON.stringify(event.data));
                this.handler(event.data);
            }
        },
    };

    WebApp._bind("Window.message", function(event) { myapp._receive(event); });
    WebApp._bind("WebApp.event", function(data) {
        if(data.event != 'Window.message' && data.data != undefined) {
            WebApp._log('Embedded event: ' + JSON.stringify(data));
            if(data.data.isTrusted != undefined)
                data.data = {};
            myapp._send(data);
        }
    });
    myapp._initialize(element, handler);
    return myapp;
};