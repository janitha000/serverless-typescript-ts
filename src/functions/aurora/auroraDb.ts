import * as AWS from 'aws-sdk';

export const database = require('data-api-client')({
    AWS,
    secretArn: 'arn:aws:secretsmanager:ap-southeast-1:628640267234:secret:serverlesshellosecret-A8qX3w',
    resourceArn: 'arn:aws:rds:ap-southeast-1:628640267234:cluster:serverlesshello',
    database: 'auroratest' // default database
})

