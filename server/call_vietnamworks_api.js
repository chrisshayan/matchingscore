callVietnamworksAPI = function(apiName, parameters){
    // Consumer Key for calling Vietnamworks API
    var md5 = "5f6e4e512b178398de4ae966cbf4246777b1aae284698eb1faa55f6121c131f7";
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