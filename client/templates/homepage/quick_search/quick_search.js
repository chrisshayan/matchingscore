Template.quickSearch.onCreated(function () {
    var instance = this;

    instance.selectedLocation = new ReactiveVar(-1);
    instance.selectedIndustry = new ReactiveVar(-1);
    instance.isQuickSearchClicked = false;

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
        }
    });
});

Template.quickSearch.helpers({
    resultMatchingScores: function (){
        var searchLocation = Template.instance().selectedLocation.get();
        var searchIndustry = Template.instance().selectedIndustry.get();

        var searchResult = MatchingScores.findOne({cityId: searchLocation, industryId: searchIndustry});
        if(searchResult === undefined){
            if(Template.instance().isQuickSearchClicked &
                Template.instance().ready){
                throwError('Không có kết quả Matching Score theo điều kiện tìm kiếm!', 'alert-info');
            }
            
            searchResult = {
                minMatchingScore: 0,
                maxMatchingScore: 0,
                avgMatchingScore: 0,
                countMatchingScore: 0
            };
        }

        searchResult._countMatchingScore = searchResult.countMatchingScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Template.instance().isQuickSearchClicked = false;
        return searchResult;
    }
});

Template.quickSearch.events({
    'click #btn-show-me': function(event, instance){
        event.preventDefault();
        var selectedLocation = instance.selectedLocation.get();
        var selectedIndustry = instance.selectedIndustry.get();

        selectedIndustry = parseInt($('#selectSearchCategory').val());
        instance.selectedIndustry.set(selectedIndustry);

        selectedLocation = parseInt($('#selectSearchLocation').val());
        instance.selectedLocation.set(selectedLocation);

        if(selectedIndustry == -1){
            throwError('Vui lòng chọn điều kiện tìm kiếm theo ngành nghề!', 'alert-warning');
        }
        instance.isQuickSearchClicked = true;
    }
});