angular.module('app.components')

.service('googleMapService', function($window, $q)
{

    // Load Google map API script
    function loadScript()
    {
        // Use global document since Angular's $document is weak
        var script = document.createElement('script');
        script.src = '//maps.googleapis.com/maps/api/js?sensor=false&language=en&callback=initGoogleMaps';

        document.body.appendChild(script);
    }

    return {

        load: function()
        {
            var deferred = $q.defer();

            // Script loaded callback, send resolve
            $window.initGoogleMaps = function()
            {
                deferred.resolve();

                delete $window.initGoogleMaps;
            }

            if (typeof google !== "undefined" && google.maps)
            {
                deferred.resolve();
            }
            else
            {
                loadScript();
            }

            return deferred.promise;

        }

    };

});
