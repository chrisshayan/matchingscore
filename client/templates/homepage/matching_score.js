Template.matchingScore.helpers({
    categoryName: function(){
        var categories = MasterData.find({ categoryId: Number(this.industryId) }, {reactive: false}).fetch();
        return categories[0].categoryVNName;
    },
    _countMatchingScore: function(){
    	return this.countMatchingScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    avgStatus: function(){
    	if (this.oldData === undefined){
    		return '--';
    	} else if (this.oldData.avgMatchingScore == this.avgMatchingScore) {
    		return '--';
    	} else if (this.oldData.avgMatchingScore > this.avgMatchingScore) {
    		return Spacebars.SafeString(
    			"<img src=\"/assets/images/symbol-arrow-down.png\" alt=\"down\"/>"
    			);
    	} else {
    		return Spacebars.SafeString(
    			"<img src=\"/assets/images/symbol-arrow-up.png\" alt=\"up\"/>"
    			);
    	}
    }
});