angular.module('app.layouts')
    .controller('PrivateLayoutController', function(
        $rootScope,
        $scope,
        $mdSidenav,
        $state,
        $log,
        $Configuration,
        $mdDialog,
        $mdToast,
        $stateParams,
        $timeout,
        $galeLoading,
        $Identity
    )
    {

        $scope.user = $Identity.getCurrent();


        //------------------------------------------------------------------------------------
        // Model
        $scope.config = {
            application: $Configuration.get("application")
        };

        $scope.toogleMenu = function(side)
        {
            $mdSidenav(side).toggle();
        };

        $scope.logout = function()
        {
            $Identity.logOut();
        };

    });
