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
        Session.set('searchResult', MatchingScores.findOne({cityId: Session.get('quickSearchLocation'), industryId: Session.get('quickSearchIndustry')}));
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