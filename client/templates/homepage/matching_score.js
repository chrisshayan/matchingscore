Template.matchingScore.helpers({
    categoryName: function(){
        var categories = MasterData.find({ categoryId: Number(this.industryId) }, {reactive: false}).fetch();
        return categories[0].categoryVNName;
    },
    _countMatchingScore: function(){
        if (this.oldData === undefined || this.oldData === null){
            return Spacebars.SafeString(
                '&nbsp;&nbsp;&nbsp;&nbsp;' + this.countMatchingScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
        } else if (this.oldData.countMatchingScore == this.countMatchingScore) {
            return Spacebars.SafeString(
                '&nbsp;&nbsp;&nbsp;&nbsp;' + this.countMatchingScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
        } else if (this.oldData.countMatchingScore > this.countMatchingScore) {
            return Spacebars.SafeString(
                "<img src=\"/assets/images/index-down.png\" class=\"status-down\" alt=\"down\"/> " +
                this.countMatchingScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' (' + 
                    (this.countMatchingScore - this.oldData.countMatchingScore).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 
                    ')'
                );
        } else {
            return Spacebars.SafeString(
                "<img src=\"/assets/images/index-up.png\" class=\"status-up\" alt=\"up\"/> " +
                this.countMatchingScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' (+' + 
                    (this.countMatchingScore - this.oldData.countMatchingScore).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 
                    ')'
                );
        }
    },
    _minMatchingScore: function(){
        if (this.oldData === undefined || this.oldData === null){
            return Spacebars.SafeString(
                '&nbsp;&nbsp;&nbsp;&nbsp;' + (' ' + parseFloat(this.minMatchingScore).toFixed(2)).slice(-6)
                );
        } else if (this.oldData.minMatchingScore == this.minMatchingScore) {
            return Spacebars.SafeString(
                '&nbsp;&nbsp;&nbsp;&nbsp;' + (' ' + parseFloat(this.minMatchingScore).toFixed(2)).slice(-6)
                );
        } else if (this.oldData.minMatchingScore > this.minMatchingScore) {
            return Spacebars.SafeString(
                "<img src=\"/assets/images/index-down.png\" class=\"status-down\" alt=\"down\"/> " +
                (' ' + parseFloat(this.minMatchingScore).toFixed(2)).slice(-6) + ' (' + 
                    parseFloat(this.minMatchingScore - this.oldData.minMatchingScore).toFixed(2) + 
                    ')'
                );
        } else {
            return Spacebars.SafeString(
                "<img src=\"/assets/images/index-up.png\" class=\"status-up\" alt=\"up\"/> " +
                (' ' + parseFloat(this.minMatchingScore).toFixed(2)).slice(-6) + ' (+' + 
                    parseFloat(this.minMatchingScore - this.oldData.minMatchingScore).toFixed(2) + 
                    ')'
                );
        }
    },
    _avgMatchingScore: function(){
    	if (this.oldData === undefined || this.oldData === null){
    		return Spacebars.SafeString(
                '&nbsp;&nbsp;&nbsp;&nbsp;' + (' ' + parseFloat(this.avgMatchingScore).toFixed(2)).slice(-6)
                );
    	} else if (this.oldData.avgMatchingScore == this.avgMatchingScore) {
    		return Spacebars.SafeString(
                '&nbsp;&nbsp;&nbsp;&nbsp;' + (' ' + parseFloat(this.avgMatchingScore).toFixed(2)).slice(-6)
                );
    	} else if (this.oldData.avgMatchingScore > this.avgMatchingScore) {
    		return Spacebars.SafeString(
    			"<img src=\"/assets/images/index-down.png\" class=\"status-down\" alt=\"down\"/> " +
                (' ' + parseFloat(this.avgMatchingScore).toFixed(2)).slice(-6) + ' (' + 
                    parseFloat(this.avgMatchingScore - this.oldData.avgMatchingScore).toFixed(2) + 
                    ')'
    			);
    	} else {
    		return Spacebars.SafeString(
    			"<img src=\"/assets/images/index-up.png\" class=\"status-up\" alt=\"up\"/> " +
                (' ' + parseFloat(this.avgMatchingScore).toFixed(2)).slice(-6) + ' (+' + 
                    parseFloat(this.avgMatchingScore - this.oldData.avgMatchingScore).toFixed(2) + 
                    ')'
    			);
    	}
    },
    _maxMatchingScore: function(){
        if (this.oldData === undefined || this.oldData === null){
            return Spacebars.SafeString(
                '&nbsp;&nbsp;&nbsp;&nbsp;' + (' ' + parseFloat(this.maxMatchingScore).toFixed(2)).slice(-6)
                );
        } else if (this.oldData.maxMatchingScore == this.maxMatchingScore) {
            return Spacebars.SafeString(
                '&nbsp;&nbsp;&nbsp;&nbsp;' + (' ' + parseFloat(this.maxMatchingScore).toFixed(2)).slice(-6)
                );
        } else if (this.oldData.maxMatchingScore > this.maxMatchingScore) {
            return Spacebars.SafeString(
                "<img src=\"/assets/images/index-down.png\" class=\"status-down\" alt=\"down\"/> " +
                (' ' + parseFloat(this.maxMatchingScore).toFixed(2)).slice(-6) + ' (' + 
                    parseFloat(this.maxMatchingScore - this.oldData.maxMatchingScore).toFixed(2) + 
                    ')'
                );
        } else {
            return Spacebars.SafeString(
                "<img src=\"/assets/images/index-up.png\" class=\"status-up\" alt=\"up\"/> " +
                (' ' + parseFloat(this.maxMatchingScore).toFixed(2)).slice(-6) + ' (+' + 
                    parseFloat(this.maxMatchingScore - this.oldData.maxMatchingScore).toFixed(2) + 
                    ')'
                );
        }
    }
});