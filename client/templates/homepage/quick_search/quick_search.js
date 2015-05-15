Template.quickSearch.onCreated(function () {
    var instance = this;

    instance.selectedLocation = new ReactiveVar(-1);
    instance.selectedIndustry = new ReactiveVar(-1);

    instance.autorun(function (){
        var selectedLocation = instance.selectedLocation.get();
        var selectedIndustry = instance.selectedIndustry.get();
        var subscription = instance.subscribe('msquicksearch', selectedLocation, selectedIndustry);
        //console.log('subscribe msquicksearch:' + selectedLocation + ", selectedIndustry " + selectedIndustry + "\n\n");
        if (subscription.ready()){
            console.log("> Received matchingscore for cityId " + selectedLocation + ", selectedIndustry " + selectedIndustry + "\n\n");
        } else {
            console.log("> Receiving matchingscore for cityId " + selectedLocation + ", selectedIndustry " + selectedIndustry + "\n\n");
        }
    });
});

Template.quickSearch.helpers({
    resultMatchingScores: function (){
        searchLocation = parseInt(Session.get('quickSearchLocation'));
        searchIndustry = parseInt(Session.get('quickSearchIndustry'));

        if (searchIndustry == -1){
            return undefined;
        }

        searchConditions = {
            industryId: searchIndustry,
            cityId: searchLocation
        };

        searchResult = MatchingScores.findOne({cityId: searchLocation, industryId: searchIndustry});
        if (isNaN(searchResult) & Session.get('isQuickSearchClicked')){
            searchResult = Meteor.call('quickSearch', searchConditions, function(error, searchResult){
                Session.set('searchCallBack', true);
                Session.set('searchResult', searchResult);
            });
        } else {
            Session.set('searchResult', searchResult);
        }
    }
});

Template.quickSearch.events({
    'click #btn-show-me': function(event, instance){
        var selectedLocation = instance.selectedLocation.get();
        var selectedIndustry = instance.selectedIndustry.get();

        selectedIndustry = Number($('#selectSearchCategory').val());
        if(selectedIndustry < 0){
            return alert('Please choose one Job Category');
        }
        instance.selectedIndustry.set(selectedIndustry);

        selectedLocation = Number($('#selectSearchLocation').val());
        instance.selectedLocation.set(selectedLocation);

        Session.set('isQuickSearchClicked', true);
        Session.set('quickSearchLocation', selectedLocation);
        Session.set('quickSearchIndustry', selectedIndustry);
    }
});