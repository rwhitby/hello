enyo.kind(
{
    name: "Hello.Main",
    kind: enyo.VFlexBox,
    className: 'enyo-fit enyo-vflexbox main',
    components: [

	{kind: wi.Header, random: [
	     {weight: 1,  tagline: 'You Say Goodbye, But I Say Hello!'}
	 ]},
	
	{name: 'enyoElement', kind: 'Item', content: 'Hello Enyo!'},
	{name: 'csrvElement', kind: 'Item', content: 'Waiting for C Service ...'},
	{name: 'pluginElement', kind: 'Item', content: 'Waiting for PDK Plugin ...'},
	{name: 'nodeElement', kind: 'Item', content: 'Waiting for Node Service ...'},
		
	{name: 'cservice', kind: 'PalmService',
	 service: 'palm://org.webosinternals.hello.c/', method: 'hello',
	 onResponse: 'csrvResponse'},

	{name: 'pluginObject', kind: enyo.Hybrid, executable: 'c-plugin/hello',
	 onPluginReady: 'pluginReady'},

	{name: 'nodeservice', kind: 'PalmService',
	 service: 'palm://org.webosinternals.hello.node/', method: 'hello',
	 onResponse: 'nodeResponse'}
    ],
    
    rendered: function() {
	this.inherited(arguments);
	this.$.csrvElement.setContent("Calling C Service ...");
	this.$.cservice.call({'name':'C Service'});
	this.$.nodeElement.setContent("Calling Node Service ...");
	this.$.nodeservice.call({'name':'Node Service'});
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
	    this.$.nodeElement.setContent(inResponse.reply);
	}
	else {
	    this.$.nodeElement.setContent("Error: "+inResponse.errorText);
	}
    }

});