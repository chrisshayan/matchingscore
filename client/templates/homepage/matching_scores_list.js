/*Template.matchingScoresList.onCreated(function () {
	var instance = this;

	instance.selectedLocation = new ReactiveVar(-1);

	instance.autorun(function (){
		var selectedLocation = instance.selectedLocation.get();		
		var subscription = instance.subscribe('matchingscores', selectedLocation);
		//console.log('subscribe matchingscores:' + selectedLocation);
		if (subscription.ready()){
			console.log("> Received matchingscore for cityId " + selectedLocation + "\n\n");
		} else {
			console.log("> Receiving matchingscore for cityId " + selectedLocation + "\n\n");
		}
	});
});*/

Template.matchingScoresList.helpers({
    matchingScores: function (){
    	var selectedLocation = Number(Session.get('selectedLocation'));
    	if(isNaN(selectedLocation)){
    		selectedLocation = -1
    	}
        selectedLocation = Number(selectedLocation);
    	return MatchingScores.find({cityId: selectedLocation}, { sort: { avgMatchingScore: -1 } });
	}
});

Template.matchingScoresList.events({
    "change #selectedLocation": function(event){
        var selectedLocation = Number($(event.target).find('option:selected').val());
        Session.set('selectedLocation', selectedLocation);
    }
});
