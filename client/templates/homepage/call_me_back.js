Template.callMeBackModal.events({
    'click #btnCallMeBack': function (e) {
        callMeBackUsers.insert({
            'fullName': $('#fullname').val(),
            'employerCompany': $('#employerCompany').val(),
            'employerCity': $('#employerCity').val(),
            'phone': $('#phone').val(),
            'email': $('#email').val(),
            'submitted': new Date().getTime()
        });

        alert('Thank you! You have just inserted ' + callMeBackUsers.findOne({}, {sort: {submitted: -1}}).fullName + " into the database");
        console.log(callMeBackUsers.find().fetch());
    }
})
;