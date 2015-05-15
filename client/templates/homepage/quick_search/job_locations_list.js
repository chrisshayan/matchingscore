Template.jobLocationsList.helpers({
    locationsList: function(){
        return MasterData.find({ dataType: "location" }, {sort: {"locationVNName": 1}}, {reactive: false}).fetch();
    }
});