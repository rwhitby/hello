function MainAssistant() {
    this.activated = false;
    this.touched = 0;
    this.deviceName = "Mojo Hello! App";
};

MainAssistant.prototype.setup = function() {
    this.controller.get('main-title').innerHTML = $L('Hello!');
    this.controller.get('version').innerHTML = $L("v" + Mojo.Controller.appInfo.version);
    this.controller.get('subTitle').innerHTML = $L('You Say Goodbye, But I Say Hello!');	

    this.htmlElement = this.controller.get('htmlDiv');
    this.csrvElement = this.controller.get('csrvDiv');
    this.pluginElement = this.controller.get('pluginDiv');
    this.pluginObject = this.controller.get("pluginObject");
    this.nodeElement = this.controller.get('nodeDiv');
    this.nodeShellElement = this.controller.get('nodeShellDiv');
    this.nodeSubscribeElement = this.controller.get('nodeSubscribeDiv');
    this.touchElement = this.controller.get('touchDiv');
};

MainAssistant.prototype.activate = function(params)
{

    console.log("activate: "+JSON.stringify(params));

    if (!this.activated) {
	this.htmlElement.innerHTML = "Hello Mojo!";

	if (true) {
	    this.csrvElement.innerHTML = "Calling C Service ...";
	    this.controller.serviceRequest('palm://org.webosinternals.hello.c', {
					       method: "hello",
					       parameters: {"name": "C Service"},
					       onSuccess: this.csrvSuccess.bind(this),
					       onFailure: this.csrvFailure.bind(this)
					   });
	}
	else {
	    this.csrvElement.innerHTML = "C Service not available.";
	}

	this.pluginElement.innerHTML = "Waiting for PDK Plugin ...";
	this.pluginObject.ready = this.pluginReady.bind(this);
	
	if (Mojo.Environment.DeviceInfo.platformVersionMajor != 1) {
	    this.nodeElement.innerHTML = "Calling Node Service ...";
	    this.controller.serviceRequest('palm://org.webosinternals.hello.node', {
		    method: "hello",
			parameters: {"name": "Node Service"},
			onSuccess: this.nodeSuccess.bind(this, this.nodeElement),
			onFailure: this.nodeFailure.bind(this, this.nodeElement)
			});
	    this.nodeShellElement.innerHTML = "Calling Node Shell Service ...";
	    this.controller.serviceRequest('palm://org.webosinternals.hello.node', {
		    method: "helloShell",
			parameters: {"name": "Node Shell Service"},
			onSuccess: this.nodeSuccess.bind(this, this.nodeShellElement),
			onFailure: this.nodeFailure.bind(this, this.nodeShellElement)
			});
	    this.nodeSubscribeElement.innerHTML = "Calling Node Subscribe Service ...";
	    this.controller.serviceRequest('palm://org.webosinternals.hello.node', {
		    method: "helloSubscribe",
			parameters: {"name": "Node Subscribe Service", "subscribe": true},
			onSuccess: this.nodeSuccess.bind(this, this.nodeSubscribeElement),
			onFailure: this.nodeFailure.bind(this, this.nodeSubscribeElement)
			});
	}
	else {
	    this.nodeElement.innerHTML = "Node Service not available.";
	    this.nodeShellElement.innerHTML = "Node Shell Service not available.";
	    this.nodeSubscribeElement.innerHTML = "Node Subscribe Service not available.";
	}

	this.controller.serviceRequest('palm://com.palm.systemservice', {
		method: "getPreferences",
		    parameters: {"keys": ["deviceName"]},
		    onSuccess: this.deviceNameSuccess.bind(this),
		    onFailure: this.deviceNameFailure.bind(this)
		    });

	this.activated = 1;
    }
    else if (params.sendDataToShare) {
	this.touchElement.innerHTML = "Calling Touch to Share ...";
	this.controller.serviceRequest('palm://com.palm.stservice', {
					   method:  "shareData",
					   parameters: {
		    data: { target: "http://hello.wosi.ws/"+encodeURIComponent(this.deviceName),
			    type: "rawdata", mimetype: "text/html" }
					   },
					   onSuccess: this.touchSuccess.bind(this),
					   onFailure: this.touchFailure.bind(this)
				       });
    }
    else if (params.target) {
	var string = params.target.substring(21);
	this.touchElement.innerHTML = "Hello "+decodeURIComponent(string)+"!";
    }
};

MainAssistant.prototype.deviceNameSuccess = function(successData){
    this.deviceName = successData.deviceName;
};

MainAssistant.prototype.deviceNameFailure = function(failData){
    this.deviceName = "Unknown Device";
};

MainAssistant.prototype.nodeSuccess = function(element, successData){
    if (successData.stdout) {
	element.innerHTML = successData.stdout;
    }
};

MainAssistant.prototype.nodeFailure = function(element, failData){
    element.innerHTML = "Error "+failData.errorCode+": "+failData.errorText;
};

MainAssistant.prototype.csrvSuccess = function(successData){
    this.csrvElement.innerHTML = successData.reply;
};

MainAssistant.prototype.csrvFailure = function(failData){
    this.csrvElement.innerHTML = JSON.stringify(failData);
};

MainAssistant.prototype.pluginReady = function(){
    this.pluginElement.innerHTML = "Calling PDK Plugin ...";
    setTimeout(this.callPlugin.bind(this), 0);
};

MainAssistant.prototype.callPlugin = function(){
    this.pluginElement.innerHTML = this.pluginObject.hello("PDK Plugin");
};

MainAssistant.prototype.touchSuccess = function(successData){
    this.touched ++;
    if (this.touched == 1) {
	this.touchElement.innerHTML = "Hello Touch to Share!";
    }
    else {
	this.touchElement.innerHTML = "Hello "+this.touched+" Times, Touch to Share!";
    }
};

MainAssistant.prototype.touchFailure = function(failData){
    this.touchElement.innerHTML = JSON.stringify(failData);
};

