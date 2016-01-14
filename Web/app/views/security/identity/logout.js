angular.route('security/identity/logout', function(
    $Identity,
    $scope
) {
      
    $Identity.logOut();

});
