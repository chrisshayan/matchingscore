debuger = function(message, level){
	if(isNaN(level)){
		level = 1
	}
	if(Meteor.settings.private.debug & Meteor.settings.private.debugLevel == level){
		console.log(message);
	}
};