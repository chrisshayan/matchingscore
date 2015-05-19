callMeBackValidation = function(){
    var result = true;
    var phoneVal = $('#phone').val();
    var emailVal = $('#email').val();

    if (!phoneVal.match(regexPhone)){
        $('#err_phone_invalid').stop().fadeIn();
        $('#btnCallMeBackModal').addClass('disabled');
    } else {
        $('#err_phone_invalid').stop().fadeOut();
        $('#btnCallMeBackModal').removeClass('disabled');
    }

    if (!emailVal.match(regexEmail)){
        $('#err_email_invalid').stop().fadeIn();
       // $('#btnCallMeBackModal').addClass('disabled');
    } else {
        $('#err_email_invalid').stop().fadeOut();
      //  $('#btnCallMeBackModal').removeClass('disabled');
    }

    // console.log(phoneVal + emailVal);
    if (!phoneVal.match(regexPhone) || !emailVal.match(regexEmail)){
        result = false;
    }

    return result;
};