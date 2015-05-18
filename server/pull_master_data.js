pullMasterData = function(){

    // Call function callVietnamworksAPI for getting configuration data
    var apiName = "/general/configuration";
    var parameters = "";
    var data = callVietnamworksAPI(apiName, parameters);

    // Get Categories Data
    debuger('Insert Categories Data');
    _.each(data.categories, function(category){
        insertCategoryData(category);
    });

    // Get Locations Data
    debuger('Insert Locations Data')
    _.each(data.locations, function(location){
        insertLocationData(location);
    });
};