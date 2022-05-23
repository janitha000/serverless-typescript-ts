import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse } from 'src/libs/api-gateway';
// import { middyfy } from '@libs/lambda';
import { helloLog } from './hello.service';
import { Logger } from '../../common/logger';
import schema from './schema';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { apiResponse } from '../../common/api-response'
import { middyfy } from '@libs/lambda';
import httpSecurityHeaders from '@middy/http-security-headers';
import requestLoggerMiddleware from 'src/common/request-logger-middleware';
import MiddyWrapper from '../../common/middleware-wrapper'
const API_URL_BASE = process.env.API_URL_BASE;

// const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context: Context) => {
const hello = async (event, context: Context) => {
  const logger = new Logger(context.awsRequestId);
  helloLog(logger);



  console.log(process.env.SECRET_MANAGER_PARAM["SECRET_MAN_KEY"])
  return apiResponse._200({
    message: `Hello, welcome to the exciting Serverless world! from swagger`,
    param: process.env.SSM_PARAM,
    secure_param: process.env.EN_PARAM,
    secret_manager_param: process.env.SECRET_MANAGER_PARAM,
    url: `${API_URL_BASE}/hello`,
    event,
  });
};

export const main = hello;


const mHello = async (_event: APIGatewayProxyEvent) => {
  return apiResponse._200({
    message: `This is from the middleware hhtp`,
  });
};

export const middyfyMain = MiddyWrapper(mHello)

