angular.module('app.controllers')
    .controller('NewEventDialogController', function(
        $scope,
        $log,
        $timeout,
        $q,
        $Api,
        event,
        $mdDialog
    )
    {
        //---------------------------------------------------
        // Model
        $scope.model = {
            user:
            {
                "fullname": "Sebastian Moreno",
                "photo": "bundles/mocks/images/avatar2.png",
                "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
            },
            event: event
        };

        $scope.map = {
            center:
            {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

        //---------------------------------------------------
        // Function's


        //---------------------------------------------------
        // Action's
        $scope.cancel = function()
        {
            $mdDialog.cancel();
        }

        $scope.showKnowledges = function()
        {
            return [
            {
                name: "Conocmiento 1",
            },
            {
                name: "Conocmiento 2",
            },
            {
                name: "Conocmiento 3",
            }]
        }

    });
