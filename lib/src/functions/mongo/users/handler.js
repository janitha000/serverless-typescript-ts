import { apiResponse } from "src/common/api-response";
import { Logger } from "src/common/logger";
import { SentryWrapper, setTransaction } from "src/common/sentry";
import { getUsers } from "./getUsers";
import { postUsers } from "./postUsers";
const users = async (event, context) => {
    const method = event.httpMethod;
    const logger = new Logger(context.awsRequestId);
    logger.INFO({ message: `Called users with method ${method}` });
    const transaction = setTransaction();
    try {
        switch (method) {
            case 'GET':
                return getUsers(logger);
            case 'POST':
                return postUsers(event, logger);
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
export const main = SentryWrapper.AWSLambda.wrapHandler(users);
//# sourceMappingURL=handler.js.map