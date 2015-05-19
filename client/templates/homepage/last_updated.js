Template.lastUpdated.helpers({
	getLastUpdated: function(){
		oneRow = MatchingScores.findOne({}, {sort: {updateDate: -1}});
		lastUpdated = new Date(oneRow.updateDate);
		retString = '<em>Cập nhật lần cuối vào lúc <strong>' + ("0" + lastUpdated.getHours()).slice(-2) + ':' + ("0" + lastUpdated.getMinutes()).slice(-2) + ':' + ("0" + lastUpdated.getSeconds()).slice(-2) +
			' ' + ("0" + lastUpdated.getDate()).slice(-2) + '/' + ("0" + (lastUpdated.getMonth() + 1)).slice(-2) + '/' + lastUpdated.getFullYear() + '</strong>.</em>';
		return retString;
	}
});