Meteor.startup(function(){
	// Start cron to pull application matching score from vietnamworks
	SyncedCron.start();
});