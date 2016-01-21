angular.module('app.components')

.directive('flexLoading', function()
{
    return {
        restrict: 'E',
        scope:
        {
            title: '@', // Title While loading
            legend: '@', // Legend While loading
            spinner: '@' // Ionic Spiner when loading
        },
        templateUrl: 'bundles/app/components/flex-loading/flex-loading.tpl.html',
        controller: function($scope, $element)
        {
            $scope.data = {
                spinner: ($scope.spinner || "lines")
            };
        },
        link: function(scope, element, attributes)
        {
            scope.data = {
                title: (scope.title || "Cargando Información"),
                legend: (scope.legend || "procesando...")
            };
        }
    };
});
