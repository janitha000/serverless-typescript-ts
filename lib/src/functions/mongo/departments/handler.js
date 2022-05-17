import { apiResponse } from "src/common/api-response";
import { Logger } from "src/common/logger";
import { SentryWrapper, setTransaction } from "src/common/sentry";
import { getDepartments } from "./getDepartments";
const departments = async (event, context) => {
    const method = event.httpMethod;
    const logger = new Logger(context.awsRequestId);
    logger.INFO({ message: `Called users with method ${method}` });
    const transaction = setTransaction();
    try {
        switch (method) {
            case 'GET':
                return getDepartments(logger);
            default:
                return apiResponse._500({
                    message: `method not allowed`,
                });
        }
    }
    catch (err) {
        SentryWrapper.captureException(err);
    }
    finally {
        transaction.finish();
    }
};
export const main = SentryWrapper.AWSLambda.wrapHandler(departments);
//# sourceMappingURL=handler.js.map