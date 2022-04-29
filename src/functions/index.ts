import { AWS } from '@serverless/typescript';
import schema from './hello/schema';

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
    }

}

