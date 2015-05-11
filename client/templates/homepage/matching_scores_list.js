Template.matchingScoresList.helpers({
    matchingScores: function(){
		var selectedLocation = Number(Session.get('selectedLocation'));
        if(isNaN(selectedLocation)){
            selectedLocation = -1;
        }
        console.log(selectedLocation);
		return MatchingScores.find({ cityId: selectedLocation }, { sort: { avgMatchingScore: -1 } });
	}
});