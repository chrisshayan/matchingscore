Template.matchingScore.helpers({
    categoryName: function(){
        var categories = MasterData.find({ categoryId: Number(this.industryId) }).fetch();
        return categories[0].categoryENName;
    }
});