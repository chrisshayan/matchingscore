Template.criteria.events({
    "change #selectedLocation": function(event){
        var selectedLocation = $(event.target).find('option:selected').val();
        return Session.set('selectedLocation', selectedLocation);
    }
});
