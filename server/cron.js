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
		return parser.text('every 2 minutes');
		//return parser.text('every 30 seconds');
	},
	job: function(){
		// Call function for pulling data from API
		// Get matching score base on city and period of applications
		var period = 43200; // 30 days

		// Get matching score for all locations
		var cityId = -1; // all cities
		pullMatchingScores(cityId, period);

		// Get matching cores for Ha Noi
		cityId = 24;
		pullMatchingScores(cityId, period);

		// Get matching cores for Ho Chi Minh
		cityId = 29;
		pullMatchingScores(cityId, period);

		var currentCities = CurrentViewCities.find({expiredOn: {$gt: new Date()}}).fetch();

		_.each(currentCities, function(currentCity){
			if(!(currentCity.cityId == -1 | currentCity.cityId == 24 | currentCity.cityId == 29)){
				pullMatchingScores(currentCity.cityId, period);
				console.log("Got matching score for location " + currentCity.cityId);
			}
		})
	}
});