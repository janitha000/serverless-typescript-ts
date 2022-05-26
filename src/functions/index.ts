import { AWS } from '@serverless/typescript';
// import schema from './hello/schema';

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
    securityGroupIds: ["sg-00733881386a066d3"],
    subnetIds: [
        "subnet-0e7ad0e3e621fefc1",
        "subnet-096e8dc5c855c2408",
    ]
}
// const vpc = {
//     securityGroupIds: ["sg-0f439c946788b4547"],
//     subnetIds: [
//         "subnet-07b69ae17e24dc252",
//         "subnet-0150728ce4d1dc5af",
//     ]
// }

//const mongoLayer = "${cf:databaselayer-${self:provider.stage}.awsSdkLayer-${self:provider.stage}}";
const mongoLayer = { "Fn::ImportValue": "DatabaseLambdaLayer-${sls:stage}" }
const awsSDKLayer = { "Fn::ImportValue": "AwsSdkLambdaLayer-${sls:stage}" }
//const awsSDKLayer = "${cf:databaselayer-${self:provider.stage}.awsSdkLayer-${self:provider.stage}}";


export const functions: AWS["functions"] = {
    hello: {
        name: '${sls:stage}-hello',
        handler: `src/functions/hello/handler.main`,
        environment: {
            SSM_PARAM: "${ssm:TEST_SSM}",
            SSM_ENV_PARAM: "${ssm:/${sls:stage}/db-user}",
            EN_PARAM: "${ssm:Encrypt_Param}",
            SECRET_MANAGER_PARAM: "${self:custom.secret_param.SECRET_MAN_KEY}"
        },
        events: [
            {
                http: {
                    method: 'get',
                    path: 'hello',
                    // request: {
                    //     schemas: {
                    //         'application/json': schema,
                    //     },
                    // },
                    //@ts-ignore
                    responseData: {
                        // response with description and response body
                        200: {
                            description: 'this went well',
                            bodyType: 'Success',
                        },

                        // response with just a description
                        400: {
                            description: 'failed Post',
                        },
                        // shorthand for just a description
                        502: 'server error',
                    }
                    // documentation: {
                    //     summary: "Create something",
                    //     description: "Creates the thing you need",
                    //     methodResponses: [
                    //         {
                    //             statusCode: "200",
                    //             responseBody: {
                    //                 description: "Response body description"
                    //             }

                    //         }
                    //     ]
                    // }
                },
            },
        ],
    },
    helloM: {
        handler: `src/functions/hello/handler.middyfyMain`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'hello/mhello',
                },
                //@ts-ignore
                alarms: [{ 'Fn::GetAtt': ['functionErrors', 'Arn'] }]
            },
        ],
        deploymentSettings: {
            type: 'Linear10PercentEvery1Minute',
            alias: 'Live',
            // alarms: ['HelloMError']
        }
    },
    validatedHello: {
        handler: `src/functions/hello/handler.mvalidatedHello`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'hello',
                }
            },
        ]
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
        layers: [awsSDKLayer],
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
        layers: [mongoLayer],
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
        // //vpc: vpc

    },
    getUsersByFilter: {
        handler: `src/functions/mongo/getUsersFilter.main`,
        layers: [mongoLayer],
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
        layers: [mongoLayer],
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
        layers: [mongoLayer],
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
                    method: 'GET',
                    path: 'service-users',
                    cors: corsSettings,

                    //@ts-ignore
                    documentation: {
                        summary: "get service users from the database",
                        description: "Gets the service users from the database",
                        methodResponses: [
                            {
                                statusCode: "200",
                                responseBody: {
                                    description: "Response body description"
                                }

                            }
                        ]
                    }
                }

            },
            {
                http: {
                    method: 'POST',
                    path: 'service-users',
                    cors: corsSettings,

                    //@ts-ignore
                    documentation: {
                        summary: "post service users from the database",
                        description: "POST the service users from the database",
                        methodResponses: [
                            {
                                statusCode: "200",
                                responseBody: {
                                    description: "Response body description"
                                }

                            }
                        ]
                    }
                }

            },
        ],

    },
    usersMultiple: {
        handler: `src/functions/service-pattern/users.main`,
        events: [
            {
                http: {
                    method: 'GET',
                    path: 'service-users-multiple',
                    cors: corsSettings,

                    //@ts-ignore
                    documentation: {
                        summary: "get service users from the database",
                        description: "Gets the service users from the database",
                        methodResponses: [
                            {
                                statusCode: "200",
                                responseBody: {
                                    description: "Response body description"
                                }

                            }
                        ]
                    }
                }
            },
            {
                http: {
                    method: 'POST',
                    path: 'service-users-multiple',
                    cors: corsSettings,

                    //@ts-ignore
                    documentation: {
                        summary: "post service users from the database",
                        description: "POST the service users from the database",
                        methodResponses: [
                            {
                                statusCode: "200",
                                responseBody: {
                                    description: "Response body description"
                                }

                            }
                        ]
                    }
                }
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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

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
        //vpc: vpc

    },
}

