angular.route('app.accounts/edit/:token', function(
    $scope,
    $state,
    $log,
    $Api,
    $stateParams,
    $Configuration,
    $window,
    $mdDialog,
    actionDialogs,
    $galeLoading,
    $q,
    $Identity
)
{
    var defers = [];


    //------------------------------------
    // Get Details Data
    defers.push(
        $Api.read("Accounts/{id}",
        {
            id: $stateParams.token
        })
    );

    //------------------------------------
    // Get all profiles
    defers.push(
        $Api.kql("Roles",
        {
            limit: 100
        })
    );

    $q.all(defers).then(function(resolves)
    {

        var account = resolves[0];
        var roles = resolves[1];

        angular.forEach(account.roles, function(accountRole)
        {
            //Mark if the role is selected
            var role = _.find(roles.items,
            {
                'token': accountRole.token
            });
            if (role)
            {
                role.selected = true;
            }
        });

        $scope.data = account;
        $scope.allRoles = roles.items;
    });

    //------------------------------------
    // Button Action's
    $scope.back = function(data)
    {
        history.back();
    };

    $scope.cancel = function(data)
    {
        $scope.back(data);
    };

    $scope.toggleRole = function(item, ev)
    {

        if (!item.selected && item.identifier == 'COMP')
        {
            $mdDialog.show(
            {
                controller: 'ApplicationCompanySelectionController',
                templateUrl: 'views/accounts/dialogs/company-selection.html',
                targetEvent: ev,
                clickOutsideToClose: false

            }).then(function(result)
            {
                if (result)
                {
                    item.selected = true;
                    $scope.data.company = result.token;
                }

            })

        }
        else
        {
            item.selected = !item.selected;
        }
    }

    $scope.recoverPassword = function(data, ev)
    {

        var confirm = $mdDialog.confirm()
            .title('Recuperación de Contraseña')
            .content('Se enviará un correo con los pasos para recuperar la contraseña al usuario actual <br/><br/> ¿Deseas Continuar?')
            .targetEvent(ev)
            .ok('Sí, Continuar con la recuperación')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function()
        {

            $galeLoading.show('Enviando Correo para Recuperación...');
            $Api.update('Accounts/RecoverPassword',
                {
                    email: data.email
                })
                .success(function(data)
                {
                    $scope.back();
                })
                .finally($galeLoading.hide);

        });

    };

    $scope.save = function(data, ev)
    {
        //set Roles 
        var roles = [];
        angular.forEach($scope.allRoles, function(role)
        {
            if (role.selected)
            {
                roles.push(role.token);
            }
        });
        data.roles = roles;

        $galeLoading.show();
        $Api.update('Accounts/{id}',
        {
            id: data.token,
            account: data
        }).success(function(response)
        {

            //IS the same user , that change??
            if ($Identity.getCurrent().primarysid == data.token)
            {

                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title('Modificación de Permisos')
                    .content('Haz cambiado tus permisos de acceso , por lo que deberas volver a identificarte.')
                    .ok('Ok!, Entendido')
                    .targetEvent(ev)
                ).then(function()
                {
                    $Identity.logOut();
                })

            }
            else
            {
                $scope.back();
            }

        }).finally($galeLoading.hide);
    };


});
