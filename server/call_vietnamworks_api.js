callVietnamworksAPI = function(apiName, parameters){
    // Consumer Key for calling Vietnamworks API
    var md5 = "4d9101496b14d5700ec07090e82bc3c586ad16da48c05ad7c61d17e9bee0d9b5";
    // API Link
    var url = "https://api-staging.vietnamworks.com";

    // URL for calling MatchingScore API
    url += apiName;

    // Complete API URL
    url += parameters;
    //console.log(url);
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
            return content.data;
        }
    } catch(event){
        console.log(event);
    }
};