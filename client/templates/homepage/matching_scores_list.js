Template.matchingScoresList.onCreated(function () {
	var instance = this;

	instance.limit = 10;
	instance.loadCondition = new ReactiveVar({
		selectedLocation: -1,
		loadAllowed: instance.limit + 1,
		sortField: 'avgMatchingScore'
	});
	instance.chooseGraph = new ReactiveVar(false);

	instance.autorun(function (){
		var selectedLocation = instance.loadCondition.get().selectedLocation;
		var sortField = instance.loadCondition.get().sortField;
		var loadAllowed = instance.loadCondition.get().loadAllowed;
		if(instance.chooseGraph.get()){
			loadAllowed = 5;
		}
		var subscription = instance.subscribe('matchingscores', selectedLocation, sortField, loadAllowed);
		
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
    	var filter = {sort: {}};
    	filter.sort[loadCondition.sortField] = -1;
    	filter.limit = loadCondition.loadAllowed - 1;

    	return MatchingScores.find(
    		{ cityId: loadCondition.selectedLocation }, 
    		filter
    		);
	},
	hasMore: function (){
		var loadCondition = Template.instance().loadCondition.get();

		return MatchingScores.find(
			{ cityId: loadCondition.selectedLocation }
			).count() > Template.instance().loadCondition.get().loadAllowed - 1;
	},
	topFiveMatchingScore: function() {
		var loadCondition = Template.instance().loadCondition.get();
		var filter = {sort: {}};
    	filter.sort[loadCondition.sortField] = -1;
    	filter.limit = 5;

		return MatchingScores.find(
			{ cityId: loadCondition.selectedLocation }, 
			filter
			).fetch();
	},
	chooseGraph: function() {
		return Template.instance().chooseGraph.get();
	},
	sortByAvg: function(){
		return Template.instance().loadCondition.get().sortField == 'avgMatchingScore';
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
    },
    "click .sortAvg": function(event, instance){
    	event.preventDefault();

    	var loadCondition = instance.loadCondition.get();
    	loadCondition.sortField = 'avgMatchingScore';
    	instance.loadCondition.set(loadCondition);
    },
    "click .sortCount": function(event, instance){
    	event.preventDefault();

    	var loadCondition = instance.loadCondition.get();
    	loadCondition.sortField = 'countMatchingScore';
    	instance.loadCondition.set(loadCondition);
    }
});