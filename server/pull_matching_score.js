pullMatchingScores = function(cityId, period){
    var md5 = "4c443c7e2c515d6b4b4d693c2f63434a7773226a614846733c4c4d4348";
    var url = "https://api-staging.vietnamworks.com/industries/matching-score/?";
    if(cityId > 0){
        url += "cityId[]=" + cityId + '&';
    }
    url += "industryId[]=1&industryId[]=2&industryId[]=3&industryId[]=4&industryId[]=5&industryId[]=6&industryId[]=7&industryId[]=8&industryId[]=10&industryId[]=11&industryId[]=12&industryId[]=13&industryId[]=15&industryId[]=16&industryId[]=17&industryId[]=18&industryId[]=19&industryId[]=21&industryId[]=22&industryId[]=23&industryId[]=24&industryId[]=25&industryId[]=26&industryId[]=27&industryId[]=28&industryId[]=30&industryId[]=32&industryId[]=33&industryId[]=34&industryId[]=35&industryId[]=36&industryId[]=37&industryId[]=39&industryId[]=41&industryId[]=42&industryId[]=43&industryId[]=47&industryId[]=48&industryId[]=49&industryId[]=51&industryId[]=52&industryId[]=53&industryId[]=54&industryId[]=55&industryId[]=56&industryId[]=57&industryId[]=58&industryId[]=59&industryId[]=62&industryId[]=63&industryId[]=64&industryId[]=65&industryId[]=66&industryId[]=67&industryId[]=68&industryId[]=69&industryId[]=70&industryId[]=71&period=" + period;
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
                var runDate = new Date();
                _.each(content.data, function(industry){
                    industry.cityId = cityId;

                    //console.log('Check exists');
                    //console.log(MatchingScores.find({ industryId: Number(industry.industryid), cityId: Number(industry.cityId) }).count());
                    //console.log(industry.cityId);

                    if(MatchingScores.find({ industryId: Number(industry.industryid), cityId: Number(cityId) }).count() == 0){
                        // Insert Matching Scores if not exists
                        var insertIndustryData = insertMatchingScore(industry, runDate, cityId);
                        console.log('Cron insert');
                        console.log(industryData);
                    } else{
                        // Update Matching Scores if exists
                        var updateIndustryData = updateMatchingScore(industry, runDate, cityId);
                        console.log('Cron update');
                        console.log(industryData);
                    }
                });
        }
    } catch(event){
        console.log(event);
    }
};