angular.module('mocks.api')

.run(function(Mocks, $log)
{
    return ;
    //-------------------------------------------------------------
    Mocks.whenGET("Events/Details", function(method, url, data)
    {
        var now = new Date();
        var result = {
            title: "Clase de Actuación",
            description: "ventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ",
            knowledge:
            {
                name: "Actuación",
                recommendations: 25
            },
            participants: 30,
            date: (new Date()).toISOString(),
            user:
            {
                "fullname": "Sebastian Moreno",
                "photo": "bundles/mocks/images/avatar1.png",
                "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
            },
            tags: [
                "AireLibre",
                "Cerro",
                "Fit",
                "VidaSana",
                "Prueba",
                "LasCondes"
            ],
            comments: [
            {
                createdAt: new Date(now.getTime() - (1000 * 10)).toISOString(),
                user:
                {
                    "fullName": "Sebastian Moreno",
                    "photo": "bundles/mocks/images/avatar1.png",
                    "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
                },
                comment: "unt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libe"
            },
            {
                createdAt: new Date(now.getTime() - (1500 * 10)).toISOString(),
                user:
                {
                    "fullName": "Fabian Elgueta",
                    "photo": "bundles/mocks/images/avatar2.png",
                    "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
                },
                comment: "t know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some g"
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
    Mocks.whenGET("Events/Tags", function(method, url, data)
    {
        var result = {
            "offset": 0,
            "limit": 10,
            "total": 1,
            "elapsedTime": "00:00:00.0214845",
            "items": [
            {
                "name": "Trekking"
            },
            {
                "name": "Gestión"
            },
            {
                "name": "Emprendimiento"
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
    Mocks.whenGET("Events/Search", function(method, url, data)
    {
        var result = {
            "limit": 10,
            "offset": 0,
            "total": 5,
            "items": [
            {
                "date": "2016-01-20T00:00:00-03:00",
                "createdAt": "2016-01-20T19:48:21.41-03:00",
                "description": "ng through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in c",
                "locarion": null,
                "name": "Evento de Ejemplo",
                "updateAt": "2016-01-20T19:48:21.41-03:00",
                "token": "6f83b2ff-69d7-449c-95b5-7b8f187404b0",
                "knowledge":
                {
                    "name": "Trekking",
                    "token": "117fa83f-836c-44bc-a562-c035421cb882"
                },
                "type":
                {
                    "name": null,
                    "token": "127fa83f-236c-44bc-a562-c035421cb882"
                },
                "user":
                {
                    "fullName": "Sebastian Moreno",
                    "photo": "bundles/mocks/images/avatar1.png",
                    "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
                },
                "tags": [
                    "AireLibre",
                    "Cerro",
                    "Fit",
                    "VidaSana",
                    "Prueba",
                    "LasCondes"
                ]
            },
            {
                "date": "2016-01-19T17:28:20.48-03:00",
                "createdAt": "2016-01-19T15:06:48.457-03:00",
                "description": " perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequunt",
                "locarion": null,
                "name": "Evento de Prueba",
                "updateAt": "2016-01-19T15:06:48.457-03:00",
                "token": "a1134548-1be5-4de9-bfc4-628873763a5b",
                "knowledge":
                {
                    "name": "Trekking",
                    "token": "117fa83f-836c-44bc-a562-c035421cb882"
                },
                "type":
                {
                    "name": null,
                    "token": "00000000-0000-0000-0000-000000000000"
                },
                "user":
                {
                    "fullName": "Fabian Elgueta",
                    "photo": "bundles/mocks/images/avatar2.png",
                    "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
                },
                "tags": [
                    "AireLibre",
                    "Cerro",
                    "Fit",
                    "VidaSana",
                    "Prueba",
                    "LasCondes",
                    "Healthy",
                    "Running",
                    "Free",
                    "Working",
                    "Sport",
                    "Las Condes"
                ]
            },
            {
                "date": "2016-01-19T17:28:20.48-03:00",
                "createdAt": "2016-01-19T15:07:07.33-03:00",
                "description": "us modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse",
                "locarion": null,
                "name": "Angular Ionic",
                "updateAt": "2016-01-19T15:07:07.33-03:00",
                "token": "4bb61b55-9139-4458-b606-183019f2d304",
                "knowledge":
                {
                    "name": "AngularJS",
                    "token": "ec6e2c28-23fa-4f05-bd7d-c478e1395130"
                },
                "type":
                {
                    "name": null,
                    "token": "00000000-0000-0000-0000-000000000000"
                },
                "user":
                {
                    "fullName": "David Antonio",
                    "photo": "bundles/mocks/images/avatar3.png",
                    "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
                },
                "tags": [
                    "AngularJS",
                    "Ionic",
                    "Charla",
                    "Providencia"
                ]
            },
            {
                "date": "2016-01-19T17:28:20.48-03:00",
                "createdAt": "2016-01-19T15:07:29.16-03:00",
                "description": "ose who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can p",
                "locarion": null,
                "name": "Curso AngularJS",
                "updateAt": "2016-01-19T15:07:29.16-03:00",
                "token": "fb9e8aee-9242-4df2-8462-d0d5b0aaedd4",
                "knowledge":
                {
                    "name": "ionic",
                    "token": "35ebc2f7-0aef-4e16-9ab2-9f0f03034e72"
                },
                "type":
                {
                    "name": null,
                    "token": "00000000-0000-0000-0000-000000000000"
                },
                "user":
                {
                    "fullName": "David Antonio",
                    "photo": "bundles/mocks/images/avatar3.png",
                    "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
                },
                "tags": [
                    "AngularJS",
                    "Ionic",
                    "Charla",
                    "Providencia"
                ]
            },
            {
                "date": "2016-01-19T17:28:20.48-03:00",
                "createdAt": "2016-01-19T15:08:20.19-03:00",
                "description": "vident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis v",
                "locarion": null,
                "name": "Desarrollando un proyecto en 30 días",
                "updateAt": "2016-01-19T15:08:20.19-03:00",
                "token": "4d86b2d6-9eab-4cc4-b468-4a856a3fc913",
                "knowledge":
                {
                    "name": "Gale",
                    "token": "514baf4f-093c-49c2-ac8f-956be713fa46"
                },
                "type":
                {
                    "name": null,
                    "token": "00000000-0000-0000-0000-000000000000"
                },
                "user":
                {
                    "fullName": "David Antonio",
                    "photo": "bundles/mocks/images/avatar3.png",
                    "token": "e6dc2176-6f74-4d3c-b1b4-06680d865b8f"
                },
                "tags": [
                    "Motivacional",
                    "Innovación",
                    "Emprendimiento",
                    "Providencia"
                ]
            }]
        };


        return [
            200,
            result,
            {}
        ];
    });
    //-------------------------------------------------------------
});
