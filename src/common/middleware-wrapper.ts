import requestLoggerMiddleware from "./request-logger-middleware";

import { middyfy } from '@libs/lambda'
import httpSecurityHeaders from "@middy/http-security-headers";

const wrapper = (handler) => {
    return middyfy(handler).use(httpSecurityHeaders())
        .use(requestLoggerMiddleware())
};

export default wrapper;