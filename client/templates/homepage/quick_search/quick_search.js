Template.quickSearch.onCreated(function () {
    var instance = this;

    instance._searchCondition = {
        selectedLocation: -1,
        selectedIndustry: -1
    };
    instance.searchCondition = new ReactiveVar({
        selectedLocation: -1,
        selectedIndustry: -1
    });
    instance.isQuickSearchClicked = false;

    instance.autorun(function (){
        var searchCondition = instance.searchCondition.get();
        
        if(parseInt(searchCondition.selectedIndustry) !== -1){
            var subscription = instance.subscribe('msquicksearch', 
                searchCondition.selectedLocation, 
                searchCondition.selectedIndustry);

            /*if (subscription.ready()){
                console.log("> Received matchingscore for cityId " + selectedLocation + ", selectedIndustry " + selectedIndustry + "\n\n");
            } else {
                console.log("> Receiving matchingscore for cityId " + selectedLocation + ", selectedIndustry " + selectedIndustry + "\n\n");
            }*/
        }
    });

    instance.searchResult = function() {
        var searchCondition = instance.searchCondition.get();
        var searchResult = MatchingScores.findOne({
            cityId: searchCondition.selectedLocation, 
            industryId: searchCondition.selectedIndustry
        });

        if(searchResult === undefined){
            if(instance.isQuickSearchClicked
                & searchCondition.selectedIndustry !== -1
                & searchCondition.selectedLocation == instance._searchCondition.selectedLocation
                & searchCondition.selectedIndustry == instance._searchCondition.selectedIndustry){
                instance.isQuickSearchClicked = false;
                throwError('Không có kết quả Matching Score theo điều kiện tìm kiếm!', 'alert-info', 'quickSearch');
            }
            searchResult = {
                minMatchingScore: 0,
                maxMatchingScore: 0,
                avgMatchingScore: 0,
                countMatchingScore: 0
            };
        }
        
        searchResult._countMatchingScore = searchResult.countMatchingScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        instance._searchCondition = {
            selectedLocation: searchCondition.selectedLocation,
            selectedIndustry: searchCondition.selectedIndustry
        };
        return searchResult;
    }
});

Template.quickSearch.helpers({
    resultMatchingScores: function (){
        return Template.instance().searchResult();
    }
});

Template.quickSearch.events({
    'click #btn-show-me': function(event, instance){
        event.preventDefault();

        Errors.remove({errorType:"quickSearch"});

        var searchCondition = instance.searchCondition.get();
        searchCondition.selectedIndustry = parseInt($('#selectSearchCategory').val());
        searchCondition.selectedLocation = parseInt($('#selectSearchLocation').val());
        
        instance.searchCondition.set(searchCondition);

        if(searchCondition.selectedIndustry == -1){
            throwError('Vui lòng chọn điều kiện tìm kiếm theo ngành nghề!', 'alert-warning', 'quickSearch');
        }
        instance.isQuickSearchClicked = true;
    }
});