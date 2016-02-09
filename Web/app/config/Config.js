angular.module("config", []).constant("GLOBAL_CONFIGURATION",
{
    //Application data
    application:
    {
        version: "1.0.0-rc.1",
        environment: "qas",
        language: "es",
        name: "Widul",
        //home: "security/identity/social",
        //home: "private/events/create/step-1"
        home: "public/home"
    },

    on_build_new_version: function(newVersion, oldVersion)
    {

        //When has new Version , set the mark in the localstoage 
        localStorage.setItem("$_new_version", 1);
    },

    localstorageStamps:
    {
        personal_data: "$_personal_data",
        new_version: "$_new_version"
    }

});
