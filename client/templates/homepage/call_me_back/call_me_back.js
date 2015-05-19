regexPhone = /^[0-9\-]+$/;
regexEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;

Template.callMeBackModal.events({
    'click #btnCallMeBackModal': function (e) {

        if (callMeBackValidation()) {
            var customerInfo = {
                'name': $('#fullname').val(),
                'company': $('#customerCompany').val(),
                'vnwCityId': parseInt($('#callMeBackLocation').val()),
                'phone': $('#phone').val(),
                'email': $('#email').val(),
                'submittedDate': new Date().getTime()
            };

            callMeBackUsers.insert(customerInfo);
            Meteor.call('callAddCRMLead', customerInfo);

           // alert('Thank you! Will contact you soon.');
            $('#callMeBackModal').modal('hide');
        }
    },

    'keyup #phone': function (e) {
        var phoneVal = $('#phone').val();

        if (!phoneVal.match(regexPhone)){
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