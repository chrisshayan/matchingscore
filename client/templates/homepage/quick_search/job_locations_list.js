Template.jobLocationsList.helpers({
    locationsList: function(){
        return MasterData.find({ dataType: "locations" }, {sort: {"locationVNName": 1}}, {reactive: false}).fetch();
    }
});