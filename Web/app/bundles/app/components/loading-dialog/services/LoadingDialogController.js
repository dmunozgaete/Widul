 //MODAL CONTROLLER
 angular.module('app.components')
     .controller('LoadingDialogController', function(
         $scope,
         $log,
         config,
         $mdDialog
     )
     {


         //Default
         var setting = (config ||
         {});
         $scope.title = (setting.title || "Procesando Información");
         $scope.legend = (setting.legend || "Espera mientras se ejecuta la solicitud")

     });
