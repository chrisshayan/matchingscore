Template.buyService.events({
    'click #btnBuyNow':function(){
        alert('The button was clicked, what is the next thing you wanna do? Click "OK" to close');
    },

    'click #btnCallMeBack':function(){
        $('#callMeBackModal').modal('show');
    }
});