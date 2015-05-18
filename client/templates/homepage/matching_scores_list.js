Template.matchingScoresList.onCreated(function () {
	var instance = this;

	instance.limit = 10;
	instance.loadCondition = new ReactiveVar({
		selectedLocation: -1,
		loadAllowed: instance.limit + 1
	});

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
	drawChart: function() {
		var loadCondition = Template.instance().loadCondition.get();

		top5MatchingScore = MatchingScores.find({ cityId: loadCondition.selectedLocation }, {sort: {countMatchingScore: -1}, limit: 5}).fetch();

		var matchingScores = {
			industry: [],
			min: [],
			max: [],
			avg: []
		}
	
		for (i = 0; i < top5MatchingScore.length; i++) {
			industry = 
				MasterData.findOne({dataType: "category", categoryId: top5MatchingScore[i].industryId}).categoryVNName +
				'(' + top5MatchingScore[i].countMatchingScore + ')';
			matchingScores.industry.push(industry);
			matchingScores.min.push(top5MatchingScore[i].minMatchingScore);
			matchingScores.max.push(top5MatchingScore[i].maxMatchingScore);
			matchingScores.avg.push(top5MatchingScore[i].avgMatchingScore);
		}
	
		$('#top-five-chart').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Biểu đồ Matching Score',
				x: -20
			},
			subtitle: {
				text: '5 ngành nghề được ứng tuyển nhiều nhất',
				x: -20
			},
			xAxis: {
				categories: matchingScores.industry
			},
			yAxis: {
				title: {
					text: 'Points'
				},
				min: 0,
				max: 100
			},
			legend: {
            	layout: 'vertical',
            	align: 'right',
            	verticalAlign: 'middle',
            	borderWidth: 0
        	},
        	series: [{
        		name: 'Min',
        		data: matchingScores.min
        	}, {
        		name: 'Max',
        		data: matchingScores.max
        	}, {
        		name: 'Average',
        		data: matchingScores.avg
        	}]
		});
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
    }
});