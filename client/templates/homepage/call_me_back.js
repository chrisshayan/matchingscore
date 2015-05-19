Template.callMeBackModal.events({
    'click #btnCallMeBackModal': function (e) {
        callMeBackUsers.insert({
            'fullName': $('#fullname').val(),
            'customerCompany': $('#customerCompany').val(),
            'customerCity': $('#customerCity').val(),
            'phone': $('#phone').val(),
            'email': $('#email').val(),
            'submitted': new Date().getTime()
        });

        alert('Thank you! You have just inserted ' + callMeBackUsers.findOne({}, {sort: {submitted: -1}}).fullName + " into the database");
        console.log(callMeBackUsers.find().fetch());
    },

    'keyup #phone': function (e) {
        if (isNaN($('#phone').val())) {
            $('#err_phone_invalid').stop().fadeIn();
            $('#btnCallMeBackModal').addClass('disabled');
        } else {
            $('#err_phone_invalid').stop().fadeOut();
            $('#btnCallMeBackModal').removeClass('disabled');
        }
    }
});


Template.callMeBackModal.helpers({
    locationsList: function(){
        return MasterData.find({ dataType: "location" }, {sort: {"locationVNName": 1}}, {reactive: false}).fetch();
    }
});