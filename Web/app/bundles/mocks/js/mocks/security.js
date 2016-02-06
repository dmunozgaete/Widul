angular.module('mocks.api')

.run(function(Mocks, $log)
{
    //-------------------------------------------------------------
    Mocks.whenPOST("Security/Authorize", function(method, url, data)
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
                    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRtdW5vemdhZXRlQGdtYWlsLmNvbSIsInByaW1hcnlzaWQiOiI4MTFmYzIzNC05MDI2LTQyY2EtOGIwZC1mODBlYTU3YWE2MWMiLCJ1bmlxdWVfbmFtZSI6IkRhdmlkIEFudG9uaW8gTXXDsW96IEdhZXRlIiwicGhvdG8iOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyb2xlIjoiUk9PVCIsImlzcyI6Ik9BdXRoU2VydmVyIiwiYXVkIjoiT0F1dGhDbGllbnQiLCJleHAiOjE0ODU2NDE5ODAsIm5iZiI6MTQ1NDEwNTk4MH0.FovwfTuqq6s3P-r8yAx3qavszmHiynG_KnN05LUwel8"
                },
                {}
            ];
        }

    });
    //-------------------------------------------------------------

});
