pullMasterData = function(){
    var md5 = "4c443c7e2c515d6b4b4d693c2f63434a7773226a614846733c4c4d4348";
    var url = "https://api-staging.vietnamworks.com/general/configuration";
    try{
        var result = HTTP.get(
            url,
            {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Content-md5": md5
                }
            }
        );
        if(result.statusCode == 200){
            var content = JSON.parse(result.content);
            var runDate = new Date();
            // Get Categories Data
            _.each(content.data.categories, function(categories){
                //console.log(content.data.categories);
                insertCategoriesData(categories);
            });
        }
    } catch(event){
        console.log(event);
    }
};