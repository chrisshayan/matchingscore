Meteor.publish('matchingscores', function () {
    return MatchingScores.find();
});

Meteor.publish('callmebackusers', function () {
    return callMeBackUsers.find();
});

// Publish master categories data collection
Meteor.publish('masterdata', function(){
    return MasterData.find({ dataType: "categories" });
});