// Function insert data for categories
insertCategoriesData = function(categories){
    // Get categories data for importing into database
    var categoriesData = categories;
    categoriesData.dataType = "categories";

    categoriesData.categoryId = Number(categories.category_id);
    categoriesData.categoryENName = categories.lang_en;
    categoriesData.categoryVNName = categories.lang_vn;

    categoriesData = _.omit(categoriesData, 'category_id');
    categoriesData = _.omit(categoriesData, 'lang_en');
    categoriesData = _.omit(categoriesData, 'lang_vn');

    //Insert statistic matching score for every industry into database
    return MasterData.insert(categoriesData);
    debuger('Insert categories data');
};

// Function insert data for locations
insertLocationsData = function(locations){
    // Get locations data for importing into database
    var locationsData = locations;
    locationsData.dataType = "locations";

    locationsData.locationId = Number(locations.location_id);
    locationsData.locationENName = locations.lang_en;
    locationsData.locationVNName = locations.lang_vn;

    locationsData = _.omit(locationsData, 'location_id');
    locationsData = _.omit(locationsData, 'lang_en');
    locationsData = _.omit(locationsData, 'lang_vn');

    //Insert statistic matching score for every industry into database
    return MasterData.insert(locationsData);
    debuger('Insert locations data');
};