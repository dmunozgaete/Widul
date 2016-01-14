angular.route('security/identity/login', function(
    $log,
    $Configuration,
    $Localization,
    $Api,
    $mdToast,
    $state,
    $timeout,
    $Identity,
    $scope,
    $location
)
{
    //Application Information
    $scope.signature = $Configuration.get("application");
    $scope.user = {};

    //Set State accord to user
    var changeState = function(new_state)
    {
        var state = {};
        switch (new_state)
        {
            case "invalid":
                state = {
                    text: "login.state.valid.button",
                    disabled: true,
                    icon: "action:lock_open"
                };
                break;
            case "valid":
                state = {
                    text: "login.state.valid.button",
                    disabled: false,
                    icon: "action:lock_open"
                };
                break;
            case "validating":
                state = {
                    text: "login.state.validating.button",
                    disabled: true,
                    icon: null
                };
                break;
        }
        state.name = new_state;
        $scope.state = state;
    };
    $scope.isValidating = function()
    {
        return $scope.state.name === 'validating';
    };
    $scope.onChange = function(form)
    {
        changeState(form.$valid ? 'valid' : 'invalid');
    };
    $scope.login = function(credentials)
    {
        changeState('validating');
        //Delay for UX
        $timeout(function()
        {
            $Identity.authenticate(credentials)
                .success(function(data)
                {
                    //Boot URL
                    $location.url($scope.signature.home);

                })
                .error(function(error)
                {
                    var error_message = $Localization.get("ERR.API.UNAVAILABLE");
                    if (error && error.error_description)
                    {
                        error_message = error.error_description;
                    }
                    $mdToast.show(
                        $mdToast.simple()
                        .content(error_message)
                        .position('bottom left')
                        .hideDelay(3000)
                    );
                    changeState("valid");
                });
        }, 500);
    };
    changeState('invalid');
});
