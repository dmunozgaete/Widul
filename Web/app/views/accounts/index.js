angular.route('app.accounts/index/:type', function(
    $scope,
    $log,
    $galeTable,
    $state,
    $Configuration,
    $stateParams
)
{
    //------------------------------------------------------------
    //Table Setup
    $galeTable.then(function(component)
    {
        var kql = {
            limit: 1000
        };
        if ($stateParams.type)
        {
            kql = {
                filters: [
                {
                    property: "type_identifier",
                    operator: 'eq',
                    value: $stateParams.type
                }]
            };
        }

        //Endpoint Setup
        component.setup("Accounts", kql);

        //Row Click 
        component.$on("row-click", function(ev, item)
        {
            $state.go("app.accounts/edit",
            {
                token: item.token
            });
        });

    });

});
