import schema from './hello/schema';
const corsSettings = {
    headers: [
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
export const functions = {
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
        lambdaInsights: true,
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
    },
};
//# sourceMappingURL=index.js.map