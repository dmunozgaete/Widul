angular.route('public.events/create/step-1', function(
    $scope,
    $state,
    $log,
    $Api,
    $interval,
    $timeout,
    $q,
    $mdDialog,
    $galeDatepickerDialog,
    $mdConstant,
    $window
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

    //---------------------------------------------------
    // Hour's For Time
    var times = [];
    var zeroDay = moment(0).startOf('day');
    for (var index = 0; index < 46; index++)
    {
        if (index > 0)
        {
            zeroDay.add(30, 'minutes');
        }
        times.push(
        {
            value: zeroDay.toDate(),
            label: zeroDay.format("HH:mm a").toUpperCase()
        });
    }
    $scope.times = times;
    //---------------------------------------------------


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

    $scope.tooggleSettings = function()
    {

        var isShow = $scope.showAdvancedSettings = !$scope.showAdvancedSettings;
        if (isShow)
        {
            //Move to bottom
            setTimeout(function()
            {
                window.scrollTo(0, 500);
            }, 200)

        }
    };

    $scope.showCalendar = function(ev, date)
    {
        $galeDatepickerDialog.show(ev,
        {
            selected: (date || new Date())
        }).then(function(selectedDate)
        {
            debugger;
            $scope.model.event.date = selectedDate;
        });
    };

});
