Meteor.startup(function(){
	// Initialize Master Data
	console.log('Initialize data');
	pullMasterData();

	// Initialize data for matching score
	if(MatchingScores.find().count() == 0){
		initializeMatchingScores(Meteor.settings.private.matchingScoreDataTimeRange);
	}

	// Start cron to pull application matching score from vietnamworks
	SyncedCron.start();
});