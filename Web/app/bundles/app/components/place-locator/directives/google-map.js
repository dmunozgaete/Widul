/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('app.components')

.directive('googleMap', function($interpolate)
{
    return {
        restrict: 'E',
        scope:
        {
            coordinates: '='
        },
        templateUrl: 'bundles/app/components/place-locator/google-map.tpl.html',
        controller: function($scope, $element, googleMapService, $q)
        {
            var coordinates = null;

            var setMarker = function(coords)
            {
                if (google.maps)
                {
                    var latLng = {
                        lat: coords.lat,
                        lng: coords.lng
                    };

                    var map = new google.maps.Map($element.find("map")[0],
                    {
                        zoom: 14,
                        center: latLng
                    });


                    var marker = new google.maps.Marker(
                    {
                        position: latLng,
                        map: map,
                        title: 'Hello World!'
                    });

                    $scope.showLoading = false;
                }
            };

            //start loading Map
            googleMapService.load().then(function()
            {
                if (coordinates)
                {
                    setMarker(coordinates);
                }
            });

            //Wath For Model Change
            $scope.$watch("coordinates", function(value)
            {
                if (value)
                {
                    coordinates = value;
                    setMarker(coordinates);
                }
                else
                {
                    $scope.showLoading = true;
                }
            });


        }
    };
});
