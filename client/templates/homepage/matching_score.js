Template.matchingScore.helpers({
    categoryName: function(){
        var categories = MasterData.find({ categoryId: Number(this.industryId) }, {reactive: false}).fetch();
        return categories[0].categoryVNName;
    },
    _countMatchingScore: function(countMatchingScore){
    	return countMatchingScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});