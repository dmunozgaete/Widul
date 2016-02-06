/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('app.components')

.directive('placeLocator', function($interpolate)
{
    return {
        restrict: 'E',
        require: ['ngModel'],
        scope:
        {
            ngModel: '=' // Ng-Model
        },
        transclude: true,
        templateUrl: 'bundles/app/components/place-locator/place-locator.tpl.html',
        compile: function()
        {
            return {             
                post: function(scope, element, attrs, controller, transcludeFn)
                {         

                    //Watch Disabled Attr (and ng-disabled too)
                    attrs.$observe('disabled', function(val)
                    {
                        if (val === "")
                        {
                            val = true;
                        }
                        scope.disabled = val;
                    });

                }         
            };
        },
        controller: function($scope, $element, $placeLocatorDialog, $q)
        {
            $scope.data = {
                placeholder: $scope.placeholder,
                displayValue: null
            };

            var focusedClass = "md-input-focused";
            $scope.show = function(ev)
            {
                if ($scope.disabled)
                {
                    return;
                }
                var inputContainer = $element.parent();
                inputContainer.addClass(focusedClass);

              
                //DEFER
                $placeLocatorDialog.show(ev,
                {
                    selected: $scope.ngModel,
                    itemText: $scope.itemText,
                    classToAdd: $element.attr("class"),
                }).then(function(data)
                {
                    // Set
                    if (data)
                    {
                        $scope.ngModel = data;
                    }

                    inputContainer.removeClass(focusedClass);
                }, function()
                {
                    inputContainer.removeClass(focusedClass);
                });

            };


            //Set Placeholder Label (from the input-container, or via placeholder attr)
            //md-input-container
            var parent = $element.parent();
            if (parent.length > 0)
            {
                var label = parent.find("label");
                $scope.placeholder = label.html();
            }
            else
            {
                $scope.placeholder = $element.attr("placeholder");
            }


            //Wath For Model Change
            $scope.$watch("ngModel", function(value)
            {
                if (value)
                {
                }
            });



        }
    };
});
