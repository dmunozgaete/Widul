angular.module('app.filters')

.filter('file', function($Api, $Identity, $Configuration, $uploadFile)
{
    return function(resource)
    {

        var url = resource;
        if (!url)
        {
            return null;
            //Set Default image if not setted
            //url = $Configuration.get("static").DEFAULT_EMPTY_IMAGE_URL;
        }
        else
        {
            if ($Identity.isAuthenticated())
            {
                url += "?access_token=" + $Identity.getAccessToken();
            }


            url = $uploadFile.getFileEndpoint() + url;
        }

        return url;
    };
});
