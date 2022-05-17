import { apiResponse } from "src/common/api-response";
import { Logger } from "src/common/logger";
import { SentryWrapper, setTransaction } from "src/common/sentry";
const sentryTest = async (_event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const logger = new Logger(context.awsRequestId);
    const transaction = setTransaction();
    try {
        logger.INFO({ message: "Getting users from the database" });
        return apiResponse._200({ message: 'success' });
    }
    catch (err) {
        logger.Error({
            message: err.message,
            callstack: err.stack,
        });
        SentryWrapper.captureException(err);
        return apiResponse._500({ err });
    }
    finally {
        transaction.finish();
    }
};
export const main = SentryWrapper.AWSLambda.wrapHandler(sentryTest);
//# sourceMappingURL=index.js.map