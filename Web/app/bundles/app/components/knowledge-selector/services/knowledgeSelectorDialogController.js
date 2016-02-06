//MODAL CONTROLLER
angular.module('app.components')
    .controller('KnowledgeSelectorDialogController', function(
        $scope,
        $log,
        $q,
        config,
        $mdDialog,
        $Api
    )
    {
        //---------------------------------------------------
        // Model
        $scope.model = {};
        $scope.graph = {};

        //Find Selected in the collection (Binding via ngModel)
        if (config.selected)
        {
            var selected = angular.copy(config.selected);
            $scope.model = selected;
        }
        else
        {

            $Api.read("Knowledges/MostRequested")
                .success(function(data)
                {

                    var graphData = [];

                    //Interpolate to Graph Standard
                    angular.forEach(data, function(item)
                    {
                        graphData.push(
                            {
                                "key": item.name,
                                "values": [
                                    [0, item.requested]
                                ]
                            }

                        );

                    })

                    $scope.graph = {
                        mostRequested: graphData
                    }
                });

        }

        var ordinal = 0;
        $scope.valueFormatFunction = function()
        {
            return function(d)
            {
                var label = $scope.graph.mostRequested[ordinal].key + (" (" + d + ")");
                ordinal++;
                return label;
            }
        };

        //-------------------------------------------
        // Function's
        $scope.knowledge = {
            onSelect: function(place) {},
            onClear: function(name) {},
            find: function(query)
            {
                var deferred = $q.defer();

                $Api.kql("Knowledges",
                {
                    filters: [
                    {
                        property: "name",
                        operator: "contains",
                        value: query
                    }]
                }).success(function(data)
                {
                    deferred.resolve(data.items);
                });

                return deferred.promise;

            }
        };

        //-------------------------------------------
        // Action's
        $scope.save = function(model)
        {
            $mdDialog.hide(model.knowledge);
        };

        $scope.cancel = function()
        {
            $mdDialog.cancel();
        };

    });
