angular.module('app.controllers')
    .controller('EventDetailsDialogController', function(
        $scope,
        $log,
        $timeout,
        $q,
        $Api,
        event,
        $mdDialog,
        $restrictedAccess
    )
    {
        //---------------------------------------------------
        // Model
        $scope.model = {
            event: event,
            newcomment:
            {}
        };

        $scope.map = {
            center:
            {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };


        $Api.query("Events/Details",
            {})
            .success(function(data)
            {

                $scope.model.data = data;
            });


        //---------------------------------------------------
        // Function's
        $scope.follow = function()
        {
            $restrictedAccess.validate().then(function()
            {
                alert("FOLLOW");
            });
        };

        $scope.join = function()
        {
            $restrictedAccess.validate().then(function()
            {
                alert("JOIN");
            });
        };

        //---------------------------------------------------
        // Action's
        $scope.cancel = function()
        {
            $mdDialog.cancel();
        };

    });
