angular.module('mocks.api')

.run(function(Mocks, $log)
{
    //-------------------------------------------------------------
    Mocks.whenPOST("/Security/Authorize", function(method, url, data)
    {

        var user = angular.fromJson(data);

        if (user.username == "a")
        {
            //SIMULATE ERROR
            return [
                400,
                {
                    "error": "BAD_USER_OR_PASSWORD",
                    "error_description": null
                },
                {}
            ];
        }
        else
        {
            //SIMULATE RESPONSE OK!
            return [
                200,
                {
                    "expires_in": 1426991771,
                    "token_type": "Bearer",
                    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRtdW5vemdhZXRlQGdtYWlsLmNvbSIsInByaW1hcnlzaWQiOiJhZDRiYWQ5Mi01NTRmLTRlMGUtYWVlNS05MzYxMTUzYzc0NzAiLCJ1bmlxdWVfbmFtZSI6IkRhdmlkIEFudG9uaW8gTXXDsW96IEdhZXRlIiwicGhvdG8iOiJidW5kbGVzL21vY2tzL2ltYWdlcy9hdmF0YXI0LnBuZyIsImlzcyI6Ik9BdXRoU2VydmVyIiwiYXVkIjoiT0F1dGhDbGllbnQiLCJleHAiOjE0ODM4MjQyNDgsIm5iZiI6MTQ1MjI4ODI0OH0.VJVFLOyhw9czUwsXFnmkCDgJRD8GwUoVKsCi3Dfi4no"
                },
                {}
            ];
        }

    });
    //-------------------------------------------------------------

});
