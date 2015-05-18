Template.errors.helpers({
	errors: function(errorType) {
		return Errors.find({ errorType: errorType });
	}
});

Template.errors.events({
	'click .close': function(){
		Errors.remove(this._id);
	}
});