// Function insert new matching score 
insertMatchingScore = function(industry, runDate, cityId){
  // Get industry statistic data for importing into database               
  var industryData = industry;
  industryData.updateDate = runDate;
  industryData.cityId = Number(cityId);

  industryData.industryId = Number(industry.industryid);
  industryData.minMatchingScore = Number(industry.minMatchingScore);
  industryData.maxMatchingScore = Number(industry.maxMatchingScore);
  industryData.avgMatchingScore = Number(industry.avgMatchingScore);
  industryData.countMatchingScore = Number(industry.countMatchingScore);

  industryData = _.omit(industryData, 'industryid');

  //Insert statistic matching score for every industry into database
  return MatchingScores.insert(industryData); 
  //console.log('insert');
  //console.log(industryData);
}

// Function update data of matching score
updateMatchingScore = function(industry, runDate, cityId){
  // Get industry statistic data for updating into database
  var industryData = industry;
  industryData.updateDate = runDate;
  industryData.cityId = Number(cityId);

  industryData.industryId = Number(industry.industryid);
  industryData.minMatchingScore = Number(industry.minMatchingScore);
  industryData.maxMatchingScore = Number(industry.maxMatchingScore);
  industryData.avgMatchingScore = Number(industry.avgMatchingScore);
  industryData.countMatchingScore = Number(industry.countMatchingScore);


  console.log('Function Update MatchingScores');
  console.log(industryData.industryId);
  console.log(industryData.cityId);
  //Update statistic matching score for every industry into database
  return MatchingScores.update(
    { industryId: industryData.industryId, cityId: industryData.cityId }, 
    { $set: {
      updateDate: industryData.updateDate,
      minMatchingScore: industryData.minMatchingScore,
      maxMatchingScore: industryData.maxMatchingScore,
      avgMatchingScore: industryData.avgMatchingScore,
      countMatchingScore: industryData.countMatchingScore
      }
    }
  );
}