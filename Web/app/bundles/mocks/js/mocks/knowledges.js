angular.module('mocks.api')

.run(function(Mocks, $log)
{


    //-------------------------------------------------------------
    Mocks.whenGET("Knowledges/MostRequested", function(method, url, data)
    {
        var items = [
        {
            name: "Trekking",
            requested: 70,
        },
        {
            name: "Sushi",
            requested: 67,
        },
        {
            name: "Coaching",
            requested: 59
        },
        {
            name: "Gestión Laboral",
            requested: 52
        },
        {
            name: "Emprendimiento",
            requested: 30
        },
        {
            name: "AngularJS",
            requested: 24
        },
        {
            name: "Ionic",
            requested: 20
        }];


        return [
            200,
            items,
            {}
        ];
    });
    //-------------------------------------------------------------

return; 

    //-------------------------------------------------------------
    Mocks.whenGET("Knowledges", function(method, url, data)
    {
        var items = [
        {
            name: "Trekking",
            token: "e614c1ce-10d2-4f41-ab56-d169be113253",
            counts:
            {
                recomendations: 20,
                delivered: 100
            }
        },
        {
            name: "Sushi",
            token: "e614c1ce-10d2-4f41-ab56-d169be113253",
            counts:
            {
                recomendations: 12,
                delivered: 20
            }
        },
        {
            name: "Yoga",
            token: "e614c1ce-10d2-4f41-ab56-d169be113253",
            counts:
            {
                recomendations: 5,
                delivered: 10
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
