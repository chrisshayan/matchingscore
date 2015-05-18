Template.matchingScoresList.onCreated(function () {
	var instance = this;

	instance.limit = 10;
	instance.loadCondition = new ReactiveVar({
		selectedLocation: -1,
		loadAllowed: instance.limit + 1
	});
	instance.chooseGraph = new ReactiveVar(false);

	instance.autorun(function (){
		var selectedLocation = instance.loadCondition.get().selectedLocation;
		var loadAllowed = instance.loadCondition.get().loadAllowed;
		var subscription = instance.subscribe('matchingscores', selectedLocation, loadAllowed);
		
		/*if (subscription.ready()){
			console.log("> Received matchingscore for cityId " + selectedLocation + "\n\n");
		} else {
			console.log("> Receiving matchingscore for cityId " + selectedLocation + "\n\n");
		}*/
	});
});

Template.matchingScoresList.helpers({
    matchingScores: function (){
    	var loadCondition = Template.instance().loadCondition.get();

    	return MatchingScores.find({ cityId: loadCondition.selectedLocation }, { sort: { avgMatchingScore: -1 } , limit: (loadCondition.loadAllowed - 1) });
	},
	hasMore: function (){
		var loadCondition = Template.instance().loadCondition.get();

		return MatchingScores.find({ cityId: loadCondition.selectedLocation }).count() > Template.instance().loadCondition.get().loadAllowed - 1;
	},
	topFiveMatchingScore: function() {
		var loadCondition = Template.instance().loadCondition.get();

		return MatchingScores.find({ cityId: loadCondition.selectedLocation }, {sort: {countMatchingScore: -1}, limit: 5}).fetch();
	},
	chooseGraph: function() {
		return Template.instance().chooseGraph.get();
	}
});

Template.matchingScoresList.events({
    "change #selectedLocation": function(event, instance){
    	event.preventDefault();
    	
        var loadCondition = instance.loadCondition.get();
        var selectedLocation = parseInt($(event.target).find('option:selected').val());

        loadCondition.selectedLocation = selectedLocation;
        loadCondition.loadAllowed = instance.limit + 1;

        instance.loadCondition.set(loadCondition);
    },
    "click .load-more": function(event, instance){
    	event.preventDefault();

    	var loadCondition = instance.loadCondition.get();
    	loadCondition.loadAllowed += instance.limit;
    	instance.loadCondition.set(loadCondition);
    },
    "click .choose-graph": function(event, instance){
    	event.preventDefault();

    	instance.chooseGraph.set(true);
    },
    "click .choose-grid": function(event, instance){
    	event.preventDefault();

    	instance.chooseGraph.set(false);
    }
});