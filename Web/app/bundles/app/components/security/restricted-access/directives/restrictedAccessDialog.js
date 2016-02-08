/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('app.components')

.directive('restrictedAccessDialog', function()
{
    return {
        restrict: 'E',
        scope:
        {
            onUpdateState: '=?',
            onAuthenticationFails: '=?',
            onAuthenticationSuccess: '=?'
        },
        templateUrl: 'bundles/app/components/security/restricted-access/restricted-access-dialog.tpl.html',
        controller: function($scope, $element, $q, $Configuration, $mdToast, $timeout)
        {
            $scope.signature = $Configuration.get("application");

            //GARBAGE COLLECTOR
            function destroy()
            {
                $element.addClass("ng-hide");
                var delay = $timeout(function()
                {
                    $element.remove();

                    $timeout.cancel(delay);
                }, 400);

            };

            //Set State accord to user
            $scope._onUpdateState = function(new_state)
            {
                $scope.state = new_state;
                if ($scope.onUpdateState)
                {
                    $scope.onUpdateState(new_state);
                }
            };

            $scope._onAuthenticationFails = function(message)
            {
                $mdToast.show(
                    $mdToast.simple()
                    .content("Error de Identificación: Intentalo denuevo!")
                    .position('bottom left')
                    .hideDelay(3000)
                );

                destroy();

                if ($scope.onAuthenticationFails)
                {
                    $scope.onAuthenticationFails(message);
                }

                throw {
                    message: message
                };
            };

            $scope._onAuthenticationSuccess = function(identity)
            {
                destroy();

                if ($scope.onAuthenticationSuccess)
                {
                    $scope.onAuthenticationSuccess(identity);
                }
            };

            $scope.close = function()
            {
                $scope._onAuthenticationFails("user_cancel");
            };

            $scope.$on("$destroy", destroy);

        }
    };
});
