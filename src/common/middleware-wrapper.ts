import requestLoggerMiddleware from "./request-logger-middleware";

import { middyfy } from '@libs/lambda'
import httpSecurityHeaders from "@middy/http-security-headers";
import httpErrorHandler from "@middy/http-error-handler";
import validationMiddleware from "./validation-middleware";

const wrapper = (handler) => {
    return middyfy(handler).use(httpSecurityHeaders())
        .use(requestLoggerMiddleware())
    // .use(httpErrorHandler())


};

export default wrapper;