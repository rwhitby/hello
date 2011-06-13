enyo.kind(
{
    name: "Hello.Main",
    kind: enyo.VFlexBox,
    className: 'enyo-fit enyo-vflexbox main',
    components: [

	{kind: 'SlidingPane', flex: 1, wideWidth: 800, components: [
	     {name: 'list', width: '320px', components: [
		  {kind: wi.Header, random: [
		       {weight: 1,  tagline: 'You Say Goodbye, But I Say Hello!'}
		   ]},
		  
		  {name: 'controls', components: [
		       {name: 'htmlElement', kind: 'Item', content: 'Hello Enyo!'},
		       {name: 'csrvElement', kind: 'Item', content: 'Waiting for C Service ...'},
		       {name: 'nodeElement', kind: 'Item', content: 'Waiting for Node Service ...'}
		   ]}
	      ]}
	 ]},
		
	{name: 'cservice', kind: 'PalmService',
	 service: 'palm://org.webosinternals.hello.c/', method: 'hello',
	 onResponse: 'csrvResponse'},

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

    nodeResponse: function(inSender, inResponse, inRequest) {
	if (inResponse.returnValue === true) {
	    this.$.nodeElement.setContent(inResponse.reply);
	}
	else {
	    this.$.nodeElement.setContent("Error: "+inResponse.errorText);
	}
    }

});