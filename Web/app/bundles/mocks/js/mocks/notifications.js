angular.module('mocks.api')

.run(function(Mocks, $log)
{
    //-------------------------------------------------------------
    Mocks.whenGET("/Notifications", function(method, url, data)
    {
        var now = new Date();
        var result = {
            timestamp: now.toISOString(),
            items: [
            {
                createdAt: new Date(now.getTime() - (1000 * 10)).toISOString(),
                name: "Ruta Compartida",
                observation: "Juan Jorquera esta realizando una de tus rutas",
                image: "bundles/mocks/images/avatar1.png",
                readed: false,
                type:
                {
                    identifier: "INFO",
                    name: "Información"
                }
            },
            {
                createdAt: new Date(now.getTime() - (1000 * 8)).toISOString(),
                name: "Tienes un nuevo seguidor/a",
                observation: "Ligia Alcayaga a comenzado a seguirte",
                image: "bundles/mocks/images/avatar2.png",
                readed: false,
                type:
                {
                    identifier: "INFO",
                    name: "Información"
                }
            },
            {
                createdAt: new Date(now.getTime() - (1000 * 6)).toISOString(),
                name: "Actualización de Embajador",
                observation: "Chaleco Lopez acaba de compartir una nueva ruta",
                image: "bundles/mocks/images/avatar4.png",
                readed: false,
                type:
                {
                    identifier: "INFO",
                    name: "Información"
                }
            },
            {
                createdAt: new Date(now.getTime() - (1000 * 4)).toISOString(),
                name: "Nueva Medalla",
                observation: "Has ganado la medalla 'A la aventura'",
                image: "bundles/mocks/images/avatar5.png",
                readed: false,
                type:
                {
                    identifier: "INFO",
                    name: "Información"
                }
            }]
        };

        return [
            200,
            result,
            {}
        ];
    });
    //-------------------------------------------------------------

    //-------------------------------------------------------------
    Mocks.whenPUT("/Notifications/MarkAsReaded", function(method, url, data)
    {
        return [
            200,
            {},
            {}
        ];
    });
    //-------------------------------------------------------------
});
