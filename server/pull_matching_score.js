pullMatchingScores = function(period){
	var md5 = "4c443c7e2c515d6b4b4d693c2f63434a7773226a614846733c4c4d4348";
	var url = "https://api-staging.vietnamworks.com";
	url += "/industries/matching-score/?industryId[]=33&industryId[]=34&industryId[]=35&industryId[]=1&period=" + period;
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
            //if(content.data && content.data.total > 0){
                var runDate = new Date();
                _.each(content.data, function(industry){
                    // Check industry exists
                    if(MatchingScores.find({ industryId: industry.industryid }).count() == 0){
                        // Get industry statistic data for importing into database                    
                        var industryData = industry;
                        industryData.updateDate = runDate;
                        industryData.industryId = industry.industryid;
                        industryData.minMatchingScore = industry.minMatchingScore;
                        industryData.maxMatchingScore = industry.maxMatchingScore;
                        industryData.avgMatchingScore = industry.avgMatchingScore;
                        industryData.countMatchingScore = industry.countMatchingScore;

                        //Insert statistic matching score for every industry into database
                        MatchingScores.insert(industryData); 
                        console.log(industry);
                    } else{
                        // Get industry statistic data for updating into database                    
                        var industryData = industry;
                        industryData.updateDate = runDate;
                        industryData.minMatchingScore = industry.minMatchingScore;
                        industryData.maxMatchingScore = industry.maxMatchingScore;
                        industryData.avgMatchingScore = industry.avgMatchingScore;
                        industryData.countMatchingScore = industry.countMatchingScore;

                        //Insert statistic matching score for every industry into database
                        MatchingScores.update(
                            { industryId: industry.industryid }, 
                            { $set: {
                                updateDate: industryData.updateDate,
                                minMatchingScore: industryData.minMatchingScore,
                                maxMatchingScore: industryData.maxMatchingScore,
                                avgMatchingScore: industryData.avgMatchingScore,
                                countMatchingScore: industryData.countMatchingScore
                                }
                            }
                        );                        
                        //console.log(industry);
                    }                    
                });
            //}
        }
	} catch(event){
		console.log(event);
	}
}