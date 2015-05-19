addCrmLead = function (customerInfo) {
    try {
        debuger('Adding ... CRM Lead for ' + customerInfo.email + ' ' + customerInfo.locationCrmCode, 2);

        var result = Meteor.http.call(
            "POST", Meteor.settings.private.crmLeadApiUrl
            , {
                headers: {
                    "content-type": "application/json;charset=utf-8",
                    "Accept": "application/json"
                },
                data: {
                    "Subject": Meteor.settings.private.crmLeadSubject,
                    "FirstName": customerInfo.name,
                    "CompanyName":customerInfo.company,
                    "Qntt_City": customerInfo.locationCrmCode,
                    "Telephone1": customerInfo.phone,
                    "EmailAddress1":customerInfo.email,
                    "Qntt_Source": Meteor.settings.private.crmSourceKey4CallMeBack,
                    "LeadQualityCode":Meteor.settings.private.crmLeadQualityCode,
                    "Qntt_LegalName":customerInfo.company,
                    "CampaignId": Meteor.settings.private.crmCampaignKey4MS
                }
            }
        );
        
        if(JSON.parse(result.content)){
            debuger('Added CRM Lead for ' + customerInfo.email + ' ' + customerInfo.locationCrmCode, 2);
            return true;
        }

    } catch (e) {
        console.log(e);
        return false;
    }
};