angular.route('public.events/create/index', function(
    $scope,
    $state,
    $log,
    $Api,
    $interval,
    $timeout,
    $q,
    $mdDialog,
    $galeDatepickerDialog,
    $mdConstant
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
        event:
        {},
        results:
        {
            items: []
        },
        tags:
        {
            electricChars: [
                $mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, $mdConstant.KEY_CODE.TAB
                //,$mdConstant.KEY_CODE.SPACE
            ],
            items: []
        }
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
    $scope.queryTags = function(query)
    {
        var deferred = $q.defer();

        $Api.kql("Events/Tags",
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
    };

    $scope.setOrRegister = function(chip)
    {
        // If it is an object, it's already a known chip
        if (angular.isObject(chip))
        {
            return chip;
        }

        // Otherwise, create a new one
        return {
            name: chip
        };
    };

    $scope.find = function(tags)
    {

        $scope.model.results.loading = true;
        delete $scope.model.results.items;

        var query = _.pluck(tags, "name").join(",");
        $Api.read("Events/Search",
            {
                q: query
            })
            .success(function(data)
            {
                $scope.model.results.items = data.items;
            })
            .finally(function()
            {
                $scope.model.results.loading = false;
            });
    };

    //---------------------------------------------------
    // Action's
    $scope.cancel = function()
    {
        $mdDialog.cancel();
    };

    $scope.showCalendar = function(ev, date)
    {
        $galeDatepickerDialog.show(ev,
        {
            selected: (date || new Date())
        }).then(function(selectedDate)
        {
            $scope.model.event.date = selectedDate;
        });
    };

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
    };

});
