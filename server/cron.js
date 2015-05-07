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
		return parser.text('every 5 minutes');
	},
	job: function(){
		//
		pullMatchingScores(43200);
	}
});