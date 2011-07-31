enyo.kind(
    {
	name: "Hello.Main",
	kind: enyo.VFlexBox,
	className: 'enyo-fit enyo-vflexbox main',
	published: {
	    deviceName:"Enyo Hello! App",
		touched:0,
		request:false
	},
	components: [
	    { kind: "ApplicationEvents", onApplicationRelaunch: "applicationRelaunchHandler" },
	    
	    { kind: wi.Header, random: [
		  { weight: 1,  tagline: 'You Say Goodbye, But I Say Hello!' }
	      ] },
	    
	    { name: 'enyoElement',   kind: 'Item', content: 'Hello Enyo!' },
	    { name: 'csrvElement',   kind: 'Item', content: 'Waiting for C Service ...' },
	    { name: 'pluginElement', kind: 'Item', content: 'Waiting for PDK Plugin ...' },
	    { name: 'nodeElement',   kind: 'Item', content: 'Waiting for Node Service ...' },
	    { name: 'nodeShellElement',   kind: 'Item', content: 'Waiting for Node Shell Service ...' },
	    { name: 'nodeSubscribeElement',   kind: 'Item', content: 'Waiting for Node Subscribe Service ...' },
	    { name: 'touchElement',  kind: 'Item', content: 'Waiting for Touch to Share ...' },
	    
	    { name: 'cservice', kind: 'PalmService',
	      service: 'palm://org.webosinternals.hello.c/', method: 'hello',
	      onResponse: 'csrvResponse' },
	    { name: 'pluginObject', kind: enyo.Hybrid, executable: 'c-plugin/hello',
	      onPluginReady: 'pluginReady' },
	    { name: 'nodeservice', kind: 'PalmService',
	      service: 'palm://org.webosinternals.hello.node/', method: 'hello',
	      onResponse: 'nodeResponse' },
	    { name: 'nodeshellservice', kind: 'PalmService',
	      service: 'palm://org.webosinternals.hello.node/', method: 'helloShell',
	      onResponse: 'nodeShellResponse' },
	    { name: 'nodesubscribeservice', kind: 'PalmService', subscribe: true,
	      service: 'palm://org.webosinternals.hello.node/', method: 'helloSubscribe',
	      onResponse: 'nodeSubscribeResponse' },
	    { name: 'touchservice', kind: 'PalmService',
	      service: 'palm://com.palm.stservice/', method: 'shareData',
	      onResponse: 'touchResponse' },
	    { name: 'nameservice', kind: 'PalmService',
	      service: 'palm://com.palm.systemservice/', method: 'getPreferences',
	      onResponse: 'nameResponse' }
	],

	applicationRelaunchHandler: function(params) {
	    var curwin = enyo.windows.getActiveWindow();
	    if (curwin && enyo.windowParams.sendDataToShare) {
		curwin.enyo.$.main.touchShareData();
	    }
	    else if (curwin && enyo.windowParams.target) {
		var string = enyo.windowParams.target.substring(21);
		curwin.enyo.$.main.touchDisplay(string);
	    }
	},

	rendered: function() {
	    this.inherited(arguments);
	    this.$.csrvElement.setContent("Calling C Service ...");
	    this.$.cservice.call({ 'name': 'C Service' });
	    this.$.nodeElement.setContent("Calling Node Service ...");
	    this.$.nodeservice.call({ 'name': 'Node Service' });
	    this.$.nameservice.call({ 'keys': ["deviceName"] });
	    this.$.nodeShellElement.setContent("Calling Node Shell Service ...");
	    this.$.nodeshellservice.call({ 'name': 'Node Shell Service' });
	    this.$.nodeSubscribeElement.setContent("Calling Node Subscribe Service ...");
	    this.$.nodesubscribeservice.call({ 'name': 'Node Subscribe Service' });
	},
	
	nameResponse: function(inSender, inResponse, inRequest) {
	    if (inResponse.returnValue === true) {
		this.deviceName = inResponse.deviceName;
	    }
	    else {
		this.deviceName = "Unknown Device";
	    }
	},

	csrvResponse: function(inSender, inResponse, inRequest) {
	    if (inResponse.returnValue === true) {
		this.$.csrvElement.setContent(inResponse.reply);
	    }
	    else {
		this.$.csrvElement.setContent("Error: "+inResponse.errorText);
	    }
	},

	pluginReady: function(inSender, inResponse, inRequest) {
	    this.$.pluginElement.setContent("Calling PDK Plugin ...");
	    this.$.pluginObject.callPluginMethodDeferred(enyo.bind(this, "pluginResponse"), "hello", "PDK Plugin");
	},

	pluginResponse: function(response) {
	    this.$.pluginElement.setContent(response);
	},

	nodeResponse: function(inSender, inResponse, inRequest) {
	    if (inResponse.returnValue === true) {
		if (inResponse.stdout) {
		    this.$.nodeElement.setContent(inResponse.stdout);
		}
	    }
	    else {
		this.$.nodeElement.setContent("Error "+inResponse.errorCode+": "+inResponse.errorText);
	    }
	},

	nodeShellResponse: function(inSender, inResponse, inRequest) {
	    if (inResponse.returnValue === true) {
		if (inResponse.stdout) {
		    this.$.nodeShellElement.setContent(inResponse.stdout);
		}
	    }
	    else {
		this.$.nodeShellElement.setContent("Error "+inResponse.errorCode+": "+inResponse.errorText);
	    }
	},

	nodeSubscribeResponse: function(inSender, inResponse, inRequest) {
	    if (inResponse.returnValue === true) {
		if (inResponse.stdout) {
		    this.$.nodeSubscribeElement.setContent(inResponse.stdout);
		}
	    }
	    else {
		this.$.nodeSubscribeElement.setContent("Error "+inResponse.errorCode+": "+inResponse.errorText);
	    }
	},

	touchShareData: function() {
	    this.$.touchElement.setContent("Calling Touch to Share ...");
	    this.$.touchservice.call(
				     { data: { target: "http://hello.wosi.ws/"+encodeURIComponent(this.deviceName),
						 type: "rawdata", mimetype: "text/html" } }
	    );
	},

	touchResponse: function(inSender, inResponse, inRequest) {
	    if (inResponse.returnValue === true) {
		this.touched ++;
		if (this.touched == 1) {
		    this.$.touchElement.setContent("Hello Touch to Share!");
		}
		else {
		    this.$.touchElement.setContent("Hello "+this.touched+" Times, Touch to Share!");
		}
	    }
	    else {
		this.$.touchElement.setContent("Error: "+inResponse.errorText);
	    }
	},

	touchDisplay: function(string) {
	    this.$.touchElement.setContent("Hello "+decodeURIComponent(string)+"!");
	}
    }
);