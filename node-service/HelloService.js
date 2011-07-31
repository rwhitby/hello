// Since Command Assistants are only around for the duration of processing a request, 
// we store more-persistent state in our Service Assistant object so it is available between requests.
function HelloService() {
}

HelloService.prototype = {
	// The setup() function is run when the service starts up
	// If the setup needs to do anything asynchronous, it should return a Future
	setup: function() {
		this._enabled = false;
	},
	
	setEnabled: function() {
		this._enabled = true;
	},
	
	getEnabled: function() {
		return this._enabled;
	},
	
	resetEnabled: function() {
		this._enabled = false;
	},
};
