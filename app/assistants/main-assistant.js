function MainAssistant() {
}

MainAssistant.prototype.setup = function() {
    this.controller.get('main-title').innerHTML = $L('Hello!');
    this.controller.get('version').innerHTML = $L("v" + Mojo.Controller.appInfo.version);
    this.controller.get('subTitle').innerHTML = $L('You Say Goodbye, But I Say Hello!');	

    this.htmlElement = this.controller.get('htmlDiv');
    this.csrvElement = this.controller.get('csrvDiv');
    this.pluginElement = this.controller.get('pluginDiv');
    this.pluginObject = this.controller.get("pluginObject");
    this.nodeElement = this.controller.get('nodeDiv');
};

MainAssistant.prototype.activate = function(event) {

    this.htmlElement.innerHTML = "Hello HTML!";

    this.csrvElement.innerHTML = "Calling C Service ...";
    this.controller.serviceRequest('palm://org.webosinternals.hello.c', {
      method:"hello",
      parameters:{"name":"C Service"},
      onSuccess:this.csrvSuccess.bind(this),
      onFailure:this.csrvFailure.bind(this)
    });

    this.pluginElement.innerHTML = "Waiting for PDK Plugin ...";
    this.pluginObject.ready = this.pluginReady.bind(this);

    if (Mojo.Environment.DeviceInfo.platformVersionMajor != 1) {
	this.nodeElement.innerHTML = "Calling Node Service ...";
	this.controller.serviceRequest('palm://org.webosinternals.hello.node', {
		method:"hello",
		    parameters:{"name":"Node Service"},
		    onSuccess:this.nodeSuccess.bind(this),
		    onFailure:this.nodeFailure.bind(this)
		    });
    }
    else {
	this.nodeElement.innerHTML = "Node Service not available.";
    }
};

MainAssistant.prototype.nodeSuccess = function(successData){
    this.nodeElement.innerHTML = successData.reply;
};

MainAssistant.prototype.nodeFailure = function(failData){
    this.nodeElement.innerHTML = JSON.stringify(failData);
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

