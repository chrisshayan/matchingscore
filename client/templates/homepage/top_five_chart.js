Template.topFiveChart.rendered = function() {
	this.autorun(function(){
		top5MatchingScore = Template.instance().data.top5MatchingScore;

		var matchingScores = {
			industry: [],
			min: [],
			max: [],
			avg: []
		}
	
		for (i = 0; i < top5MatchingScore.length; i++) {
			industry = 
				MasterData.findOne({
					dataType: "category", categoryId: top5MatchingScore[i].industryId}).categoryVNName.trim() +
					' (' + top5MatchingScore[i].countMatchingScore + ')';
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
				text: '5 ngành nghề có Matching Score trung bình cao nhất',
				x: -20
			},
			xAxis: {
				categories: matchingScores.industry
			},
			yAxis: {
				title: {
					text: 'Scores'
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
        	}],
        	credits: {
        		enabled: false
        	}
		});
	});
};