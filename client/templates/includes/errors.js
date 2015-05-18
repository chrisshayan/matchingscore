Template.errors.helpers({
	errors: function() {
		return Errors.find();
	}
});

Template.errors.events({
	'click .close': function(){
		Errors.remove(this._id);
	}
});