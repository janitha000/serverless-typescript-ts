import { AWS } from '@serverless/typescript';
import schema from './hello/schema';

//@ts-ignore
const corsSettings = {
    headers: [
        // Specify allowed headers
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent',
        'Access-Control-Request-Method'
    ],
    allowCredentials: false,
};

const vpc = {
    securityGroupIds: ["sg-0f439c946788b4547"],
    subnetIds: [
        "subnet-07b69ae17e24dc252",
        "subnet-0150728ce4d1dc5af",
    ]
}

export const functions: AWS["functions"] = {
    hello: {
        handler: `src/functions/hello/handler.main`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'hello',
                    request: {
                        schemas: {
                            'application/json': schema,
                        },
                    },
                    //@ts-ignore
                    documentation: {
                        summary: "Create something",
                        description: "Creates the thing you need",
                        methodResponses: [
                            {
                                statusCode: "200",
                                responseBody: {
                                    description: "Response body description"
                                }

                            }
                        ]
                    }
                },
            },
        ],
    },
    createStepFunction: {
        handler: `src/functions/step/createStepFunction.main`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'stepFunction',
                },
            },
        ],
    },
    deleteStepFunction: {
        handler: `src/functions/step/deleteStepFunction.main`,
        events: [
            {
                http: {
                    method: 'delete',
                    path: 'stepFunction/{id}',
                },
            },
        ],
    },
    startStepFunction: {
        handler: `src/functions/step/startStepFunction.main`,
        layers: [
            "${cf:databaselayer-${self:provider.stage}.awsSdkLayer}"
        ],
        events: [
            {
                http: {
                    method: 'get',
                    path: 'stepFunction/start',
                },
            },
        ],
        tracing: 'Active'
    },
    onUserInsert: {
        handler: `src/functions/mongo/handler.onUserInsert`,
        events: [
            {
                eventBridge: {
                    eventBus: 'arn:aws:events:ap-southeast-1:628640267234:event-bus/aws.partner/mongodb.com/stitch.trigger/626b7e7de092da9acd387154',
                    pattern: {
                        "source": [{
                            "prefix": "aws.partner/mongodb.com"
                        }]
                    }
                },
            },
        ],
    },
    onUserUpdate: {
        handler: `src/functions/mongo/handler.onUserUpdate`,
        events: [
            {
                eventBridge: {
                    eventBus: 'arn:aws:events:ap-southeast-1:628640267234:event-bus/aws.partner/mongodb.com/stitch.trigger/626b8954f1cb6a1f43679ac5',
                    pattern: {
                        "source": [{
                            "prefix": "aws.partner/mongodb.com"
                        }]
                    }
                },
            },
        ],
    },
    mongoUsers: {
        handler: `src/functions/mongo/users/handler.main`,
        layers: [
            "${cf:databaselayer-${self:provider.stage}.databaseLayer}",
        ],
        events: [
            {
                http: {
                    method: 'ANY',
                    path: 'users',
                },
            },
        ],
        tracing: 'Active',
        //@ts-ignore
        lambdaInsights: true,
        vpc: vpc

    },
    getUsersByFilter: {
        handler: `src/functions/mongo/getUsersFilter.main`,
        layers: [
            "${cf:databaselayer-${self:provider.stage}.databaseLayer}",
        ],
        events: [
            {
                http: {
                    method: 'get',
                    path: 'user/filter',
                },
            },
        ],
    },
    getUserById: {
        handler: `src/functions/mongo/getUserById.main`,
        layers: [
            "${cf:databaselayer-${self:provider.stage}.databaseLayer}",
        ],
        events: [
            {
                http: {
                    method: 'get',
                    path: 'users/{id}',
                },
            },
        ]
    },
    departments: {
        handler: `src/functions/mongo/departments/handler.main`,
        layers: [
            "${cf:databaselayer-${self:provider.stage}.databaseLayer}",
        ],
        events: [
            {
                http: {
                    method: 'ANY',
                    path: 'departments',
                },
            },
        ]
    },
    getAuroraUsers: {
        handler: `src/functions/aurora/index.getAuroraUsers`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'aurora/users',
                },
            },
        ],
        role: { 'Fn::GetAtt': ['AuroraRole', 'Arn'] }

    },
    sentry: {
        handler: `src/functions/sentry/index.main`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'sentry',
                },
            },
        ],
        tracing: 'Active',
        vpc: vpc
    },
    users: {
        handler: `src/functions/service-pattern/users.main`,
        events: [
            {
                http: {
                    method: 'ANY',
                    path: 'service-users',
                    cors: corsSettings
                },

            },
        ],

    },
    countries: {
        handler: `src/functions/postgres/handler.main`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'countries',
                },

            },
        ],
        vpc: vpc

    },
    addCoutries: {
        handler: `src/functions/postgres/handler.post`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'postcountry',
                },

            },
        ],

    },
    countriesById: {
        handler: `src/functions/postgres/handler.getById`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'countries/{id}',
                },

            },
        ],
        vpc: vpc

    },
    countriesByName: {
        handler: `src/functions/postgres/handler.getByName`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'countries/country/name',
                },

            },
        ],
        vpc: vpc

    },
    countriesByNameDelete: {
        handler: `src/functions/postgres/handler.deleteByName`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'countries/country/delete',
                },

            },
        ],
        vpc: vpc

    },
    cityCodes: {
        handler: `src/functions/postgres/handler.getCityCodes`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'cityCodes',
                },

            },
        ],
        vpc: vpc

    },
    postCityCodes: {
        handler: `src/functions/postgres/handler.postCityCode`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'cityCodes/insert',
                },

            },
        ],
        vpc: vpc

    },
    addUsers: {
        handler: `src/functions/postgres/handler.addUser`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'psUsers/insert',
                },

            },
        ],
        vpc: vpc

    },
    getUsers: {
        handler: `src/functions/postgres/handler.getUsers`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'psUsers',
                },

            },
        ],
        vpc: vpc

    },
    addCityT: {
        handler: `src/functions/postgres/handlerT.postT`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'Tcities/insert',
                },

            },
        ],
        vpc: vpc

    },
    getCitiesT: {
        handler: `src/functions/postgres/handlerT.getCities`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'Tcities',
                },

            },
        ],
        vpc: vpc

    },
    getCountriesT: {
        handler: `src/functions/postgres/handlerT.getCountries`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'Tcountries',
                },

            },
        ],
        vpc: vpc

    },
    postCountryT: {
        handler: `src/functions/postgres/handlerT.postCountryT`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'Tcountries/insert',
                },

            },
        ],
        vpc: vpc

    },
    AddCityAndPeopleT: {
        handler: `src/functions/postgres/handlerT.AddCityAndPeople`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'citypeople',
                },

            },
        ],
        vpc: vpc

    },
    getCityAndPeopleT: {
        handler: `src/functions/postgres/handlerT.getCityAndPeople`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'citypeople/get',
                },

            },
        ],
        vpc: vpc

    },




    departmentsM: {
        handler: `src/functions/postgres/handler-model.getDepartments`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'departments',
                },

            },
        ],
        vpc: vpc

    },
}

