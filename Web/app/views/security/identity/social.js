angular.route('security/identity/social', function(
    $log,
    $Configuration,
    $mdToast,
    $state,
    $timeout,
    $Identity,
    $scope,
    $location,
    $Api
)
{
    //Application Information
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

    $scope.onAuthenticationSuccess = function(type) {
        $state.go("public.boot");
    };
});
