// SERVICE
angular.module('app.components')
    .provider('$restrictedAccess', function()
    {
        var $ref = this;

        this.$get = function($log, $q, $timeout, $Identity, $compile, $rootScope)
        {
            var self = {};

            //ADD NEW FACTORY
            self.validate = function(config)
            {
                var deferred = $q.defer();

                var delay = $timeout(function()
                {
                    //Clean
                    $timeout.cancel(delay);

                    if ($Identity.isAuthenticated())
                    {
                        deferred.resolve();
                        return;
                    }
                    else
                    {

                        //Need to create a directive element to avoid using 
                        //$mdDialog, because can't work with multiple dialog's
                        scope = $rootScope.$new();

                        scope.onResolve = function(identity)
                        {
                            deferred.resolve(identity);
                        };

                        var dialog = $compile("<restricted-access-dialog  on-resolve='onResolve' />")(scope);
                        angular.element(document.body).append(dialog);

                    }

                }, 0);

                return deferred.promise;
            };

            return self;
        };
    });
