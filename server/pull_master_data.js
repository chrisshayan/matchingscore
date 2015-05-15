pullMasterData = function(){

    // Call function callVietnamworksAPI for getting configuration data
    var apiName = "/general/configuration";
    var parameters = "";
    var data = callVietnamworksAPI(apiName, parameters);

    // Get Categories Data
    _.each(data.categories, function(categories){
        //debuger(content.data.categories);
        insertCategoriesData(categories);
    });

    // Get Locations Data
    _.each(data.locations, function(locations){
        //debuger(locations);
        insertLocationsData(locations);
    });
};