Template.lastUpdated.helpers({
	getLastUpdated: function(){
		lastUpdated = new Date(MatchingScores.findOne({}, {sort: {updateDate: -1}}).updateDate);
		retString = 'Cập nhật gần nhất vào lúc ' + lastUpdated.getHours() + ':' + lastUpdated.getMinutes() + ':' + lastUpdated.getSeconds() +
			' ' + lastUpdated.getDay() + '/' + lastUpdated.getMonth() + '/' + lastUpdated.getYear() + '.';
		return retString;
	}
});