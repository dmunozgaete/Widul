angular.route('app.accounts/create', function(
    $scope,
    $state,
    $log,
    $Api,
    $stateParams,
    $Configuration,
    $window,
    actionDialogs,
    $galeLoading,
    $mdDialog
)
{
    //------------------------------------
    // Model
    $scope.data = {};

    //------------------------------------
    // Get all profiles
    $Api.kql("Roles",
    {
        limit: 100
    }).success(function(data)
    {
        $scope.allRoles = data.items;
    });

    //------------------------------------
    // Button Action's
    $scope.back = function()
    {
        history.back();
    };

    $scope.cancel = function(data)
    {
        actionDialogs.cancel().then($scope.back);
    };

    $scope.toggleRole = function(item, ev)
    {
        if (!item.selected && item.identifier == 'COMP')
        {
            $mdDialog.show(
            {
                controller: 'ApplicationCompanySelectionController',
                templateUrl: 'views/accounts/dialogs/company-selection.html',
                targetEvent: ev,
                clickOutsideToClose: false

            }).then(function(result)
            {
                if (result)
                {
                    item.selected = true;
                    $scope.data.company = result.token;
                }

            })

        }
        else
        {
            item.selected = !item.selected;
        }
    };


    $scope.save = function(data)
    {
        //set Roles 
        var roles = [];
        angular.forEach($scope.allRoles, function(role)
        {
            if (role.selected)
            {
                roles.push(role.token);
            }
        });
        data.roles = roles;

        $galeLoading.show();
        $Api.create("Accounts", data)
            .success(function()
            {
                //OK , go back =)
                $scope.back();

            }).error($galeLoading.hide);

    };
});
