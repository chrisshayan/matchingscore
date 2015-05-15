//Router.route('/', { name: 'homepageLayout' });

CategoriesListController = RouteController.extend({
    template: 'homepageLayout',
    increment: 5,
    categoriesLimit: function(){
        console.log('categoriesLimit: ' + (parseInt(this.params.categoriesLimit) || this.increment));
        return parseInt(this.params.categoriesLimit) || this.increment;
    },
    findOptions: function(){
        console.log('findOptions: ' + { sort: { avgMatchingScore: -1 }, limit: this.categoriesLimit() });
        return { sort: { avgMatchingScore: -1 }, limit: this.categoriesLimit() };
    },
    subscriptions: function(){
        var selectedLocation = Session.get('selectedLocation');
        if(isNaN(selectedLocation)){
            selectedLocation = -1;
        }
        selectedLocation = Number(selectedLocation);
        this.categoriesSub = Meteor.subscribe('matchingscores', this.findOptions(), selectedLocation);
        console.log('subscriptions: ' + this.categoriesSub);
    },
    matchingscores: function(){
        var selectedLocation = Session.get('selectedLocation');
        if(isNaN(selectedLocation)){
            selectedLocation = -1;
        }
        selectedLocation = Number(selectedLocation);
        return MatchingScores.find({}, this.findOptions(), selectedLocation);
    },
    data:function(){
        console.log('data: ' + {
                matchingscores: this.matchingscores(),
                ready: this.categoriesSub.ready,
                nextPath: hasMore ? nextPath : null
            });
        var hasMore = this.matchingscores().count() == this.categoriesLimit();
        var nextPath = this.route.path({ categoriesLimit: this.categoriesLimit() + this.increment });
        return {
            matchingscores: this.matchingscores(),
            ready: this.categoriesSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});

Router.route('/:categoriesLimit?', {
    name: 'homepageLayout',
    controller: CategoriesListController
});