angular.route('public.boot/index', function(
    $scope,
    $log,
    $Configuration,
    Synchronizer,
    $q,
    ApplicationCleanse,
    $LocalStorage,
    $location
)
{


    var stamps = $Configuration.get("localstorageStamps");
    var new_version_defer = $q.defer();

    var onBooted = function()
    {
        Synchronizer.start().then(function()
        {

            // --------------------------------
            // MANUAL BOOT
            var url = $Configuration.get("application");
            $location.url(url.home);
            // --------------------------------

        });

    };

    //When all Process are Checked, run APP
    $q.all([
        new_version_defer.promise
    ]).then(onBooted, function(err)
    {
        $log.error(err);
    });


    // ---------------------------------------------------------
    // NEW VERSION SECTION! (ONLY WHEN NEW VERSION IS ACQUIRED)
    if ($LocalStorage.get(stamps.new_version))
    {

        ApplicationCleanse.clean(true).then(function()
        {
            new_version_defer.resolve();
        }, function(err)
        {
            new_version_defer.reject(err);
        });

        //Remove new Version Flag
        $LocalStorage.remove(stamps.new_version);

    }
    else
    {
        new_version_defer.resolve();
    }
    // ---------------------------------------------------------


});
