import type { AWS } from '@serverless/typescript';
import { machine } from './src/step-functions/machine'
import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'serverless-step',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-step-functions', 'serverless-offline', 'serverless-aws-documentation'],
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
    },
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true, patterns: [''] },
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
    }
  },
  // @ts-ignore
  stepFunctions: {
    "validate": "true",
    stateMachines: {
      ...machine
    },
  }
};

module.exports = serverlessConfiguration;
