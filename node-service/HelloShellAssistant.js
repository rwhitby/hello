var exec = require('child_process').exec;

var HelloShellAssistant = function() {
};
  
HelloShellAssistant.prototype.run = function(future) {  
    var args = this.controller.args;

    console.log("HelloShell: Hello " + this.controller.args.name + "!");
    console.log("HelloShell: Called by "+this.controller.message.applicationID().split(" ")[0]+
		" via "+this.controller.message.senderServiceName());

    var cmd = "echo Hello " + this.controller.args.name + "!";

    console.log("HelloShell: Running command: "+cmd);

    exec(cmd, function(error, stdout, stderr) {
	    if (error !== null) { 
		error.errorCode = error.code;
		future.exception = error;
	    }
	    else {
		future.result = { stdout: stdout, stderr: stderr };
	    }
	});
};
