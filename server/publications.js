Meteor.publish('matchingscores', function () {
    return MatchingScores.find();
});

Meteor.publish('callmebackusers', function () {
    return callMeBackUsers.find();
});