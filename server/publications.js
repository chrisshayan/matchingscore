Meteor.publish('matchingscores', function(){
	return MatchingScores.find();
});