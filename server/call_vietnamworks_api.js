callVietnamworksAPI = function(apiName, parameters){
    // API Link
    var url = Meteor.settings.private.apiUrl;

    // URL for calling MatchingScore API
    url += apiName;

    // Complete API URL
    url += parameters;
    //debuger(url);
    try{
        var result = HTTP.get(
            url,
            {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Content-md5": Meteor.settings.private.apiConsumerKey
                }
            }
        );
        if(result.statusCode == 200){
            var content = JSON.parse(result.content);
            return content.data;
        }
    } catch(event){
        debuger(event, 2);
    }
};