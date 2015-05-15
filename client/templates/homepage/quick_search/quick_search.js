Template.quickSearch.onCreated(function () {
    var instance = this;

    instance.selectedLocation = new ReactiveVar(-1);
    instance.selectedIndustry = new ReactiveVar(-1);

    instance.autorun(function (){
        var selectedLocation = instance.selectedLocation.get();
        var selectedIndustry = instance.selectedIndustry.get();
        
        if(parseInt(selectedIndustry) !== -1){
            var subscription = instance.subscribe('msquicksearch', selectedLocation, selectedIndustry);

            /*if (subscription.ready()){
                console.log("> Received matchingscore for cityId " + selectedLocation + ", selectedIndustry " + selectedIndustry + "\n\n");
            } else {
                console.log("> Receiving matchingscore for cityId " + selectedLocation + ", selectedIndustry " + selectedIndustry + "\n\n");
            }*/

            Session.set("qsNoIndustry", false);
        } else {
            Session.set("qsNoIndustry", true);
        }
    });
});

Template.quickSearch.helpers({
    resultMatchingScores: function (){
        searchLocation = Template.instance().selectedLocation.get();
        searchIndustry = Template.instance().selectedIndustry.get();

        if (searchIndustry == -1){
            searchResult = undefined;
        } else {
            searchResult = MatchingScores.findOne({cityId: searchLocation, industryId: searchIndustry});
        }

        Session.set('searchResult', searchResult);
    }
});

Template.quickSearch.events({
    'click #btn-show-me': function(event, instance){
        event.preventDefault();
        var selectedLocation = instance.selectedLocation.get();
        var selectedIndustry = instance.selectedIndustry.get();

        selectedIndustry = Number($('#selectSearchCategory').val());
        instance.selectedIndustry.set(selectedIndustry);

        selectedLocation = Number($('#selectSearchLocation').val());
        instance.selectedLocation.set(selectedLocation);

        Session.set('isQuickSearchClicked', true);
    }
});