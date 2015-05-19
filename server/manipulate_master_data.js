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
    if(MasterData.find({dataType: "category", categoryId: category.categoryId}).count() == 0){
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
    if(MasterData.find({dataType: "location", locationId: location.locationId}).count() == 0){
        debuger('Insert location C ' + location.locationId, 2);
        return MasterData.insert(location);
    } else {
        debuger('Existed location C '+ location.locationId, 2);
    }
    
};

// Function add CRM Location
addCrmLocation = function(){
    debuger('Add Crm Location to MasterData ', 2);

    //Update statistic matching score for every industry into database
    var locationMapping = crmLocations();

    _.each(locationMapping, function(locationMappingEntry){
        var result  = MasterData.update(
            {dataType: "location", locationId: locationMappingEntry.locationId },
            { $set: {
                locationCrmId: locationMappingEntry.locationCrmId,
                locationCrmCode: locationMappingEntry.locationCrmCode
            }}
        );
    });
}

crmLocations = function() {
    return [
        {locationCrmCode:"BSCL", locationCrmId:69, locationId:71, locationENName:"Mekong Delta"},
        {locationCrmCode:"HNi", locationCrmId:2, locationId:24, locationENName:"Ha Noi"},
        {locationCrmCode:"Khc", locationCrmId:71, locationId:66, locationENName:"Other"},
        {locationCrmCode:"Overseas", locationCrmId:66, locationId:70, locationENName:"International"},
        {locationCrmCode:"TnhAnGiang", locationCrmId:3, locationId:2, locationENName:"An Giang"},
        {locationCrmCode:"TnhBcCn", locationCrmId:5, locationId:4, locationENName:"Bac Can"},
        {locationCrmCode:"TnhBcGiang", locationCrmId:6, locationId:5, locationENName:"Bac Giang"},
        {locationCrmCode:"TnhBcLiu", locationCrmId:7, locationId:6, locationENName:"Bac Lieu"},
        {locationCrmCode:"TnhBcNinh", locationCrmId:8, locationId:7, locationENName:"Bac Ninh"},
        {locationCrmCode:"TnhBnhDng", locationCrmId:11, locationId:11, locationENName:"Binh Duong"},
        {locationCrmCode:"TnhBnhnh", locationCrmId:10, locationId:10, locationENName:"Binh Dinh"},
        {locationCrmCode:"TnhBnhPhc", locationCrmId:12, locationId:12, locationENName:"Binh Phuoc"},
        {locationCrmCode:"TnhBnhThun", locationCrmId:13, locationId:13, locationENName:"Binh Thuan"},
        {locationCrmCode:"TnhBnTre", locationCrmId:9, locationId:8, locationENName:"Ben Tre"},
        {locationCrmCode:"TnhBRaVngTu", locationCrmId:4, locationId:3, locationENName:"Ba Ria - Vung Tau"},
        {locationCrmCode:"TnhCaoBng", locationCrmId:16, locationId:16, locationENName:"Cao Bang"},
        {locationCrmCode:"TnhCMau", locationCrmId:14, locationId:14, locationENName:"Ca Mau"},
        // {locationCrmCode:"TnhcNng", locationCrmId:68, locationId:, locationENName:""}, VNW location doesn't have Dac Nong
        {locationCrmCode:"TnhCnTh", locationCrmId:15, locationId:15, locationENName:"Can Tho"},
        {locationCrmCode:"TnhGiaLai", locationCrmId:22, locationId:21, locationENName:"Gia Lai"},
        {locationCrmCode:"TnhHaBnh", locationCrmId:32, locationId:30, locationENName:"Hoa Binh"},
        {locationCrmCode:"TnhHGiang", locationCrmId:23, locationId:22, locationENName:"Ha Giang"},
        {locationCrmCode:"TnhHiDng", locationCrmId:28, locationId:27, locationENName:"Hai Duong"},
        {locationCrmCode:"TnhHNam", locationCrmId:24, locationId:23, locationENName:"Ha Nam"},
        {locationCrmCode:"TnhHngYn", locationCrmId:34, locationId:32, locationENName:"Hung Yen"},
        {locationCrmCode:"TnhHTnh", locationCrmId:27, locationId:26, locationENName:"Ha Tinh"},
        {locationCrmCode:"TnhHTy", locationCrmId:26, locationId:25, locationENName:"Ha Tay"},
        {locationCrmCode:"TnhHuGiang", locationCrmId:67, locationId:72, locationENName:"Hau Giang"},
        {locationCrmCode:"TnhinBin", locationCrmId:19, locationId:69, locationENName:"Dien Bien"},
        {locationCrmCode:"TnhKhnhHa", locationCrmId:35, locationId:33, locationENName:"Khanh Hoa"},
        {locationCrmCode:"TnhKinGiang", locationCrmId:36, locationId:61, locationENName:"Kien Giang"},
        {locationCrmCode:"TnhkLk", locationCrmId:18, locationId:18, locationENName:"Dac Lac"},
        {locationCrmCode:"TnhKonTum", locationCrmId:37, locationId:34, locationENName:"Kon Tum"},
        {locationCrmCode:"TnhLaiChu", locationCrmId:38, locationId:35, locationENName:"Lai Chau"},
        {locationCrmCode:"TnhLmng", locationCrmId:39, locationId:36, locationENName:"Lam Dong"},
        {locationCrmCode:"TnhLngSn", locationCrmId:40, locationId:37, locationENName:"Lang Son"},
        {locationCrmCode:"TnhLoCai", locationCrmId:41, locationId:38, locationENName:"Lao Cai"},
        {locationCrmCode:"TnhLongAn", locationCrmId:42, locationId:39, locationENName:"Long An"},
        {locationCrmCode:"TnhNamnh", locationCrmId:43, locationId:40, locationENName:"Nam Dinh"},
        {locationCrmCode:"TnhNghAn", locationCrmId:44, locationId:41, locationENName:"Nghe An"},
        {locationCrmCode:"TnhngNai", locationCrmId:20, locationId:19, locationENName:"Dong Nai"},
        {locationCrmCode:"TnhngThp", locationCrmId:21, locationId:20, locationENName:"Dong Thap"},
        {locationCrmCode:"TnhNinhBnh", locationCrmId:45, locationId:42, locationENName:"Ninh Binh"},
        {locationCrmCode:"TnhNinhThun", locationCrmId:46, locationId:43, locationENName:"Ninh Thuan"},
        {locationCrmCode:"TnhPhTh", locationCrmId:47, locationId:44, locationENName:"Phu Tho"},
        {locationCrmCode:"TnhPhYn", locationCrmId:31, locationId:45, locationENName:"Phu Yen"},
        {locationCrmCode:"TnhQungBnh", locationCrmId:48, locationId:46, locationENName:"Quang Binh"},
        {locationCrmCode:"TnhQungNam", locationCrmId:49, locationId:47, locationENName:"Quang Nam"},
        {locationCrmCode:"TnhQungNgi", locationCrmId:50, locationId:48, locationENName:"Quang Ngai"},
        {locationCrmCode:"TnhQungNinh", locationCrmId:51, locationId:49, locationENName:"Quang Ninh"},
        {locationCrmCode:"TnhQungTr", locationCrmId:52, locationId:50, locationENName:"Quang Tri"},
        {locationCrmCode:"TnhScTrng", locationCrmId:53, locationId:51, locationENName:"Soc Trang"},
        {locationCrmCode:"TnhSnLa", locationCrmId:54, locationId:52, locationENName:"Son La"},
        {locationCrmCode:"TnhThanhHa", locationCrmId:58, locationId:56, locationENName:"Thanh Hoa"},
        {locationCrmCode:"TnhThaThinHu", locationCrmId:59, locationId:57, locationENName:"Thua Thien-Hue"},
        {locationCrmCode:"TnhThiBnh", locationCrmId:56, locationId:54, locationENName:"Thai Binh"},
        {locationCrmCode:"TnhThiNguyn", locationCrmId:57, locationId:55, locationENName:"Thai Nguyen"},
        {locationCrmCode:"TnhTinGiang", locationCrmId:60, locationId:58, locationENName:"Tien Giang"},
        {locationCrmCode:"TnhTrVinh", locationCrmId:61, locationId:59, locationENName:"Tra Vinh"},
        {locationCrmCode:"TnhTuynQuang", locationCrmId:62, locationId:60, locationENName:"Tuyen Quang"},
        {locationCrmCode:"TnhTyNinh", locationCrmId:55, locationId:53, locationENName:"Tay Ninh"},
        {locationCrmCode:"TnhVnhLong", locationCrmId:63, locationId:62, locationENName:"Vinh Long"},
        {locationCrmCode:"TnhVnhPhc", locationCrmId:64, locationId:63, locationENName:"Vinh Phuc"},
        {locationCrmCode:"TnhYnBi", locationCrmId:65, locationId:65, locationENName:"Yen Bai"},
        {locationCrmCode:"TpBinHa", locationCrmId:70, locationId:9, locationENName:"Bien Hoa"},
        {locationCrmCode:"TpHChMinh", locationCrmId:1, locationId:29, locationENName:"Ho Chi Minh"},
        {locationCrmCode:"TpHiPhng", locationCrmId:29, locationId:28, locationENName:"Hai Phong"},
        {locationCrmCode:"TpHu", locationCrmId:33, locationId:31, locationENName:"Hue"},
        {locationCrmCode:"TpNng", locationCrmId:17, locationId:17, locationENName:"Da Nang"}
    ]
}