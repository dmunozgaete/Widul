/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Application Cleanse Manager
------------------------------------------------------*/
angular.module('app.services')
    .provider('ApplicationCleanse', function()
    {
        var $ref = this;

        //---------------------------------------------------
        //Configurable Variable on .config Step
        var _debug = false;

        this.debug = function()
        {
            _debug = true;
            return $ref;
        };

        this.$get = function($log, $q, $timeout, $LocalStorage, $Identity)
        {
            var self = {};

            self.clean = function(isNewVersion)
            {
                var defer = $q.defer();
                defer.resolve();

                return defer.promise;

            };

            return self;
        };

    });
