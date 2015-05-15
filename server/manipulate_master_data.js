// Function insert data for category
insertCategoryData = function(category){
    // Get category data for importing into database
    category.dataType = "category";

    category.categoryId = parseInt(category.category_id);
    category.categoryENName = category.lang_en;
    category.categoryVNName = category.lang_vn;

    category = _.omit(category, 'category_id');
    category = _.omit(category, 'lang_en');
    category = _.omit(category, 'lang_vn');

    //Insert statistic matching score for every industry into database
    if(MasterData.find({dataType: "categories", categoryId: category.categoryId}).count() == 0){
        debuger('Insert category I ' + category.categoryId, 2);
        return MasterData.insert(category);
    } else {
        debuger('Existed category I '+ category.categoryId, 2);
    }
};

// Function insert data for Location
insertLocationData = function(location){
    // Get Location data for importing into database
    location.dataType = "location";

    location.locationId = parseInt(location.location_id);
    location.locationENName = location.lang_en;
    location.locationVNName = location.lang_vn;

    location = _.omit(location, 'location_id');
    location = _.omit(location, 'lang_en');
    location = _.omit(location, 'lang_vn');

    //Insert statistic matching score for every industry into database
    if(MasterData.find({dataType: "locations", locationId: location.locationId}).count() == 0){
        debuger('Insert location C ' + location.locationId, 2);
        return MasterData.insert(location);
    } else {
        debuger('Existed location C '+ location.locationId, 2);
    }
    
};