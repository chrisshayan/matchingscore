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
  industryData = _.omit(industryData, 'cityid');

  debuger('Update MatchingScores: I ' + industryData.industryId + ' - C ' + industryData.cityId);
  
  //Insert statistic matching score for every industry into database
  return MatchingScores.insert(industryData); 
};

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


  debuger('Update MatchingScores: I ' + industryData.industryId + ' - C ' + industryData.cityId);

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
};

//Check if data existent for searched city, if existed, check updated date.
pullSearchMatchingScore = function(city){
  var searchResult = MatchingScores.findOne({cityId: city});
  var period = Meteor.settings.private.matchingScorePullPeriod;
  if (searchResult){
    dataUpdatedOn = new Date(searchResult.updateDate);
    debuger('Data updated on ' + dataUpdatedOn + ' - C ' + city);

    curDate = new Date();
    if (dataUpdatedOn < curDate.setMinutes(curDate.getMinutes() - 2)){
      debuger("[Outdated] Pull matching score - C " + city);
      pullMatchingScores(city, period);
    }
  } else {
    debuger("[New] Pull matching score - C " + city);
    pullMatchingScores(city, period);
  }
};