Meteor.publish('matchingscores', function (city) {
	if(city == 'null' || city == 'undefined' || city == 0){
		city = -1;
	}
	city = parseInt(city, 10);
    return MatchingScores.find({cityId: city});
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

	if(CurrentViewCities.find({cityId: city}).count() == 1) {
		extendCurrentViewCity(city);
	} else {
		insertCurrentViewCity(city);
	}

	//Check if data existent for searched city, if existed, check updated date.
	searchResult = MatchingScores.findOne({cityId: city});
	var period = 43200;
	if (searchResult){
		dataUpdatedOn = new Date(searchResult.updateDate);
		console.log('Data updated on ' + dataUpdatedOn);

		curDate = new Date();
		if (dataUpdatedOn < curDate.setMinutes(curDate.getMinutes() - 2)){
			console.log("Pull matching score for outdated city id " + city);
			pullMatchingScores(city, period);
		}
	} else {
		console.log("Pull matching score for city id " + city);
		pullMatchingScores(city, period);
	}
	
	return MatchingScores.find({cityId: city, industryId: industry});
});

Meteor.publish('callmebackusers', function () {
    return callMeBackUsers.find();
});

// Publish master categories data collection
Meteor.publish('masterdata', function(){
    return MasterData.find();
});