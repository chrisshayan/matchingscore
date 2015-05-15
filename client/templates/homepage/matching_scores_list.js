Template.matchingScoresList.onCreated(function () {
	var instance = this;

	instance.selectedLocation = new ReactiveVar(-1);
	instance.loaded = new ReactiveVar(5);
	instance.limit = 5;

	instance.autorun(function (){
		var selectedLocation = instance.selectedLocation.get();		
		var subscription = instance.subscribe('matchingscores', selectedLocation);
		
		/*if (subscription.ready()){
			console.log("> Received matchingscore for cityId " + selectedLocation + "\n\n");
		} else {
			console.log("> Receiving matchingscore for cityId " + selectedLocation + "\n\n");
		}*/
	});
});

Template.matchingScoresList.helpers({
    matchingScores: function (){
    	var selectedLocation = parseInt(Template.instance().selectedLocation.get());

    	return MatchingScores.find({cityId: selectedLocation}, { sort: { avgMatchingScore: -1 } , limit: Template.instance().loaded.get() });
	},
	hasMore: function (){
		return MatchingScores.find({}).count() > Template.instance().loaded.get();
	}
});

Template.matchingScoresList.events({
    "change #selectedLocation": function(event, instance){
    	event.preventDefault();
    	
        var selectedLocation = instance.selectedLocation.get();
        selectedLocation = $(event.target).find('option:selected').val();
        instance.selectedLocation.set(selectedLocation);
        instance.loaded.set(instance.limit);
    },
    "click .load-more": function(event, instance){
    	event.preventDefault();

    	var loaded = instance.loaded.get();
    	loaded += instance.limit;
    	instance.loaded.set(loaded);
    }
});