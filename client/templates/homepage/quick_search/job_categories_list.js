Template.jobCategoriesList.helpers({
    categoriesList: function(){
        return MasterData.find({ dataType: "category" }, {sort: {"categoryVNName": 1}}, {reactive: false}).fetch();
    }
});