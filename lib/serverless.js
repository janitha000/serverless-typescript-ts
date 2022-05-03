import { machine } from './src/step-functions/machine';
import { functions } from './src/functions';
const serverlessConfiguration = {
    service: 'serverless-step',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-step-functions', 'serverless-offline', 'serverless-aws-documentation', 'serverless-localstack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'ap-southeast-1',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            ONUSERUPDATE_EVENTBUS: 'arn:aws:events:ap-southeast-1:628640267234:event-bus/aws.partner/mongodb.com/stitch.trigger/626b8954f1cb6a1f43679ac5'
        },
    },
    functions,
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
        documentation: {
            info: {
                version: "2",
                title: "Name of your API",
                description: "This is the best API ever"
            }
        },
        localstack: {
            stages: ['local'],
            lambda: {
                mountCode: "True"
            },
            docker: {
                sudo: "False"
            }
        }
    },
    stepFunctions: {
        "validate": "true",
        stateMachines: {
            ...machine
        },
    }
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map