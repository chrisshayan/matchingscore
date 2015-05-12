callVietnamworksAPI = function(apiName, parameters){
    // Consumer Key for calling Vietnamworks API
    var md5 = "4c443c7e2c515d6b4b4d693c2f63434a7773226a614846733c4c4d4348";
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