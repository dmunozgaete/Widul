/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('app.components')

.directive('identityBox', function()
{
    return {
        restrict: 'E',
        scope:
        {},
        templateUrl: 'bundles/app/components/security/identity-box/identity-box.tpl.html',
        controller: function($scope, $element, $q, $Identity, $rootScope, $restrictedAccess)
        {
            var isAuthenticated = $scope.isAuthenticated = $Identity.isAuthenticated();
            if (isAuthenticated)
            {
                $scope.user = $Identity.getCurrent();
            }

            //--------------------------------------------
            // Action's
            $scope.logIn = function()
            {
                $restrictedAccess.validate();
            };

            $scope.logOut = function()
            {
                $Identity.logOut(
                {
                    redirectToLoginPage: false
                });
            };

            //--------------------------------------------
            // Event Hook's

            //When Authenticated State Change, Update Identity Box
            $rootScope.$on("auth-login-success", function(token)
            {
                isAuthenticated = $scope.isAuthenticated = true;
                $scope.user = $Identity.getCurrent();
            });

            $rootScope.$on("auth-logout-success", function()
            {
                isAuthenticated = $scope.isAuthenticated = false;
                delete $scope.user;
            });
        }
    };
});
