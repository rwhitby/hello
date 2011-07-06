// stage names
var mainStageName = 'hello-main';

function AppAssistant() {}

AppAssistant.prototype.handleLaunch = function(params)
{
//	console.log(JSON.stringify(params))
    var mainStageController = this.controller.getStageController(mainStageName);
    
    try {
	if (!params) {
	    if (mainStageController) {
		mainStageController.popScenesTo('main');
		mainStageController.activate();
	    }
	    else {
		this.controller.createStageWithCallback({name: mainStageName, lightweight: true},
							this.launchFirstScene.bind(this));
	    }
	}
    }
    catch (e) {
	Mojo.Log.logException(e, "AppAssistant#handleLaunch");
    }
};

AppAssistant.prototype.launchFirstScene = function(controller)
{
    controller.pushScene('main');
};
