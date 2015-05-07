Router.configure({
	loadingTemplate: 'loading',
	waitOn: function(){
		return Meteor.subscribe('matchingscores');
	}
});

Router.route('/', { name: 'homepageLayout' });