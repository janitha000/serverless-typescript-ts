import type { AWS } from '@serverless/typescript';
import { machine } from './src/step-functions/machine'
// import hello from '@functions/hello';
import { functions } from './src/functions';
import { IAMRoles } from 'aws/IAM-aurora'
// import { LayerDeploymentBucketCF } from 'aws/layers-deployment-bucket'

const serverlessConfiguration: AWS = {
  service: 'serverless-step',
  frameworkVersion: '3',
  useDotenv: true,

  params: {
    dev: {
      secrets: "${ssm:/aws/reference/secretsmanager/dev/secret}",
      customDomain: "serverlessapidev.janithatennakoon.com",
      basePath: "/${sls:stage}"
    },
    staging: {
      secrets: "${ssm:/aws/reference/secretsmanager/staging/secret}",
      customDomain: "serverlessapistaging.janithatennakoon.com",
      basePath: ""
    }
  },
  plugins: [
    'serverless-auto-swagger',
    'serverless-esbuild',
    'serverless-step-functions',
    'serverless-offline',
    'serverless-aws-documentation',
    'serverless-localstack',
    'serverless-plugin-lambda-insights',
    'serverless-domain-manager',
    // 'serverless-layers',
    'serverless-plugin-aws-alerts',
    'serverless-plugin-canary-deployments',
    'serverless-plugin-split-stacks',
    'serverless-newrelic-lambda-layers'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-southeast-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    // stage: "staging",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      ONUSERUPDATE_EVENTBUS: 'arn:aws:events:ap-southeast-1:628640267234:event-bus/aws.partner/mongodb.com/stitch.trigger/626b8954f1cb6a1f43679ac5',
      NODE_PATH: "./:/opt/node_modules:/opt/nodejs",
      MONGODB_URL: '${env:MONGODB_URL}',
      // API_URL_BASE: { "Fn::Join": ["", ["https://", { "Ref": "apiGatewayRestApi" }, ".execute-api-${aws:region}.amazonaws.com/${sls:stage}"]] }

    },
  },
  // import the function via paths
  functions,
  package: { individually: true },
  custom: {
    "secret_param": "${param:secrets}",
    // "serverless-layers": {
    //   functions: [
    //     'getUserById'
    //   ],
    //   dependenciesPath: './package.json',
    //   layersDeploymentBucket: { 'Fn::GetAtt': ['LayerDeploymentBucket', 'Arn'] }
    // },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      //exclude: ['aws-sdk', "database"],
      exclude: ['pg-native'],
      //exclude: ["database"],
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
    },
    customDomain: {
      domainName: "${param:customDomain}",
      basePath: '',
      stage: "${sls:stage}",
      certificateName: "*.janithatennakoon.com",
      createRoute53Record: true
    },
    autoswagger: {
      basePath: '${param:basePath}',
      apiKeyHeaders: ['Authorization'],
      typefiles: ['./src/types/success.d.ts'],
      apiType: 'http'
    },
    alerts: {
      dashboard: true,
      definitions: {
        functionErrors: {
          namespace: 'AWS/Lambda',
          metric: 'Errors',
          threshold: 1,
          statistics: 'Minimum',
          period: 60,
          evaluationPeriods: 1,
          comparisonOperator: 'GreaterThanOrEqualToThreshold'

        }
      }
    },
    splitStacks: {
      nestedStackCount: 2,
      perFunction: false,
      perType: false,
      perGroupFunction: true
    },
    newRelic: {
      accountId: '3506195',
      apiKey: 'NRAK-7Y6552HUBV3V02JT20QW1OIASPQ'
    }

  },
  // @ts-ignore
  stepFunctions: {
    "validate": "true",
    stateMachines: {
      ...machine
    },
  },
  resources: {
    Resources: {
      ...IAMRoles,
      // ...LayerDeploymentBucketCF
    }
  }
}

module.exports = serverlessConfiguration;
