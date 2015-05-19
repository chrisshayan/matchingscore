// Subcribe for master categories data
Meteor.subscribe('masterdata');

ShareIt.configure({
    useFB: true,          // boolean (default: true)
                          // Whether to show the Facebook button
    useTwitter: false,     // boolean (default: true)
                          // Whether to show the Twitter button
    useGoogle: false,      // boolean (default: true)
                          // Whether to show the Google+ button
    classes: "large btn", // string (default: 'large btn')
                          // The classes that will be placed on the sharing buttons, bootstrap by default.
    iconOnly: true,      // boolean (default: false)
                          // Don't put text on the sharing buttons
    applyColors: true     // boolean (default: true)
                          // apply classes to inherit each social networks background color
});