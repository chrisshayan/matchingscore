Template.quickSearchResult.helpers({
    'isHavingResult': function(){
        if(Session.get('searchResult') === undefined & Session.get('isQuickSearchClicked')){
            return true;
        } else {
            return false;
        }
    },
    'showErrorMessage': function(){
        if(Session.get('searchResult') === undefined & Session.get('isQuickSearchClicked')){
            if(Session.get('qsNoIndustry')){
                return 'Vui lòng chọn điều kiện tìm kiếm theo ngành nghề!';
            }

            return 'Không có kết quả Matching Score theo điều kiện tìm kiếm!';
        }
    },
    'minMatchingScore': function(){
        var searchResult =  Session.get('searchResult');
        if(searchResult){
            return searchResult.minMatchingScore;
        } else{
            return 0;
        }
    },
    'maxMatchingScore': function(){
        var searchResult =  Session.get('searchResult');
        if(searchResult){
            return searchResult.maxMatchingScore;
        } else{
            return 0;
        }
    },
    'avgMatchingScore': function(){
        var searchResult =  Session.get('searchResult');
        if(searchResult){
            return searchResult.avgMatchingScore;
        } else{
            return 0;
        }
    },
    'countMatchingScore': function(){
        var searchResult =  Session.get('searchResult');
        if(searchResult){
            return searchResult.countMatchingScore;
        } else{
            return 0;
        }

    }
});