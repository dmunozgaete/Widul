    /*------------------------------------------------------
                                                                                                                                                                                                                     Company:           Valentys Ltda.
                                                                                                                                                                                                                     Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
                                                                                                                                                                                                                     
                                                                                                                                                                                                                     Description:       Collection Dialog Controller
                                                                                                                                                                                                                    ------------------------------------------------------*/
    (function()
    {
        //MODAL CONTROLLER
        angular.module('app.components')
            .controller('PlaceLocatorDialogController', function(
                $scope,
                $log,
                $q,
                config,
                $mdDialog,
                googleMapService,
                $Api
            )
            {
                //---------------------------------------------------
                // Model
                $scope.model = {};

                //Find Selected in the collection (Binding via ngModel)
                if (config.selected)
                {
                    var selected = angular.copy(config.selected);
                    $scope.model = selected;
                    $scope.place = selected;
                }

                //-------------------------------------------
                // Function's
                $scope.places = {
                    onSelect: function(place)
                    {
                        if (place)
                        {
                            $scope.model.name = place.name;
                            $scope.model.address = place.address;
                        }
                    },
                    onClear: function(name)
                    {
                        $scope.model.name = name;
                    },
                    find: function(query)
                    {
                        var deferred = $q.defer();

                        $Api.kql("Places",
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

                $scope.address = {
                    onSelect: function(address) {},
                    onClear: function() {},
                    find: function(query)
                    {
                        var deferred = $q.defer();

                        googleMapService.load().then(function()
                        {

                            //When google Maps is ready
                            var geocoder = new google.maps.Geocoder();
                            geocoder.geocode(
                            {
                                'address': query
                            }, function(results, status)
                            {
                                if (status === google.maps.GeocoderStatus.OK)
                                {
                                    var items = [];
                                    angular.forEach(results, function(result)
                                    {

                                        items.push(
                                        {
                                            line: result.formatted_address,
                                            coordinates:
                                            {
                                                lat: result.geometry.location.lat(),
                                                lng: result.geometry.location.lng(),
                                            }
                                        });

                                    });
                                    deferred.resolve(items);

                                }
                                else
                                {
                                    deferred.resolve([]);
                                }
                            });

                        });

                        return deferred.promise
                    }

                };


                //-------------------------------------------
                // Action's
                $scope.save = function(place)
                {
                    var data = {
                        name: place.name,
                        address: place.address
                    };

                    //Exist Place, set Token??
                    if ($scope.place)
                    {
                        data.token = $scope.place.token;
                    }

                    $mdDialog.hide(data);
                };

                $scope.cancel = function()
                {
                    $mdDialog.cancel();
                };

            });

        // SERVICE
        angular.module('app.components')
            .provider('$placeLocatorDialog', function()
            {
                var $ref = this;

                this.$get = function($log, $q, $mdDialog)
                {
                    var self = {};

                    //ADD NEW FACTORY
                    self.show = function(ev, config)
                    {
                        var deferred = $q.defer();
                        $mdDialog.show(
                            {
                                controller: 'PlaceLocatorDialogController',
                                templateUrl: 'bundles/app/components/place-locator/place-locator-dialog.tpl.html',
                                targetEvent: ev,
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                focusOnOpen: true,
                                locals:
                                {
                                    config: config
                                }
                            })
                            .then(function(data)
                            {
                                deferred.resolve(data);
                            }, function()
                            {
                                deferred.reject();
                            });

                        return deferred.promise;
                    };

                    return self;
                };
            });


    })();
