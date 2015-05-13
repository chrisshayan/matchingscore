Template.quickSearchResult.helpers({
    'minMatchingScore': function(){
        var searchResult =  Session.get('searchResult');
        if(searchResult){
            return searchResult[0].minMatchingScore;
        } else{
            return 0;
        }
    },
    'maxMatchingScore': function(){
        var searchResult =  Session.get('searchResult');
        if(searchResult){
            return searchResult[0].maxMatchingScore;
        } else{
            return 0;
        }
    },
    'avgMatchingScore': function(){
        var searchResult =  Session.get('searchResult');
        if(searchResult){
            return searchResult[0].avgMatchingScore;
        } else{
            return 0;
        }
    },
    'countMatchingScore': function(){
        var searchResult =  Session.get('searchResult');
        if(searchResult){
            return searchResult[0].countMatchingScore;
        } else{
            return 0;
        }

    }
});