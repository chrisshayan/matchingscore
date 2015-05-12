Template.jobCategoriesList.helpers({
    categoriesList: function(){
        return MasterData.find({ dataType: "categories" });
    }
});