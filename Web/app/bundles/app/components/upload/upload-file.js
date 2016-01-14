angular.module('app.components')

.directive('uploadFile', function()
{
    return {
        restrict: 'E',
        scope:
        {
            ngDisabled: '=', //Check if the element is disabled
            ngModel: '=', //ng-model Token Binding
            onStart: '&', // Start Event
            onSend: '&', // Before Send File to Server (Useful for custom Headers)
            onProgressChange: '&', // When Upload Progress Change
            onComplete: '&', // When The upload file is complete
            onError: '&' // When an Error is ocurred
        },
        templateUrl: 'bundles/app/components/upload/upload-file.tpl.html',
        controller: function($scope, $element, $upload, $Identity, $uploadFile)
        {
            $scope.ngDisabled = $scope.ngDisabled||(false);


            var getFileUrl = function(token)
            {
                //Get View File endpoint
                var url = $uploadFile.getFileEndpoint() + token;
                if ($Identity.isAuthenticated())
                {
                    url = url + "?access_token=" + $Identity.getAccessToken()
                }

                return url;
            };

            if ($scope.ngModel)
            {
                $scope.fileUrl = getFileUrl($scope.ngModel);
            }

            //https://github.com/danialfarid/ng-file-upload
            $scope.upload = function(files)
            {

                //-----------------------------------------
                if (files && files.length)
                {
                    $scope.uploadData = {
                        <!-- -->
                        options:
                        {
                            thickness: 5,
                            mode: "gauge",
                            total: 100
                        },
                        <!-- -->
                        progress: [
                            {
                                label: 'Subiendo...',
                                value: 0,
                                color: "#FF5722",
                                suffix: "%"
                            }]
                            <!-- -->
                    };


                    //Raise Start Event
                    if ($scope.onStart())
                    {
                        $scope.onStart()(files);
                    }

                    //http://underscorejs.org/#throttle
                    var throttled = _.throttle(function(value)
                    {
                        //Raise Start Event
                        if ($scope.onProgressChange())
                        {
                            $scope.onProgressChange()(value);
                        }

                        if ($scope.uploadData)
                        {
                            $scope.uploadData.progress[0].value = value;
                        }

                    }, 300);


                    for (var i = 0; i < files.length; i++)
                    {
                        var file = files[i];

                        var headers = {};

                        if ($Identity.isAuthenticated())
                        {
                            headers['Authorization'] = "{0} {1}".format([
                                $Identity.getTokenType(),
                                $Identity.getAccessToken()
                            ]);
                        }

                        //Raise Send Event
                        if ($scope.onSend())
                        {
                            $scope.onSend()(headers);
                        }

                        var config = {
                            url: $uploadFile.getFileEndpoint(),
                            file: file,
                            headers: headers
                        };

                        $upload.upload(config)
                            .progress(function(evt)
                            {

                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                throttled(progressPercentage);

                            })
                            .success(function(data, status, headers, config)
                            {
                                //Set View File endpoint
                                var token = _.first(data).token;
                                var url = getFileUrl(token);

                                //Raise Complete Event
                                if ($scope.onComplete())
                                {
                                    var custom_url = $scope.onComplete()(data, status, headers, config);
                                    if (custom_url)
                                    {
                                        url = custom_url;
                                    }
                                }

                                //Bind ng-Model
                                $scope.ngModel = token;
                                $scope.fileUrl = url;

                                $scope.uploadData = null;

                            })
                            .error(function(data, status, headers, config)
                            {

                                //Raise Error Event
                                if ($scope.onError())
                                {
                                    $scope.onError()(data, status, headers, config);
                                }

                                $scope.uploadData = null;

                            });
                    }

                }
                //-----------------------------------------
            }

            //Garbage Collector Destroy
            $scope.$on('$destroy', function() {

            });

        },

        link: function(scope, element, attrs, ctrl) {

        }
    };
});
