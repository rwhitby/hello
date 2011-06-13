enyo.kind(
{
    name: "org.webosinternals.hello",
    kind: enyo.VFlexBox,
    components: [

	{name: 'cservice', kind: 'PalmService',
	 service: 'palm://org.webosinternals.hello.c/', method: 'hello',
	 onResponse: 'csrvResponse'},

	{name: 'nodeservice', kind: 'PalmService',
	 service: 'palm://org.webosinternals.hello.node/', method: 'hello',
	 onResponse: 'nodeResponse'},

	{name: 'htmlElement', content: 'Hello Enyo!'},
	
	{name: 'csrvElement', content: 'Waiting for C Service ...'},
	
	{name: 'nodeElement', content: 'Waiting for Node Service ...'}
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

    nodeResponse: function(inSender, inResponse, inRequest) {
	if (inResponse.returnValue === true) {
	    this.$.nodeElement.setContent(inResponse.reply);
	}
	else {
	    this.$.nodeElement.setContent("Error: "+inResponse.errorText);
	}
    }

});