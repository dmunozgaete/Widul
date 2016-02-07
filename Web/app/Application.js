angular.module('App', [
        'gale-material' //ANGULAR-GALE & ANGULAR-GALE-MATERIALLIBRARY
        , 'app' //CUSTOM PROJECT LIBRARY
        , 'material-icons' //CUSTOM PROJECT LIBRARY

        , 'ui.utils' //UI UTILITIES LIKE MASK

        , 'nvd3ChartDirectives' //N3 CHART DIRECTIVES

        , 'angularMoment' //ANGULAR MOMENT
        , 'angularFileUpload' //ANGULAR FILE UPLOAD

        , 'mocks' //Mocks Only for Testing
    ])
    /*
        .config(function(uiGmapGoogleMapApiProvider)
        {
            
            //Maps Configuration
            var googleKey = 'AIzaSyANyXwrXOkNgp9RPOAuebclIHLU2FWmPAA';
            uiGmapGoogleMapApiProvider.configure(
            {
               // key: googleKey,
                libraries: 'visualization',
                v: '3.5',
                sensor: false
            });
        })
        */
    .run(function($location)
    {
        $location.path('/public/boot');
    })
    .config(function($ApiProvider, $uploadFileProvider, CONFIGURATION)
    {
        //API Base Endpoint
        $ApiProvider.setEndpoint(CONFIGURATION.API_Endpoint);
        $uploadFileProvider.setFileEndpoint(CONFIGURATION.API_Endpoint + "Files/");
    })
    .config(function($IdentityProvider, SynchronizerProvider, MocksProvider)
    {
        //Security Provider
        $IdentityProvider
            .enable() //Enable
            .setIssuerEndpoint("Security/Authorize")
            .setLogInRoute("security/identity/login")
            .setWhiteListResolver(function(toState, current)
            {

                //Only Enable Access to Exception && Public State's
                if (toState.name.startsWith("exception.") ||
                    toState.name.startsWith("public."))
                {
                    return true;
                }

                //Restrict Other State's
                return false;

            });

        //Synchronizer Manager
        SynchronizerProvider
            .autoLoadSynchronizers() //Auto Load Synchronizer via Reflection
            .frequency(45000); //Frequency between sync process

        //Mocking Module (While the API is in Construction)
        MocksProvider
            .enable()
            .setDelay(0); //Simulate a Short Delay ^^, (More 'Real' experience)

    })
    .config(function(
        MocksProvider,
        SynchronizerProvider,
        ApplicationCleanseProvider,
        CONFIGURATION)
    {
        //Enable Debug for GPS and RouteTracker
        if (CONFIGURATION.debugging)
        {
            //Debugger Information
            MocksProvider.debug();
            SynchronizerProvider.debug();
            ApplicationCleanseProvider.debug();
        }

    })
    .config(function($mdThemingProvider)
    {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink')
            .warnPalette('red');
    })
    .config(function($stateProvider, $urlRouterProvider)
    {
        $stateProvider
            .state('app',
            {
                url: "/app",
                abstract: true,
                // ---------------------------------------------
                // ONE-PAGE COLUMNS TEMPLATE
                // ---------------------------------------------
                templateUrl: "views/layouts/one-page.html",
                controller: "OnePageLayoutController"
            })
            .state('exception',
            {
                url: "/exception",
                abstract: true,
                // ---------------------------------------------
                // EXCEPTION TEMPLATE
                // ---------------------------------------------
                templateUrl: "views/layouts/exception.html",
                controller: "ExceptionLayoutController"
            })
            .state('public',
            {
                url: "/public",
                abstract: true,
                // ---------------------------------------------
                // PUBLIC TEMPLATE
                // ---------------------------------------------
                templateUrl: "views/layouts/public.html",
                controller: "PublicLayoutController"
            });
        $urlRouterProvider.otherwise(function($injector, $location)
        {
            if ($location.path() !== "/")
            {
                var $state = $injector.get("$state");
                $state.go("exception.error/404");
            }
        });
    })
    .config(function($logProvider, CONFIGURATION)
    {
        $logProvider.debugEnabled(CONFIGURATION.debugging || false);
    });
