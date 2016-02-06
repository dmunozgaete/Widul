angular.module('mocks.api')

.run(function(Mocks, $log)
{
    return; //CONNECTED TO REAL API =)!

    //-------------------------------------------------------------
    Mocks.whenGET("Places", function(method, url, data)
    {

        var items = [
        {
            address: "Nueva de Lyon 96, Providencia, Providencia, Región Metropolitana, Chile",
            capacity: 40,
            createdAt: "2016-02-06T13:04:01.457-03:00",
            latitude: -33.4208741,
            longitude: -70.61063949999999,
            name: "Oficina Valentys",
            tip: "Oficina 701, piso 7",
            token: "8f76d956-e136-41bb-b017-46ef5b0d9503",
            creator:
            {
                fullname: "David Antonio Muñoz Gaete",
                photo: null,
                token: "811fc234-9026-42ca-8b0d-f80ea57aa61c"
            }
        },
        {
            address: "Nueva de Lyon 96, Providencia, Providencia, Región Metropolitana, Chile",
            capacity: 40,
            createdAt: "2016-02-06T13:04:01.457-03:00",
            latitude: -33.4208741,
            longitude: -70.61063949999999,
            name: "Oficina Valentys",
            tip: "Oficina 701, piso 7",
            token: "8f76d956-e136-41bb-b017-46ef5b0d9503",
            creator:
            {
                fullname: "David Antonio Muñoz Gaete",
                photo: null,
                token: "811fc234-9026-42ca-8b0d-f80ea57aa61c"
            }
        },
        {
            address: "Nueva de Lyon 96, Providencia, Providencia, Región Metropolitana, Chile",
            capacity: 40,
            createdAt: "2016-02-06T13:04:01.457-03:00",
            latitude: -33.4208741,
            longitude: -70.61063949999999,
            name: "Oficina Valentys",
            tip: "Oficina 701, piso 7",
            token: "8f76d956-e136-41bb-b017-46ef5b0d9503",
            creator:
            {
                fullname: "David Antonio Muñoz Gaete",
                photo: null,
                token: "811fc234-9026-42ca-8b0d-f80ea57aa61c"
            }
        }];


        return [
            200,
            {
                items: items
            },
            {}
        ];
    });
    //-------------------------------------------------------------
});
