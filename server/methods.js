Meteor.methods({
    // Quick Search Matching Score with Category & Location
    quickSearch: function(searchConditions){
        check(searchConditions, {
            industryId: Number,
            cityId: Number
        });

        // Define quick_search period of applications
        var period = 43200; // 30 days
        var apiName = "";
        var parameters = "";
        var searchResult;

        //debuger(searchConditions.cityId);
        apiName = "/industries/matching-score/?";
        // Create quick_search parameters
        // Validate Location
        if(searchConditions.cityId > 0){
            parameters += "cityId[]=" + searchConditions.cityId + '&';
        }
        // Validate Category
        parameters += "industryId[]=" + searchConditions.industryId + "&period=" + period;

        // Call API for getting result
        searchResult = "calling method quickSearch.";
        searchResult = callVietnamworksAPI(apiName, parameters);
        return searchResult;
    },

    callAddCRMLead: function(customerInfo){
        // set CRM location code
        customerInfo.locationCrmCode = toCRMLocation(customerInfo.vnwCityId);
        callMeBackUsers.insert(customerInfo);

        if(Meteor.settings.private.crmAPIDisabled){
            return true;
        } else {
            return addCrmLead(customerInfo);
        }
    }
});