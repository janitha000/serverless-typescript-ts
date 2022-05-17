import { helloLog } from './hello.service';
import { Logger } from '../../common/logger';
import { apiResponse } from '../../common/api-response';
const API_URL_BASE = process.env.API_URL_BASE;
const hello = async (event, context) => {
    const logger = new Logger(context.awsRequestId);
    helloLog(logger);
    return apiResponse._200({
        message: `Hello, welcome to the exciting Serverless world!`,
        url: `${API_URL_BASE}/hello`,
        event,
    });
};
export const main = hello;
//# sourceMappingURL=handler.js.map