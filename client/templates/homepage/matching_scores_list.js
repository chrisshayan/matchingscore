Template.matchingScoresList.helpers({
	matchingScores: function(){
		return MatchingScores.find({}, { sort: { avgMatchingScore: -1 } });
	}
});