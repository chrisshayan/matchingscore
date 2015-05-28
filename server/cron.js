SyncedCron.config({
	// Log job run details to console
	log: true,

	// Name of collection to use for synchronisation and logging
	collectionName: 'cronHistory',

	// Default to using localTime
	utc: false,

	// TTL in seconds for history records in collection to expire
	// Default is 2 days
	collectionTTL: 172800
});

SyncedCron.add({
	name: 'Pull applications matching score from vietnamworks',
	schedule: function(parser){
		// parser is a later.parse object
		return parser.text(Meteor.settings.private.cronJobSchedule);
		//return parser.text('every 30 seconds');
	},
	job: function(){
		// Call function for pulling data from API
		// Get matching score base on city and period of applications
		var period = Meteor.settings.private.matchingScoreDataTimeRange;
		var results = true;

		// Get matching score for all locations
		debuger('Get matching score for all locations...');
		var cityId = -1; // all cities
		results &= pullMatchingScores(cityId, period);

		// Get matching cores for Ha Noi
		debuger('Get matching score for Ha Noi...');
		cityId = 24;
		results &= pullMatchingScores(cityId, period);

		// Get matching cores for Ho Chi Minh
		debuger('Get matching score for Ho Chi Minh...');
		cityId = 29;
		results &= pullMatchingScores(cityId, period);

		debuger('Get matching score for current quick search locations...');
		var currentCities = CurrentViewCities.find({expiredOn: {$gt: new Date()}}).fetch();

		_.each(currentCities, function(currentCity){
			if(!(currentCity.cityId == -1 | currentCity.cityId == 24 | currentCity.cityId == 29)){
				results &= pullMatchingScores(currentCity.cityId, period);
			}
		})

		debuger('All pull success: ' + results);
	}
});