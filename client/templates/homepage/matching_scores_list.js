Template.matchingScoresList.helpers({
	matchingScores: function(){
		return MatchingScores.find({ cityId: -1 }, { sort: { avgMatchingScore: -1 } });
	}
});