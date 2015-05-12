Template.jobLocationsList.helpers({
    locationsList: function(){
        return MasterData.find({ dataType: "locations" });
    }
});