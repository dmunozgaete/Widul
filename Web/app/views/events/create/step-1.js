angular.route('private.events/create/step-1', function(
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
    $loadingDialog,
    $window,
    $Identity
)
{

    //---------------------------------------------------
    // Model
    $scope.model = {
        user: $Identity.getCurrent(),
        event:
        {
            tags: []
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
            ]
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
            value: new Date(zeroDay.toDate()),
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
    $scope.save = function(newEvent)
    {
        var place_deferred = $q.defer();
        var knowledge_deferred = $q.defer();


        $loadingDialog.show(
        {
            title: "Creando Evento..."
        });

        $q.all([place_deferred.promise, knowledge_deferred.promise])
            .then(function(resolves)
            {

                var place = resolves[0];
                var knowledge = resolves[1];
                var dateAndTime = moment(newEvent.date).add(newEvent.time.value);

                $Api.create("Events",
                    {
                        name: newEvent.name,
                        description: newEvent.description,
                        isRestricted: newEvent.isRestricted,
                        isPrivate: newEvent.isPrivate,
                        date: dateAndTime,
                        place: place,
                        knowledge: knowledge,
                        tags: _.pluck(newEvent.tags, 'name')

                    })
                    .finally(function()
                    {
                        $loadingDialog.hide();
                    });

            });



        //Check Place
        if (newEvent.place.token)
        {
            place_deferred.resolve(newEvent.place.token);
        }
        else
        {
            //CREATE PLACES
            $Api.create("Places", newEvent.place)
                .success(function(data)
                {
                    newEvent.place.token = data.token;
                    place_deferred.resolve(data.token);
                });
        }

        //Check Kwnoledge
        if (newEvent.knowledge.token)
        {
            knowledge_deferred.resolve(newEvent.knowledge.token);
        }
        else
        {
            //CREATE KNOWLEDGE
            $Api.create("Knowledges", newEvent.knowledge)
                .success(function(data)
                {
                    newEvent.knowledge.token = data.token;
                    knowledge_deferred.resolve(data.token);
                }).error(function(error)
                {
                    knowledge_deferred.reject(error);
                });
        }

    };

    $scope.cancel = function()
    {
        $window.history.back();
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
            }, 200);

        }
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

});
