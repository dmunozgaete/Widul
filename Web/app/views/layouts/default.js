angular.module('app.layouts').controller('DefaultLayoutController', function(
    $scope,
    $mdSidenav,
    $state,
    $log,
    $Configuration,
    $timeout,
    $Api,
    $galeFinder,
    $q,
    $location,
    $Identity
)
{

    $scope.user = $Identity.getCurrent();

    //------------------------------------------------------------------------------------
    // KeyDown Event's
    $scope.UIKeyDown = function(event, keyCode)
    {
        /*
        switch (keyCode)
        {
            case 66: //B = Finder
                setTimeout(function()
                {
                    $scope.finder.show();
                }, 100)
                break;
        }
        */
    };


    //------------------------------------------------------------------------------------
    // Model
    $scope.config = {
        application: $Configuration.get("application")
    };

    //------------------------------------------------------------------------------------
    // Bootstrapping : Get the Menu 
    $Api.read("Accounts/Me/Menu").success(function(data)
    {
        $scope.config.menu = data;
    });


    //------------------------------------------------------------------------------------
    // Bootstrapping : Finder
    $scope.finder = {
        onSelect: function(item) {

        },
        onSearch: function(query)
        {
            var defer = $q.defer();
            setTimeout(function()
            {
                //Resolución
                defer.resolve([]);
            }, 200);

            return defer.promise;
        },
        show: $galeFinder.show
    }

    //------------------------------------------------------------------------------------
    // Layout Actions
    $scope.link = function(url)
    {
        $timeout(function()
        {
            $location.url(url);
            //$state.go(url);
        }, 300);
        $mdSidenav('layout-nav-left').close();
    };

    $scope.toogleMenu = function(side)
    {
        $mdSidenav(side).toggle();
    };

    $scope.toggleSection = function(section)
    {
        section.open = !section.open;
    };

    $scope.navigateTo = function(item)
    {
        $scope.link(item.url);
    };

    $scope.logout = function()
    {
        $Identity.logOut();
    };
});
