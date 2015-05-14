Template.quickSearch.events({
    'click #btn-show-me': function(){
        var industryId;
        var cityId;
        var searchConditions;

        industryId = Number($('#selectSearchCategory').val());
        if(industryId < 0){
            return alert('Please choose one Job Category');
        }

        cityId = Number($('#selectSearchLocation').val());
        searchConditions = {
            industryId: industryId,
            cityId: cityId
        };

        Meteor.call('quickSearch', searchConditions, function(error, searchResult){
            // display the error to the user and abort
            if(error){
                return alert(error.reason);
            }
            Session.set('searchResult', searchResult);
        });
        Session.set('isQuickSearchClicked', true);
    }
});