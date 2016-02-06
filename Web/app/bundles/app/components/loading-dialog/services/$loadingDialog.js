// SERVICE
angular.module('app.components')
    .provider('$loadingDialog', function()
    {
        var $ref = this;

        this.$get = function($log, $q, $mdDialog)
        {
            var self = {};

            //ADD NEW FACTORY
            self.show = function(config)
            {
                var deferred = $q.defer();
                $mdDialog.show(
                    {
                        controller: 'LoadingDialogController',
                        templateUrl: 'bundles/app/components/loading-dialog/loading-dialog.tpl.html',
                        targetEvent: config.targetEvent,
                        clickOutsideToClose: false,
                        escapeToClose: false,
                        focusOnOpen: false,
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

            self.hide = function()
            {
                $mdDialog.hide();
            };

            return self;
        };
    });
