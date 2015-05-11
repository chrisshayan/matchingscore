Meteor.startup(function(){
	// Initialize Master Data
	pullMasterData();

	// Initialize data for matching score
	if(MatchingScores.find().count() == 0){
		console.log('Initialize data');
		initializeMatchingScores(43200);
	}

	// Start cron to pull application matching score from vietnamworks
	SyncedCron.start();
});