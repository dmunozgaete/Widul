/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('app.components')

.directive('externalAuthenticators', function()
{
    return {
        restrict: 'E',
        scope:
        {
            onAuthenticate: '=', //Callback when authorization is completed
            onError: '=', //Callback when authorization fails
            onChangeState: '=' //Callback to send feedback 
        },
        templateUrl: 'bundles/app/components/security/external-authenticators/external-authenticators.tpl.html',
        controller: function($scope, $element, $q, $Configuration, $Identity, Facebook, $Api)
        {

            $scope.signature = $Configuration.get("application");

            //Set State accord to user
            var changeState = function(new_state)
            {
                var state = {};
                switch (new_state)
                {
                    case "authorizing":
                        state = {
                            disabled: true
                        };
                        break;
                    case "normal":
                        state = {
                            disabled: false,
                        };
                        break;
                }
                state.name = new_state;
                $scope.state = state;

                if ($scope.onChangeState)
                {
                    $scope.onChangeState(state);
                }
            };

            var throwError = function(message)
            {
                //Resolve Callback
                changeState("normal");
                $scope.onError(message);
            };

            $scope.login = function(type)
            {
                changeState('authorizing');
                switch (type)
                {
                    case "facebook":
                        Facebook.login(function(response)
                        {
                            //All right??
                            if (response.status == "connected")
                            {
                                var accessToken = response.authResponse.accessToken;

                                Facebook.api("me/?fields=id,email,name,picture.type(large),location", function(data)
                                {

                                    //GO TO API, CHECK THE TOKEN ,
                                    // AND IF IS CORRECT , CREATE OR GET THE USER
                                    data.accessToken = accessToken;
                                    data.image = data.picture.data.url;

                                    delete data.picture; //Remove this =)

                                    $Api.create("/Security/Oauth/Facebook", data)
                                        .success(function(oauthToken)
                                        {
                                            //Authenticated
                                            $Identity.logIn(oauthToken);

                                            //Resolve Callback
                                            $scope.onAuthenticate(data);

                                        }).error(throwError);

                                });

                            }
                            else
                            {
                                throwError("FB Error: " + response.status);
                            }
                        },
                        {
                            scope: 'email,user_friends'
                        });
                        break;
                    case "google":
                        break;
                };

            };
            changeState('normal');

            $scope.login('facebook');


        }
    };
});
