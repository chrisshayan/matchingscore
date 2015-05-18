Template.topFiveChart.helpers({
	drawChart: function() {
		top5MatchingScore = MatchingScores.find({}, {sort: {countMatchingScore: -1}, limit: 5}).fetch;
		var matchingScores = {
			industry: [],
			min: [],
			max: [],
			avg: []
		}
	
		for (i = 0; i < top5MatchingScore.length; i++) {
			matchingScores.industry = top5MatchingScore[i].industryId;
			matchingScores.min = top5MatchingScore[i].minMatchingScore;
			matchingScores.max = top5MatchingScore[i].maxMatchingScore;
			matchingScores.avg = top5MatchingScore[i].avgMatchingScore;
		}
	
		console.log(matchingScores.industry);
	
		$('#top-five-chart').highcharts({
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
				}
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