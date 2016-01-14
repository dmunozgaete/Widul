angular.module('app.controllers')

.controller('ApplicationCompanySelectionController', function(
    $window,
    $scope,
    $mdDialog,
    $Api,
    $q,
    $galeTable
)
{

    //Table Setup
    $galeTable.then(function(component)
    {
        //Endpoint Setup
        component.setup("Companies");

        //Row Click 
        component.$on("row-click", function(ev, item)
        {
            $scope.save(item);
        });

    });

    $scope.cancel = function()
    {
        $mdDialog.hide(null);
    };

    $scope.save = function(item)
    {
        $mdDialog.hide(item);
    };


});
