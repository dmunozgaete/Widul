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
            $scope.isIonic = typeof ionic !== "undefined"; //CHECK IF MOBILE

            $scope.data = {
                spinner: ($scope.spinner || "lines")
            };
        },
        link: function(scope, element, attributes)
        {
            //TODO: Inject Dinamically via Provider
            var titles = [
                "Widuleando Información"
            ];

            var images = [
                "pesas-cuadrado.gif"
            ];

            var legends = [
                "Las mejores y más bellas cosas del mundo no pueden ser tocadas o vistas-deben ser sentidas con el corazón",
                "El éxito es ir de fracaso en fracaso sin perder el entusiasmo",
                "Todos nuestros sueños se pueden hacer realidad si tenemos el coraje de perseguirlos",
                "Si tienes todo bajo control, no te mueves lo suficientemente rápido",
                "La acción es la llave fundamental de todo éxito",
                "Lo que vale la pena hacerse, mejor hacerlo bien",
                "La oportunidad para el éxito reside en la persona, no en el trabajo",
                "El mejor argumento para decir algo, es la acción",
                "Espera..., solo un poco mas",
                "Ponte comodo mientras esperas...",
                "Nos convertimos en lo que pensamos",
                "No soy producto de mis circunstancias. Soy producto de mis decisiones",
                "Comienza donde estas, usa lo que tienes, haz lo que puedes",
                "Hecho es mejor que perfecto",
                "Si haces lo que siempre has hecho, llegarás donde siempre has llegado",
                "No esperes un cambio si haces siempre lo mismo",
                "Cuando tienes un sueño, tienes que agarrarlo y nunca dejarlo ir"
            ];

            var titleOrdinal = (Math.floor(Math.random() * titles.length) + 0);
            var legendOrdinal = (Math.floor(Math.random() * legends.length) + 0);
            var imageOrdinal = (Math.floor(Math.random() * images.length) + 0);



            scope.data = {
                title: (scope.title || titles[titleOrdinal]),
                legend: (scope.legend || legends[legendOrdinal]),
                image: (scope.image || images[imageOrdinal])
            };
        }
    };
});
