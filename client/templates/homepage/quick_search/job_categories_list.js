Template.jobCategoriesList.helpers({
    categoriesList: function(){
        return MasterData.find({ dataType: "categories" }, {sort: {"categoryVNName": 1}}, {reactive: false}).fetch();
    }
});