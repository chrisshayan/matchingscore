Meteor.publish('matchingscores', function (city, loadAllowed) {
	if(city == 'null' || city == 'undefined' || city == 0){
		city = -1;
	}
	city = parseInt(city, 10);

	if(loadAllowed == 'null' || loadAllowed == 'undefined' || loadAllowed == 0){
		loadAllowed = 6;
	}
	loadAllowed = parseInt(loadAllowed);
	
    return MatchingScores.find({cityId: city}, {limit: loadAllowed});
});

Meteor.publish('msquicksearch', function (city, industry) {
	if(city == 'null' || city == 'undefined'){
		city = 0;
	}
	city = parseInt(city, 10);

	if(industry == 'null' || industry == 'undefined'){
		industry = 0;
	}
	industry = parseInt(industry, 10);

	if(CurrentViewCities.find({cityId: city}).count() == 0) {
		insertCurrentViewCity(city);
	}

	pullSearchMatchingScore(city);
	
	return getSearchMatchingScore(city, industry);
});

Meteor.publish('callmebackusers', function () {
    return callMeBackUsers.find();
});

// Publish master categories data collection
Meteor.publish('masterdata', function(){
    return MasterData.find();
});