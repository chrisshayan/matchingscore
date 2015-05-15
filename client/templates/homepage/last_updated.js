Template.lastUpdated.helpers({
	getLastUpdated: function(){
		lastUpdated = new Date(MatchingScores.findOne({}, {sort: {updateDate: -1}}).updateDate);
		retString = '<em>Cập nhật gần nhất vào lúc <strong>' + lastUpdated.getHours() + ':' + lastUpdated.getMinutes() + ':' + lastUpdated.getSeconds() +
			' ' + lastUpdated.getDay() + '/' + lastUpdated.getMonth() + '/' + lastUpdated.getYear() + '</strong>.</em>';
		return retString;
	}
});