angular.module('mocks.api')

.run(function(Mocks, $log)
{
    //-------------------------------------------------------------
    Mocks.whenGET("Places", function(method, url, data)
    {
        var items = [
        {
            name: "Conectas Cowork",
            token: "e614c1ce-10d2-4f41-ab56-d169be113253",
            address:
            {
                line: "Avenida Brazil 2344",
                coordinates:
                {
                    lat: -33.4036365,
                    lng: -70.5562409
                }
            }
        },
        {
            name: "Conectas Cowork",
            token: "e614c1ce-10d2-4f41-ab56-d169be113253",
            address:
            {
                line: "Providencia 2344",
                coordinates:
                {
                    lat: -33.4095043,
                    lng: -70.6569762
                }
            }
        },
        {
            name: "Conectas Cowork",
            token: "e614c1ce-10d2-4f41-ab56-d169be113253",
            address:
            {
                line: "Las Condes 1344",
                coordinates:
                {
                    lat: -33.4513796,
                    lng: -70.6533255
                }
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
