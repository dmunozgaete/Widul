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

         var toLocatorPlace = function(apiPlace)
         {
             return {
                 token: apiPlace.token,
                 name: apiPlace.name,
                 tip: apiPlace.tip,
                 capacity: apiPlace.capacity,
                 address:
                 {
                     line: apiPlace.address,
                     coordinates:
                     {
                         lat: apiPlace.lat,
                         lng: apiPlace.lng
                     }
                 }
             };
         };

         //-------------------------------------------
         // Function's
         $scope.places = {
             onSelect: function(place)
             {
                 if (place)
                 {
                     $scope.model = toLocatorPlace(place);
                 }
             },
             onClear: function(name)
             {
                 $scope.model = {
                     name: name
                 };

             },
             find: function(query)
             {
                 var deferred = $q.defer();

                 $Api.query("Places",
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
             onSelect: function(address) {

             },
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


         //Find Selected in the collection (Binding via ngModel)
         if (config.selected)
         {
             // var selected = angular.copy(config.selected);
             var place = toLocatorPlace(config.selected);
             $scope.model = place;
             $scope.place = place;
         }

         //-------------------------------------------
         // Action's
         $scope.save = function(place)
         {
             var data = {
                 name: place.name,
                 address: place.address.line,
                 lat: place.address.coordinates.lat,
                 lng: place.address.coordinates.lng,
                 capacity: place.capacity,
                 tip: place.tip
             };

             //Exist Place ??, set Token
             if (place.token)
             {
                 data.token = place.token;
             }

             $log.debug(data);
             $mdDialog.hide(data);
         };

         $scope.cancel = function()
         {
             $mdDialog.cancel();
         };

     });
