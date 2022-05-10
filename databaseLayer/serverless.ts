import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'databaselayer',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-southeast-1',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
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
  },
  layers: {
    database: {
      path: 'database',
      compatibleRuntimes: ["nodejs14.x"]
    },
  },
  resources: {
    Outputs: {
      databaseLayer: {
        Value: {
          "Ref": "DatabaseLambdaLayer"
        },
        Export: {
          "Name": "DatabaseLambdaLayer"
        }
      }
    }
  }

};

module.exports = serverlessConfiguration;
