Meteor.publish('matchingscores', function (city) {
	if(city == 'null' || city == 'undefined' || city == 0){
		city = -1;
	}

    return MatchingScores.find({cityId: parseInt(city, 10)});
});

Meteor.publish('callmebackusers', function () {
    return callMeBackUsers.find();
});

// Publish master categories data collection
Meteor.publish('masterdata', function(){
    return MasterData.find();
});