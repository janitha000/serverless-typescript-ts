import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse } from 'src/libs/api-gateway';
// import { middyfy } from '@libs/lambda';
import { helloLog } from './hello.service';
import { Logger } from '../../common/logger';
import schema from './schema';
import { Context } from 'aws-lambda';
import { apiResponse } from '../../common/api-response'

const API_URL_BASE = process.env.API_URL_BASE;

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context: Context) => {
  const logger = new Logger(context.awsRequestId);
  helloLog(logger);
  return apiResponse._200({
    message: `Hello, welcome to the exciting Serverless world!`,
    url: `${API_URL_BASE}/hello`,
    event,
  });
};

export const main = hello;
