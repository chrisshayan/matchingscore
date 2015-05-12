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
    //console.log('insert');
    //console.log(categoriesData);
};