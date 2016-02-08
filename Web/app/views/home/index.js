angular.route('public.home/index', function(
    $scope,
    $state,
    $log,
    $Api,
    $interval,
    $timeout,
    $q,
    $mdConstant,
    $mdDialog,
    $restrictedAccess
)
{

    //-----------------------------------------------
    //Model
    $scope.model = {
        image:
        {
            url: "landscape-1.jpg"
        },
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

    //-----------------------------------------------
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

    //-----------------------------------------------
    // Action's
    $scope.onImageLoaded = function(h, w)
    {
        $scope.model.image.loaded = true;

        //Find the neareast or the most accurated results =)!
        $scope.find([
        {}]);
    };


    $scope.showDetails = function(ev, item)
    {
        $mdDialog.show(
            {
                controller: 'EventDetailsDialogController',
                templateUrl: 'views/events/view/dialogs/eventDetails.tpl.html',
                clickOutsideToClose: false,
                escapeToClose: true,
                focusOnOpen: true,
                fullscreen: true,
                locals:
                {
                    event: item
                }
            })
            .then(function(data)
            {
                //Update Data
            });
    };

    $scope.createEvent = function(ev, item)
    {
        $restrictedAccess.validate().then(function() {

            $state.go("private.events/create/step-1");

        });
        
    };



});
