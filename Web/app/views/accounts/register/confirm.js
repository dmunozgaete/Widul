angular.route('public.accounts/register/confirm/:token', function(
    $scope,
    $log,
    $state,
    $stateParams,
    $galeLoading,
    $Api
)
{

    var tempToken = $stateParams.token;

    //Get Payload
    var payload = tempToken.split('.')[1];
    if (atob)
    {
        data = decodeURIComponent(escape(atob(payload)));
    }
    else
    {
        throw Error("ATOB_NOT_IMPLEMENTED");
    }
    data = JSON.parse(data);

    $scope.tempToken = tempToken;

    $scope.data = {
        token: data.primarysid,
        fullname: data.unique_name,
        email: data.email,
        photo: data.photo
    };

    //---------------------------------------------
    // Action's
    $scope.save = function(data)
    {

        $galeLoading.show();
        $Api.update('Accounts/Register/Confirm', data,
            {
                Authorization: 'Bearer {0}'.format([tempToken])
            })
            .success(function(data)
            {

                $galeLoading.hide();
                $state.go("security/identity/login");

            })
            .error($galeLoading.hide);

    };



});
