angular.module('app.components')

.provider('$uploadFile', function()
{
    //---------------------------------------------------
    //Configurable Variable on .config Step
    var _endpoint = null;

    this.setFileEndpoint = function(endpoint)
    {
        _endpoint = endpoint;
    };
    //---------------------------------------------------

    var getFileEndpoint = function()
    {
        return _endpoint;
    };

    //---------------------------------------------------
    this.$get = function($log, $Api)
    {

        if (!_endpoint)
        {
            _endpoint = $Api.getEndpoint() + '/File/';
        }


        return {
            getFileEndpoint: getFileEndpoint
        };
    };

});
