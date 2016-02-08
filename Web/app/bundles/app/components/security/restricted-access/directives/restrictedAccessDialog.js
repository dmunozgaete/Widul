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
            onResolve: '=' //onResolve callback when authorization is completed
        },
        templateUrl: 'bundles/app/components/security/restricted-access/restricted-access-dialog.tpl.html',
        controller: function($scope, $element, $q, $Configuration, $mdToast)
        {

            $scope.signature = $Configuration.get("application");


            //Set State accord to user
            $scope.onUpdateState = function(new_state)
            {
                $scope.state = new_state;
            };

            $scope.onAuthenticationFails = function(message)
            {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position('bottom left')
                    .hideDelay(3000)
                );

                throw {
                    message: message
                };
            };

            $scope.onAuthenticationSuccess = function(identity)
            {

                $element.remove();
                
                $scope.onResolve(identity);
            };


        }
    };
});
