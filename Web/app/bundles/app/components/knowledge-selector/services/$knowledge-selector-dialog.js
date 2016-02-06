// SERVICE
angular.module('app.components')
    .provider('$knowledgeSelectorDialog', function()
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
                        controller: 'KnowledgeSelectorDialogController',
                        templateUrl: 'bundles/app/components/knowledge-selector/knowledge-selector-dialog.tpl.html',
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
