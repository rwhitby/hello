var HelloAssistant = function() {
}
  
HelloAssistant.prototype.run = function(future) {  
    console.log("Hello: Hello " + this.controller.args.name + "!");
    console.log("Hello: Called by "+this.controller.message.applicationID().split(" ")[0]+
		" via "+this.controller.message.senderServiceName());
    future.result = { stdout: "Hello " + this.controller.args.name + "!" };
}
